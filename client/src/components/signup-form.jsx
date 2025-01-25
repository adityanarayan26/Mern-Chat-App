import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Zustand } from "../store/Zustand"
import { useState } from "react"
import { toast } from "sonner"
import { Link } from "react-router-dom"
import { Loader } from "lucide-react"

export function SignupForm({
  className,
  ...props
}) {
  const { signup, isSignup } = Zustand()
   const [FormData, setFormData] = useState({
     fullName: '',
     email: '',
     password: '',
     confirmpassword: ''
   })
 
   const validateForm = () => {
     const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
 
     if (!FormData.fullName.trim()) return toast.error("Full name is required...");
     if (!FormData.email.trim()) return toast.error("Email is required...");
     if (!emailRegex.test(FormData.email)) return toast.error("Invalid email format...");
     if (!FormData.password) return toast.error("Password is required...");
     if (FormData.password.length < 6) return toast.error("Password must be at least 6 characters long...");
 
     return true;
   };
   const handleSubmit = async (e) => {
     e.preventDefault();
 
     const success = validateForm();
     console.log(success);
     
     if (success === true) {
 
       await signup(FormData);
     
     }
    
   };
 
  return (
    (<div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card className="overflow-hidden">
        <CardContent className="grid p-0 md:grid-cols-2">
          <form onSubmit={handleSubmit} className="p-6 md:p-8">
            <div className="flex flex-col gap-6">
              <div className="flex flex-col items-center text-center">
                <h1 className="text-2xl font-bold">Welcome</h1>
                <p className="text-balance text-muted-foreground">
                  Register to ChatApp
                </p>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="fullName">Full Name</Label>
                <Input id="fullName" value={FormData.fullName}
                  onChange={(e) => setFormData({ ...FormData, fullName: e.target.value })}
                  type="fullName"
                  placeholder="John Doe"
                  required />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" value={FormData.email}
                  onChange={(e) => setFormData({ ...FormData, email: e.target.value })}
                  type="email"
                  placeholder="m@example.com"
                  required />
              </div>
              <div className="grid gap-2">
                <div className="flex items-center">
                  <Label htmlFor="password">Password</Label>
                
                </div>
                <Input id="password" value={FormData.password}
                  onChange={(e) => setFormData({ ...FormData, password: e.target.value })} type="password" required />
              </div>
              <div className="grid gap-2">
              <div className="flex items-center">
                  <Label htmlFor="password">Confirm Password</Label>
                 
                </div>
                <Input id="confirmpassword" value={FormData.confirmpassword}
                  onChange={(e) => setFormData({ ...FormData, confirmpassword: e.target.value })} type="password" required />
              </div>
              <Button type="submit" disabled={isSignup} className="w-full">
                {isSignup ? <Loader className="animate-spin text-white"/> : "Sign Up"}
              </Button>


              <div className="text-center text-sm">
                Don&apos;t have an account?{" "}
                <Link to={'/login'}>
                  <Button variant='link' className='text-rose-600 pl-1'>
                 Login
                  </Button> </Link>
              </div>
            </div>
          </form>
          <div className="relative hidden bg-muted md:block">
            <img
              src="https://images.unsplash.com/photo-1735597693189-9ba81b5bbc83?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              alt="Image"
              className="absolute inset-0 h-full w-full object-cover dark:brightness-[0.2] dark:grayscale" />
          </div>
        </CardContent>
      </Card>
      <div
        className="text-balance text-center text-xs text-muted-foreground [&_a]:underline [&_a]:underline-offset-4 hover:[&_a]:text-primary">
        By clicking continue, you agree to our <a href="">Terms of Service</a>{" "}
        and <a href="">Privacy Policy</a>.
      </div>
    </div>)
  );
}
