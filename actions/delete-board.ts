"use server";

import { revalidatePath } from "next/cache";

import { db } from "@/lib/db";

export const deleteBoard = async (id: string) => {
  await db.board.delete({
    where: {
      id,
    },
  });

  revalidatePath("/organization/org_2memavSuf9HDNNfTRo5hpw4GvX8");
};
