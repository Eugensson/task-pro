"use server";

import { redirect } from "next/navigation";
import { auth } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";
import { ACTION, ENTITY_TYPE } from "@prisma/client";

import { db } from "@/lib/db";
import { checkSubscription } from "@/lib/subscription";
import { createAuditLog } from "@/lib/create-audit-log";
import { decreaseAvailableCount } from "@/lib/org-limit";
import { createSafeAction } from "@/lib/create-safe-action";
import { DeleteBoard } from "@/actions/delete-board/schema";
import { InputType, ReturnType } from "@/actions/delete-board/types";

const handler = async (data: InputType): Promise<ReturnType> => {
  const { userId, orgId } = auth();

  if (!userId || !orgId) return { error: "Unauthorized" };

  const isPro = await checkSubscription();

  const { id } = data;
  let board;

  try {
    board = await db.board.delete({
      where: {
        id,
        orgId,
      },
    });

    if (!isPro) {
      await decreaseAvailableCount();
    }

    await createAuditLog({
      entityTitle: board.title,
      entityId: board.id,
      entityType: ENTITY_TYPE.BOARD,
      action: ACTION.DELETE,
    });
  } catch (error) {
    console.error(error);
    return { error: "Failed to delete" };
  }

  revalidatePath(`/organization/${orgId}`);
  redirect(`/organization/${orgId}`);
};

export const deleteBoard = createSafeAction(DeleteBoard, handler);
