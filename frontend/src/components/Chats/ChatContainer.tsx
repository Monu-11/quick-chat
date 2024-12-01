import { fetchChatGroup, fetchChatGroupUsers } from "@/fetch/groupFetch";
import ChatBase from "./ChatBase";
import { GroupChatType, GroupChatUserType, MessageType } from "@/types";
import { notFound } from "next/navigation";
import { fetchChats } from "@/fetch/chatsFetch";

const ChatContainer = async ({ id }: { id: string }) => {
  if(id.length !== 36){
    return notFound()
  }
  const chatGroup: GroupChatType | null = await fetchChatGroup(id)

  if(chatGroup === null){
    return notFound()
  }

  const chatGroupUsers: Array<GroupChatUserType> | [] =
  await fetchChatGroupUsers(id);

  const chats: Array<MessageType> | [] = await fetchChats(id);

  return (
    <div>
      <ChatBase group={chatGroup} users={chatGroupUsers} oldMessages={chats} />
    </div>
  );
};

export default ChatContainer;
