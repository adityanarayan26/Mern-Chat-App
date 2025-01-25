import { Camera, UserPen } from 'lucide-react'
import React from 'react'
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Zustand } from '../store/Zustand'
import { Button } from '../components/ui/button'

const Profile = () => {

    const { authUser, isUpdatingProfile, UploadProfile, UpdateFullNameandEmail ,isUpdatingCredentials} = Zustand()
    const [FormData, setFormData] = React.useState({
        fullName: "",
        password: ""
    })
    const [selectedImg, setSelectedImg] = React.useState("")
    const handleUpload = async (e) => {
        const file = e.target.files[0]
        if (!file) return
        const reader = new FileReader()
        reader.readAsDataURL(file)
        reader.onload = async () => {
            const base64Image = reader.result
            setSelectedImg(base64Image)
            await UploadProfile({ profilePic: base64Image })
        }
    }
    const handleUpdateCredentials = async () => {
        try {
           const resp = await UpdateFullNameandEmail(FormData)
           console.log(resp);
           
            
        } catch (error) {
            console.log('error in updating credentials', error);

        }
    }
    return (
        <div className='h-screen w-full bg-zinc-300 flex items-center justify-center p-10'>

            <div className='rounded-lg p-5 h-full w-[40rem] z-[2000] shadow-lg bg-zinc-900 text-white flex flex-col items-center gap-y-2'>
                <div>
                    <h1 className='text-white'>Your Profile</h1>
                </div>
                <div className='relative cursor-pointer '>

                    <img src={selectedImg || authUser.profilePic || '/avatar.png'} alt="Profile" className='size-40 rounded-full object-cover object-center ' />
                    <label className={`absolute bottom-0 right-0 bg-zinc-500 rounded-full p-2 cursor-pointer ${isUpdatingProfile ? 'animate-pulse pointer-events-none' : ''}`}>

                        <Camera className='size-5 text-white' />
                        <input type="file" className='hidden' accept='image/*' onChange={handleUpload} disabled={isUpdatingProfile} />
                    </label>
                </div>
                <p className='text-sm text-muted-foreground'>{isUpdatingProfile ? "Uploading..." : "Click the camera icon to update the profile"}</p>
                <div className='grid grid-rows-2 w-full px-10 gap-5 text-white'>


                    <div className="grid gap-2 rows-span-1">
                        <Label htmlFor="email">Full Name</Label>
                        <Input id="fullName" value={FormData.fullName}
                            onChange={(e) => setFormData({ ...FormData, fullName: e.target.value })}
                            type="text"
                            name='fullName'
                            placeholder="John Doe"
                            required />
                    </div>
                    <div className="grid gap-2  rows-span-1">
                        <div className="flex items-center">
                            <Label htmlFor="password">Password</Label>

                        </div>
                        <Input id="password" placeholder='password is required' value={FormData.password}
                            onChange={(e) => setFormData({ ...FormData, password: e.target.value })} type="password" required />
                    </div>
                </div>
                <Button className='bg-white text-black hover:bg-black hover:text-white' onClick={handleUpdateCredentials} disabled={isUpdatingCredentials}>Update</Button>
            </div>
        </div>
    )
}

export default Profile