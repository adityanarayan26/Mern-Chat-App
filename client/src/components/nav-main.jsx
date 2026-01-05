import { Skeleton } from "@/components/ui/skeleton"
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from "@/components/ui/sidebar"
import { Zustand } from "../store/Zustand";
import { useChat } from "../store/useChat";
import { useEffect, useState } from "react";

export function NavMain() {
  const { selectedUser, setSelectedUser, getUsers, isUsersLoading, users } = useChat();
  const { onlineUsers } = Zustand()
  const [showOnlineOnly, setShowOnlineOnly] = useState(false)

  useEffect(() => {
    getUsers()
  }, [getUsers])

  const filteredUsers = showOnlineOnly
    ? users?.filter((user) => onlineUsers.includes(user._id))
    : users

  return (
    <SidebarGroup>
      <SidebarGroupLabel className="flex items-center justify-between px-2 mb-2">
        <span className="text-xs font-medium text-gray-500 uppercase tracking-wider">Conversations</span>
        <button
          onClick={() => setShowOnlineOnly(!showOnlineOnly)}
          className={`text-xs font-medium px-2 py-1 rounded-full transition-all ${showOnlineOnly
              ? 'bg-emerald-100 text-emerald-700'
              : 'bg-gray-100 text-gray-500 hover:bg-gray-200'
            }`}
        >
          {showOnlineOnly ? `Online (${onlineUsers.length - 1})` : 'All'}
        </button>
      </SidebarGroupLabel>

      <SidebarMenu className="space-y-1">
        {isUsersLoading ? (
          <div className="space-y-3 p-2">
            {[1, 2, 3].map((i) => (
              <div key={i} className="flex items-center gap-3">
                <Skeleton className="h-10 w-10 rounded-full" />
                <div className="space-y-1.5 flex-1">
                  <Skeleton className="h-3 w-24" />
                  <Skeleton className="h-2 w-16" />
                </div>
              </div>
            ))}
          </div>
        ) : (
          filteredUsers?.map((user) => (
            <SidebarMenuItem key={user._id}>
              <SidebarMenuButton
                tooltip={user.fullName}
                onClick={() => setSelectedUser({
                  profilePic: user.profilePic,
                  fullName: user.fullName,
                  _id: user._id
                })}
                className={`h-auto py-3 px-3 rounded-xl transition-all ${selectedUser?._id === user._id
                    ? 'bg-blue-50 border border-blue-100 shadow-sm'
                    : 'hover:bg-gray-50'
                  }`}
              >
                <div className="flex items-center gap-3 w-full">
                  <div className="relative shrink-0">
                    <img
                      src={user.profilePic || '/avatar.png'}
                      alt={user.fullName}
                      className={`size-10 rounded-full object-cover ${selectedUser?._id === user._id
                          ? 'ring-2 ring-blue-400'
                          : 'ring-1 ring-gray-100'
                        }`}
                    />
                    {onlineUsers.includes(user._id) && (
                      <span className="absolute bottom-0 right-0 size-3 bg-emerald-500 rounded-full ring-2 ring-white" />
                    )}
                  </div>
                  <div className="flex flex-col min-w-0 flex-1">
                    <span className={`font-medium text-sm truncate ${selectedUser?._id === user._id ? 'text-blue-700' : 'text-gray-800'
                      }`}>
                      {user.fullName}
                    </span>
                    <span className={`text-xs truncate ${onlineUsers.includes(user._id)
                        ? 'text-emerald-500'
                        : 'text-gray-400'
                      }`}>
                      {onlineUsers.includes(user._id) ? 'Active now' : 'Offline'}
                    </span>
                  </div>
                </div>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))
        )}
      </SidebarMenu>
    </SidebarGroup>
  );
}
