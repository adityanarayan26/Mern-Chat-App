"use client"

import * as React from "react"
import { Calendar, Image, MoreHorizontal, Plus, Smile, Tags, Trash, User } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
} from "@/components/ui/command"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuShortcut,
    DropdownMenuSub,
    DropdownMenuSubContent,
    DropdownMenuSubTrigger,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import toast from "react-hot-toast"

const labels = [
    "feature",
    "bug",
    "enhancement",
    "documentation",
    "design",
    "question",
    "maintenance",
]

export function ComboboxDropdownMenu() {
    const [label, setLabel] = React.useState("feature")
    const [open, setOpen] = React.useState(false)
    const fileInputRef = React.useRef(null)
    const handleFileChange = (e) => {
        const file = e.target.files[0]
        if (!file.type.startsWith("image/")) {
            toast.error('Invalid file type')
            return
        }
        const reader = new FileReader()
        reader.onloadend = () => {
            setImagePreview(reader.result)
        }
        reader.readAsDataURL(file)
    }
    const removeImage = ()=>{
        setImagePreview(null)
        if(fileInputRef.current){
            fileInputRef.current.value = ''
        }
    }
    return (
        <div className="flex items-start justify-between rounded-md  sm:flex-row sm:items-center">
            <input type="file" accept="image/*" className="hidden" ref={fileInputRef} onChange={handleFileChange} />
            <DropdownMenu open={open} onOpenChange={setOpen}>
                <DropdownMenuTrigger asChild>
                    <Plus className='text-base-300 cursor-pointer' />

                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-fit p-2 flex justify-evenly items-center text-gray-600">
                    <Image className="cursor-pointer" onClick={() => fileInputRef.current?.click()} />
                    <Smile className="cursor-pointer" />
                </DropdownMenuContent>
            </DropdownMenu>
        </div>
    )
}
