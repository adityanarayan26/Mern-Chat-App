"use client"

import {
  BadgeCheck,
  Bell,
  ChevronsUpDown,
  CreditCard,
  LogOut,
  Settings,
  Sparkles,
  UserRoundPen,
} from "lucide-react"

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar"
import { Zustand } from "../store/Zustand"
import { Link } from "react-router-dom"

export function NavUser({
  user
}) {
  const { isMobile } = useSidebar()
  const { authUser, logout } = Zustand()
  const handleClick = async () => {
    await logout()
  }
  const getInitials = (name) => {
    if (!name) return "CN";
    const nameParts = name.split(" ");
    const initials = nameParts[0][0];
    return initials.toUpperCase();
  };
  return (
    (<SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton
              size="lg"
              className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground">
              <Avatar className="h-8 w-8 rounded-lg">
                <AvatarImage src={authUser.profilePic} alt={authUser.fullName} />
                <AvatarFallback className="rounded-lg"> {getInitials(authUser?.fullName)}</AvatarFallback>
              </Avatar>
              <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-semibold">{authUser.fullName}</span>
                <span className="truncate text-xs">{authUser.email}</span>
              </div>
              <ChevronsUpDown className="ml-auto size-4" />
            </SidebarMenuButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg"
            side={isMobile ? "bottom" : "right"}
            align="end"
            sideOffset={4}>
            <DropdownMenuLabel className="p-0 font-normal">
              <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                <Avatar className="h-8 w-8 rounded-lg">
                  <AvatarImage src={user.avatar} alt={authUser.fullName} />
                  <AvatarFallback className="rounded-lg">{getInitials(authUser?.fullName)}</AvatarFallback>
                </Avatar>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-semibold">{authUser.fullName}</span>
                  <span className="truncate text-xs">{authUser.email}</span>
                </div>
              </div>
            </DropdownMenuLabel>

            <DropdownMenuGroup>
              <Link to={'/profile'}>
                <DropdownMenuItem className='cursor-pointer'>
                  <UserRoundPen />
                  Profile
                </DropdownMenuItem></Link>
              <Link to={'/setting'}>
                <DropdownMenuItem>
                  <Settings />
                  Settings
                </DropdownMenuItem>
              </Link>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="text-red-500 bg-rose-500/10 flex items-center cursor-pointer" onClick={handleClick}>
              <LogOut />
              Log out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>)
  );
}
