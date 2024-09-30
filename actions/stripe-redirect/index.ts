"use server";

import { revalidatePath } from "next/cache";

import { auth, currentUser } from "@clerk/nextjs/server";

import { db } from "@/lib/db";
import { stripe } from "@/lib/stripe";
import { absoluteURL } from "@/lib/utils";
import { StripeRedirect } from "@/actions/stripe-redirect/schema";

import { createSafeAction } from "@/lib/create-safe-action";
import { ReturnType } from "@/actions/stripe-redirect/types";

const handler = async (): Promise<ReturnType> => {
  const { userId, orgId } = auth();
  const user = await currentUser();

  if (!userId || !orgId || !user) return { error: "Unauthorized" };

  const settingsUrl = absoluteURL(`/organization/${orgId}`);

  let url = "";

  try {
    const orgSubscription = await db.orgSubscription.findUnique({
      where: { orgId },
    });

    if (orgSubscription && orgSubscription.stripeCustomerId) {
      const stripeSession = await stripe.billingPortal.sessions.create({
        customer: orgSubscription.stripeCustomerId,
        return_url: settingsUrl,
      });

      url = stripeSession.url;
    } else {
      const stripeSession = await stripe.checkout.sessions.create({
        success_url: settingsUrl,
        cancel_url: settingsUrl,
        payment_method_types: ["card"],
        mode: "subscription",
        billing_address_collection: "auto",
        customer_email: user.emailAddresses[0].emailAddress,
        line_items: [
          {
            price_data: {
              currency: "USD",
              product_data: {
                name: "Task Pro",
                description: "Unlimited boards for your organization",
              },
              unit_amount: 2000,
              recurring: {
                interval: "month",
              },
            },
            quantity: 1,
          },
        ],
        metadata: {
          orgId,
        },
      });

      url = stripeSession.url || "";
    }
  } catch {
    return {
      error: "Something went wrong. Please try again later.",
    };
  }

  revalidatePath(`/organization/${orgId}`);
  return { data: url };
};

export const stripeRedirect = createSafeAction(StripeRedirect, handler);
