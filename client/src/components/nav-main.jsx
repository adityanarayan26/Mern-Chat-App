

import { Skeleton } from "@/components/ui/skeleton"
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from "@/components/ui/sidebar"
import { Zustand } from "../store/Zustand";
import { useChat } from "../store/useChat";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox"
export function NavMain({
  items
}) {
  const { selectedUser, setSelectedUser, getUsers, isUsersLoading, users } = useChat();
  const { onlineUsers } = Zustand()
  const [showOnlineUsers, setShowOnlineUsers] = useState(false)
  useEffect(() => {
    getUsers()

  }, [getUsers])

  const filteredOnlineUsers = showOnlineUsers ? users?.filter((user) => onlineUsers.includes(user._id)) : users


  return (
    (<SidebarGroup>
      <SidebarGroupLabel>Users</SidebarGroupLabel>
      <SidebarGroupLabel> <div className="w-full h-8 flex items-center justify-end gap-x-2 text-sm ">
        <input className="checkbox checkbox-sm" type="checkbox" checked={showOnlineUsers} onChange={(e) => setShowOnlineUsers(e.target.checked)} /> show online users <h1>({onlineUsers.length - 1}) </h1>
      </div></SidebarGroupLabel>
      <SidebarMenu>

        {isUsersLoading ? <div className="flex items-center space-x-2">
          <Skeleton className="h-12 w-12 rounded-full" />
          <div className="space-y-2">
            <Skeleton className="h-4 w-[250px]" />
            <Skeleton className="h-4 w-[200px]" />
          </div>
        </div> : filteredOnlineUsers?.map((item) =>

        (

          <Collapsible
            key={item._id}
            asChild
            className="group/collapsible">
            <SidebarMenuItem>
              <CollapsibleTrigger asChild>
                <SidebarMenuButton tooltip={item.fullName} className='cursor-pointer flex items-center justify-between' onClick={() =>
                  setSelectedUser({
                    profilePic: item.profilePic,
                    fullName: item.fullName,
                    _id: item._id
                  })
                }
                >
                  <div className="flex gap-x-3">

                    <img src={item.profilePic || '/avatar.png'} alt="" className="rounded-full object-cover size-5 object-bottom" />
                    <h1>{item.fullName}</h1>
                  </div>
                  <div>
                    {onlineUsers.includes(item._id) ? < h1 className="text-emerald-400 text-xs">online</h1> : <h1 className="text-gray-400 text-xs">offline</h1>}
                  </div>
                </SidebarMenuButton>
              </CollapsibleTrigger>

            </SidebarMenuItem>
          </Collapsible>
        )
        )
        }
      </SidebarMenu>
    </SidebarGroup >)
  );
}

