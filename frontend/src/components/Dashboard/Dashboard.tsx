import { authOptions, CustomSession, CustomUser } from "@/app/api/auth/[...nextauth]/options";
import { getServerSession } from "next-auth";
import DashNav from "./DashNav";
import CreateChat from "../GroupChat/CreateChat";
import { fetchChatGroups } from "@/fetch/groupFetch";
import { GroupChatType } from "@/types";
import GroupChatCard from "../GroupChat/GroupChatCard";


const Dashboard = async () => {
    const session: CustomSession | null = await getServerSession(authOptions);
    const groups: Array<GroupChatType> | [] = await fetchChatGroups(
      session?.user?.token as string
    );
  return (
    <div>
         <DashNav
        name={session?.user?.name as string}
        image={session?.user?.image ?? undefined}
      />
        <div className="container px-6">
        <div className="flex mt-10 justify-end">
          <CreateChat user={session?.user as CustomUser} />
        </div>

         {/* If Groups */}
         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {groups.length > 0 &&
            groups.map((item, index) => (
              <GroupChatCard group={item} key={index} user={session?.user as CustomUser} />
            ))}
        </div>
        </div>
    </div>
  )
}

export default Dashboard

//2:15 min