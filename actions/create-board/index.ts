"use server";

import { revalidatePath } from "next/cache";
import { auth } from "@clerk/nextjs/server";
import { ACTION, ENTITY_TYPE } from "@prisma/client";

import { db } from "@/lib/db";
import { checkSubscription } from "@/lib/subscription";
import { createAuditLog } from "@/lib/create-audit-log";
import { CreateBoard } from "@/actions/create-board/schema";
import { createSafeAction } from "@/lib/create-safe-action";
import { InputType, ReturnType } from "@/actions/create-board/types";
import { incrementAvailableCount, hasAvailableCount } from "@/lib/org-limit";

const handler = async (data: InputType): Promise<ReturnType> => {
  const { userId, orgId } = auth();

  if (!userId || !orgId) {
    return {
      error: "Unauthorized",
    };
  }

  const canCreate = await hasAvailableCount();
  const isPro = await checkSubscription();

  if (!canCreate && !isPro) {
    return {
      error:
        "You have reached your limit of free boards. Please upgrade your plan to create more.",
    };
  }

  const { title, image } = data;

  const [imageId, imageThumbUrl, imageFullUrl, imageLinkHTML, imageUserName] =
    image.split("|");

  if (
    !imageId ||
    !imageThumbUrl ||
    !imageFullUrl ||
    !imageLinkHTML ||
    !imageUserName
  ) {
    return {
      error: "Missing fieds. Failed to create board.",
    };
  }

  let board;

  try {
    board = await db.board.create({
      data: {
        title,
        orgId,
        imageId,
        imageThumbUrl,
        imageFullUrl,
        imageLinkHTML,
        imageUserName,
      },
    });

    if (!isPro) {
      await incrementAvailableCount();
    }

    await createAuditLog({
      entityTitle: board.title,
      entityId: board.id,
      entityType: ENTITY_TYPE.BOARD,
      action: ACTION.CREATE,
    });
  } catch (error) {
    console.error(error);
    return {
      error: "Failed to create.",
    };
  }

  revalidatePath(`/organization/${board.id}`);
  return { data: board };
};

export const createBoard = createSafeAction(CreateBoard, handler);
