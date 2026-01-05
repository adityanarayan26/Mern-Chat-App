import * as React from "react"
import { MessageCircle } from "lucide-react"

import { NavMain } from "@/components/nav-main"
import { NavUser } from "@/components/nav-user"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from "@/components/ui/sidebar"
import { Zustand } from "../store/Zustand"

export function AppSidebar({
  ...props
}) {
  const { authUser } = Zustand()

  const user = {
    name: authUser?.fullName || "User",
    email: authUser?.email || "user@example.com",
    avatar: authUser?.profilePic || "/avatar.png",
  }

  return (
    (<Sidebar collapsible="offcanvas" className="border-r border-gray-100/50 bg-white/80 backdrop-blur-xl" {...props}>
      <SidebarHeader className="p-4">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" className="bg-gradient-to-r from-blue-500 to-indigo-500 text-white hover:from-blue-600 hover:to-indigo-600 shadow-lg shadow-blue-500/20">
              <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-white/20">
                <MessageCircle className="size-4" />
              </div>
              <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-semibold">MernChatApp</span>
                <span className="truncate text-xs text-white/70">Messaging</span>
              </div>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent className="px-2">
        <NavMain />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>)
  );
}
