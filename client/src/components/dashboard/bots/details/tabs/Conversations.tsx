"use client";

import Link from "next/link";

import { ChatQueryType, useChatQuery } from "@/hooks/queries/chat.query";
import { formatDate } from "@/lib/utils";
import { IMessage } from "@/types";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/info/table";

const Conversations: React.FC<{ data: { botId: string } }> = ({
  data: { botId },
}) => {
  const { data, isLoading } = useChatQuery({
    type: ChatQueryType.GET_CHATS_BY_BOT,
    params: { botId },
  });

  if (isLoading) return "Loading...";
  if (!data) return;

  return (
    <div className="space-y-5">
      <h1 className="text-xl font-semibold">Conversations</h1>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Id</TableHead>
            <TableHead>User Message</TableHead>
            <TableHead>Created</TableHead>
            <TableHead>Response Time</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.data.chats.length === 0 ? (
            <TableRow>
              <TableCell
                colSpan={5}
                className="text-muted-foreground py-4 text-center"
              >
                No recent conversations
              </TableCell>
            </TableRow>
          ) : (
            data.data.chats
              .filter((chat) => chat.isTesting === false)
              .map((chat, i) => {
                const userMsg = chat.messages.find(
                  (m) => m.role === "user",
                ) as IMessage;
                const assistantMsg = chat.messages.find(
                  (m) => m.role === "assistant",
                ) as IMessage;

                return (
                  <TableRow key={chat._id}>
                    <TableCell>{i + 1}</TableCell>
                    <TableCell className="max-w-[300px] truncate">
                      {userMsg.content}
                    </TableCell>
                    <TableCell>{formatDate(chat.createdAt)}</TableCell>
                    {assistantMsg.responseTime && (
                      <TableCell>
                        {assistantMsg.responseTime > 0
                          ? `${(assistantMsg.responseTime / 1000).toFixed(1)}s`
                          : "—"}
                      </TableCell>
                    )}
                    <TableCell>
                      <Link
                        href={`/dashboard/my-bots/${chat.botId}/conversations/${chat._id}`}
                        className="text-[var(--primary-blue)]"
                      >
                        View Chat
                      </Link>
                    </TableCell>
                  </TableRow>
                );
              })
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default Conversations;
