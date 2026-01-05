import { AppSidebar } from "@/components/app-sidebar"

import { LogOut } from 'lucide-react';
import { Separator } from "@/components/ui/separator"
import { Button } from "@/components/ui/button"
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar"
import { Zustand } from "./store/Zustand"
import { useEffect } from "react"
import { useChat } from "./store/useChat";
import MessageInput from "./components/MessageInput";
import ChatContainer from "./components/ChatContainer";

const App = () => {
  const { checkAuth, authUser, logout, onlineUsers } = Zustand()
  const { selectedUser, setSelectedUser, getUsers, isUsersLoading, users, messages } = useChat();

  useEffect(() => {
    checkAuth()
  }, [checkAuth])




  return (
    (<SidebarProvider defaultOpen={true} className="bg-gray-50">
      <AppSidebar />
      <SidebarInset className="bg-gray-50/50">
        <header
          className="flex overflow-hidden fixed top-0 w-full z-[3000] h-16 shrink-0 items-center gap-2 glass pr-4">
          <div className="flex items-center gap-2 px-4 w-full">
            <SidebarTrigger className="-ml-1 text-gray-500 hover:text-blue-600 transition-colors" />
            <Separator orientation="vertical" className="mr-2 h-4 bg-gray-200/50" />
            {selectedUser ? (
              <div className="flex items-center gap-3 w-full animate-fade-in">
                <div className="relative">
                  <img src={selectedUser?.profilePic || '/avatar.png'} alt="" className="object-cover object-center size-10 rounded-full ring-2 ring-blue-100" />
                  {onlineUsers?.includes(selectedUser._id) && <div className="bg-emerald-500 rounded-full size-3 absolute z-[1000] bottom-0 right-0 ring-2 ring-white animate-pulse"></div>}
                </div>
                <div className="flex flex-col">
                  <h1 className="text-gray-900 font-semibold capitalize text-sm leading-none">{selectedUser?.fullName}</h1>
                  {onlineUsers?.includes(selectedUser._id) ?
                    <span className="text-xs text-emerald-500 font-medium">Active now</span>
                    : <span className="text-xs text-gray-400 font-medium">Offline</span>
                  }
                </div>
              </div>
            ) : <span className="text-gray-400 text-sm">Select a conversation</span>}
          </div>

        </header>
        {selectedUser ? <div className="w-full pt-20 px-4 h-screen overflow-hidden text-gray-900 bg-white chat-pattern flex flex-col gap-4 pb-4" >

          <ChatContainer />
          <div className="w-full shrink-0">

            <MessageInput />
          </div>
        </div> :
          <div className="w-full h-full bg-gradient-to-br from-blue-50/50 via-white to-indigo-50/50 flex items-center justify-center flex-col gap-6 relative overflow-hidden">
            {/* Background decoration */}
            <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-200/20 rounded-full blur-3xl animate-pulse" />
            <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-indigo-200/20 rounded-full blur-3xl animate-pulse delay-700" />

            <div className="relative z-10 p-8 rounded-3xl bg-white/80 backdrop-blur-xl border border-white/50 shadow-xl flex flex-col items-center gap-4 max-w-md text-center animate-fade-in">
              <div className="p-4 rounded-2xl bg-blue-50 mb-2">
                <div className="relative">
                  <img src="/logo.png" className="w-16 h-16 opacity-90" />
                  <div className="absolute -bottom-2 -right-2 size-6 bg-green-500 rounded-full border-4 border-white" />
                </div>
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900 mb-2">Welcome to MernChatApp!</h1>
                <p className="text-gray-500 text-sm leading-relaxed">
                  You're all set! Select a friend from the sidebar to start a new conversation or continue chatting.
                </p>
              </div>

              {/* Animated Arrow pointing left */}
              <div className="flex items-center gap-2 text-blue-600 font-medium text-sm mt-4 animate-bounce">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="rotate-180">
                  <path d="M5 12h14" />
                  <path d="m12 5 7 7-7 7" />
                </svg>
                <span>Pick a friend here</span>
              </div>
            </div>
          </div>}
      </SidebarInset>
    </SidebarProvider>)
  );
}
export default App;