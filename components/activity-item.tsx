import { format } from "date-fns";
import { AuditLog } from "@prisma/client";

import { generateLogMessage } from "@/lib/generate-log-message";
import { Avatar, AvatarImage } from "@/components/ui/avatar";

interface ActivityItemProps {
  item: AuditLog;
}

export const ActivityItem = ({ item }: ActivityItemProps) => {
  return (
    <li className="flex items-center gap-x-2">
      <Avatar className="w-8 h-8">
        <AvatarImage src={item.userImage} alt={item.userName} />
      </Avatar>
      <div className="flex flex-col space-y-0.5">
        <p className="text-sm text-muted-foreground">
          <span className="font-semibold lowercase text-neutral-700">
            {item.userName}
          </span>{" "}
          {generateLogMessage(item)}
        </p>
        <p className="text-xs text-muted-foreground">
          {format(new Date(item.createdAt), "MMM d, yyyy 'at' h:mm a")}
        </p>
      </div>
    </li>
  );
};
