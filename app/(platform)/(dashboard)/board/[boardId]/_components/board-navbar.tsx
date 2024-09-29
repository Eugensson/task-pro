import { Board } from "@prisma/client";

import { BoardOptions } from "./board-options";
import { BoardTitleForm } from "./board-title-form";

interface BoardNavbarProps {
  data: Board;
}

export const BoardNavbar = async ({ data }: BoardNavbarProps) => {
  return (
    <div className="fixed top-14 z-40 w-full h-14 flex items-center gap-x-4 px-6 text-white bg-black/50">
      <BoardTitleForm data={data} />
      <div className="ml-auto">
        <BoardOptions id={data.id} />
      </div>
    </div>
  );
};
