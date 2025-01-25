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
    (<SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <header
          className="flex overflow-hidden fixed bg-white w-full z-[3000]  h-[5%] shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12 pr-12 ">
          <div className="flex items-center gap-2 px-4 ">
            <SidebarTrigger className="-ml-1 text-black" />
            <Separator orientation="vertical" className="mr-2 h-4" />
            {selectedUser ? (
              <>
                <div className="relative">

                  <img src={selectedUser?.profilePic || '/avatar.png'} alt="" className="object-cover object-center size-16 rounded-full p-3" />
                  {onlineUsers?.includes(selectedUser._id) ? <div className="bg-emerald-400 rounded-full size-2 absolute z-[1000] top-3 right-3"></div> : <div className="bg-gray-400 rounded-full size-2 absolute z-[2] top-3 right-3"></div>}
                </div>
                <h1 className="text-black capitalize">{selectedUser?.fullName}</h1>
              </>
            ) : ""}
          </div>

        </header>
        {selectedUser ? <div className="w-full pt-12 px-3 h-screen overflow-hidden text-white bg-base-200 " >

          <ChatContainer />
          <div className="h-[5%] w-full ">

            <MessageInput />
          </div>
        </div> :
          <div className="w-full h-full bg-base-200 flex items-center justify-center">
            <h1 className="text-base-content text-xl">No Chat Selected...</h1>
          </div>}
      </SidebarInset>
    </SidebarProvider>)
  );
}
export default App;