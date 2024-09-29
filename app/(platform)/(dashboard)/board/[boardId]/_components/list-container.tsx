"use client";

import { useEffect, useState } from "react";

import { ListItem } from "./list-item";
import { ListForm } from "./list-form";
import { ListWithCards } from "@/types";

interface ListContainerProps {
  boardId: string;
  data: ListWithCards[];
}

export const ListContainer = ({ boardId, data }: ListContainerProps) => {
  console.log(boardId);

  const [orderedData, setOrderedData] = useState(data);

  useEffect(() => {
    setOrderedData(data);
  }, [data]);

  return (
    <ol className="h-full flex gap-x-3">
      {orderedData.map((list, index) => (
        <ListItem key={list.id} index={index} data={list} />
      ))}
      <ListForm />
      <div className="flex shrink-0 w-1" />
    </ol>
  );
};
