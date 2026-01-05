import { Camera, User, Mail, Lock, Save, X, Loader2 } from 'lucide-react'
import React from 'react'
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Zustand } from '../store/Zustand'
import { Button } from '../components/ui/button'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
    DialogClose,
} from "@/components/ui/dialog"

const Profile = () => {
    const { authUser, isUpdatingProfile, UploadProfile, UpdateFullNameandEmail, isUpdatingCredentials } = Zustand()
    const [formData, setFormData] = React.useState({
        fullName: authUser?.fullName || "",
        password: ""
    })
    const [selectedImg, setSelectedImg] = React.useState(null)

    // Reset form when authUser updates
    React.useEffect(() => {
        if (authUser) {
            setFormData(prev => ({ ...prev, fullName: authUser.fullName || "" }))
        }
    }, [authUser])

    const handleImageSelect = (e) => {
        const file = e.target.files[0]
        if (!file) return
        const reader = new FileReader()
        reader.readAsDataURL(file)
        reader.onload = () => {
            setSelectedImg(reader.result)
        }
    }

    const handleUploadProfile = async () => {
        if (!selectedImg) return;
        await UploadProfile({ profilePic: selectedImg })
        setSelectedImg(null)
    }

    const handleCancelImage = () => {
        setSelectedImg(null)
    }

    const handleUpdateCredentials = async () => {
        // Simple validation
        if (!formData.password) return;
        await UpdateFullNameandEmail(formData)
        setFormData(prev => ({ ...prev, password: "" })) // Clear password after update
    }

    return (
        <div className='min-h-screen w-full bg-gray-50/50 pt-20 pb-12 px-4'>
            <div className="max-w-4xl mx-auto space-y-6">

                {/* Header */}
                <div className="text-center md:text-left mb-8 animate-fade-in">
                    <h1 className='text-3xl font-bold text-gray-900'>Profile Settings</h1>
                    <p className='text-gray-500 mt-1'>Manage your account information and preferences</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

                    {/* Left Column: Avatar & Basic Info */}
                    <div className="md:col-span-1 space-y-6">
                        {/* Avatar Card */}
                        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 flex flex-col items-center text-center animate-fade-in">
                            <div className="relative group mb-4">
                                <div className="relative inline-block">
                                    <img
                                        src={selectedImg || authUser?.profilePic || '/avatar.png'}
                                        alt="Profile"
                                        className={`size-32 rounded-full object-cover ring-4 ring-white shadow-lg transition-all duration-300 ${isUpdatingProfile ? 'opacity-50 grayscale' : ''}`}
                                    />
                                    {isUpdatingProfile && (
                                        <div className="absolute inset-0 flex items-center justify-center">
                                            <Loader2 className="size-8 text-blue-600 animate-spin" />
                                        </div>
                                    )}

                                    {/* Edit / Save Controls */}
                                    {!selectedImg ? (
                                        <label className={`absolute bottom-0 right-0 p-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-full cursor-pointer shadow-lg transition-transform hover:scale-105 active:scale-95 ${isUpdatingProfile ? 'hidden' : 'block'}`}>
                                            <Camera size={18} />
                                            <input type="file" className='hidden' accept='image/*' onChange={handleImageSelect} disabled={isUpdatingProfile} />
                                        </label>
                                    ) : (
                                        <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 flex gap-2 animate-fade-in">
                                            <button
                                                onClick={handleUploadProfile}
                                                disabled={isUpdatingProfile}
                                                className="p-2 bg-emerald-500 hover:bg-emerald-600 text-white rounded-full shadow-lg transition-transform hover:scale-105"
                                            >
                                                <Save size={16} />
                                            </button>
                                            <button
                                                onClick={handleCancelImage}
                                                disabled={isUpdatingProfile}
                                                className="p-2 bg-red-500 hover:bg-red-600 text-white rounded-full shadow-lg transition-transform hover:scale-105"
                                            >
                                                <X size={16} />
                                            </button>
                                        </div>
                                    )}
                                </div>
                            </div>

                            <h2 className="text-lg font-semibold text-gray-900">{authUser?.fullName}</h2>
                            <p className="text-sm text-gray-500">{authUser?.email}</p>

                            {selectedImg && !isUpdatingProfile && (
                                <p className="text-xs text-blue-600 font-medium mt-3 bg-blue-50 px-3 py-1 rounded-full animate-pulse">
                                    Tap checkmark to save
                                </p>
                            )}
                        </div>

                        {/* Account Status Card (Static for now) */}
                        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 animate-fade-in" style={{ animationDelay: '100ms' }}>
                            <h3 className="text-sm font-semibold text-gray-900 mb-4 uppercase tracking-wider">Account Stats</h3>
                            <div className="space-y-3">
                                <div className="flex justify-between text-sm">
                                    <span className="text-gray-500">Member since</span>
                                    <span className="font-medium text-gray-900">{new Date(authUser?.createdAt).toLocaleDateString()}</span>
                                </div>
                                <div className="flex justify-between text-sm">
                                    <span className="text-gray-500">Status</span>
                                    <span className="font-medium text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full text-xs">Active</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right Column: Edit Form */}
                    <div className="md:col-span-2 space-y-6">
                        <div className="bg-white rounded-2xl p-6 md:p-8 shadow-sm border border-gray-100 animate-fade-in" style={{ animationDelay: '200ms' }}>
                            <div className="flex items-center gap-3 mb-6 pb-6 border-b border-gray-100">
                                <div className="p-2 bg-blue-50 rounded-lg text-blue-600">
                                    <User size={20} />
                                </div>
                                <div>
                                    <h2 className="text-lg font-semibold text-gray-900">Personal Information</h2>
                                    <p className="text-sm text-gray-500">Update your personal details here</p>
                                </div>
                            </div>

                            <div className="space-y-6">
                                <div className="grid gap-2">
                                    <Label className="text-gray-700 font-medium">Full Name</Label>
                                    <div className="relative">
                                        <User className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                                        <Input
                                            value={formData.fullName}
                                            onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                                            className="pl-10 bg-gray-50 border-gray-200 focus:bg-white transition-all"
                                            placeholder="Your full name"
                                        />
                                    </div>
                                </div>

                                <div className="grid gap-2">
                                    <Label className="text-gray-700 font-medium">Email Address</Label>
                                    <div className="relative">
                                        <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                                        <Input
                                            value={authUser?.email}
                                            disabled
                                            className="pl-10 bg-gray-100 text-gray-500 border-gray-200 cursor-not-allowed"
                                        />
                                    </div>
                                    <p className="text-xs text-gray-400">Email cannot be changed currently.</p>
                                </div>

                                <div className="grid gap-2">
                                    <Label className="text-gray-700 font-medium">New Password</Label>
                                    <div className="relative">
                                        <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                                        <Input
                                            type="password"
                                            value={formData.password}
                                            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                                            className="pl-10 bg-gray-50 border-gray-200 focus:bg-white transition-all"
                                            placeholder="Enter new password to update"
                                        />
                                    </div>
                                    <p className="text-xs text-amber-600 bg-amber-50 p-2 rounded-lg border border-amber-100">
                                        Note: You must enter a new password to update your profile information.
                                    </p>
                                </div>

                                <div className="pt-4 flex justify-end">
                                    <Button
                                        className='bg-blue-600 hover:bg-blue-700 text-white px-8 h-11 shadow-lg shadow-blue-500/20'
                                        onClick={handleUpdateCredentials}
                                        disabled={isUpdatingCredentials || isUpdatingProfile || !formData.password || !formData.fullName}
                                    >
                                        {isUpdatingCredentials ? (
                                            <>
                                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                                Updating...
                                            </>
                                        ) : (
                                            'Save Changes'
                                        )}
                                    </Button>
                                </div>
                            </div>
                        </div>

                        {/* Danger Zone */}
                        <div className="bg-white rounded-2xl p-6 shadow-sm border border-red-100 animate-fade-in" style={{ animationDelay: '300ms' }}>
                            <div className="flex items-center gap-3 mb-4">
                                <div className="p-2 bg-red-50 rounded-lg text-red-600">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 6h18" /><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" /><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" /><line x1="10" x2="10" y1="11" y2="17" /><line x1="14" x2="14" y1="11" y2="17" /></svg>
                                </div>
                                <div>
                                    <h2 className="text-lg font-semibold text-red-600">Danger Zone</h2>
                                    <p className="text-sm text-gray-500">Irreversible account actions</p>
                                </div>
                            </div>
                            <div className="flex flex-col gap-3">
                                <p className="text-sm text-gray-600">
                                    Once you delete your account, there is no going back. Please be certain.
                                </p>
                                <Dialog>
                                    <DialogTrigger asChild>
                                        <Button
                                            variant="destructive"
                                            className="bg-red-500 hover:bg-red-600 text-white w-full uppercase font-medium tracking-wide"
                                        >
                                            Delete Account
                                        </Button>
                                    </DialogTrigger>
                                    <DialogContent className="sm:max-w-[425px]">
                                        <DialogHeader>
                                            <DialogTitle className="text-red-600 flex items-center gap-2">
                                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 6h18" /><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" /><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" /><line x1="10" x2="10" y1="11" y2="17" /><line x1="14" x2="14" y1="11" y2="17" /></svg>
                                                Delete Account
                                            </DialogTitle>
                                            <DialogDescription>
                                                Are you absolutely sure you want to delete your account? This action cannot be undone and will permanently remove your data from our servers.
                                            </DialogDescription>
                                        </DialogHeader>
                                        <DialogFooter className="gap-2 sm:gap-0">
                                            <DialogClose asChild>
                                                <Button type="button" variant="secondary">
                                                    Cancel
                                                </Button>
                                            </DialogClose>
                                            <Button
                                                type="button"
                                                variant="destructive"
                                                className="bg-red-600 hover:bg-red-700"
                                                onClick={async () => {
                                                    await Zustand.getState().deleteAccount();
                                                }}
                                            >
                                                Yes, Delete My Account
                                            </Button>
                                        </DialogFooter>
                                    </DialogContent>
                                </Dialog>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Profile