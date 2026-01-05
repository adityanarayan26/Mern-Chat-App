import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Zustand } from "../store/Zustand"
import { useState } from "react"
import { toast } from "sonner"
import { Link } from "react-router-dom"
import { Loader2, MessageSquare } from "lucide-react"

export function LoginForm({
  className,
  ...props
}) {
  const { login, isSignup } = Zustand()

  const [formData, setFormData] = useState({
    email: '',
    password: '',

  })

  const validateForm = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;


    if (!formData.email.trim()) return toast.error("Email is required...");
    if (!emailRegex.test(formData.email)) return toast.error("Invalid email format...");
    if (!formData.password) return toast.error("Password is required...");
    if (formData.password.length < 6) return toast.error("Password must be at least 6 characters long...");

    return true;
  };
  const handleSubmit = async (e) => {
    e.preventDefault()
    const success = validateForm()
    if (success) {

      await login(formData) // Changed FormData to formData
    }
  }
  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card className="overflow-hidden border-none shadow-xl bg-white">
        <CardContent className="grid p-0">
          <form onSubmit={handleSubmit} className="p-8 md:p-10">
            <div className="flex flex-col gap-6">
              <div className="flex flex-col items-center text-center">
                <div className="p-3 bg-blue-50 rounded-full mb-4">
                  <MessageSquare className="size-8 text-blue-600" />
                </div>
                <h1 className="text-2xl font-bold tracking-tight text-gray-900">Welcome back</h1>
                <p className="text-balance text-sm text-gray-500">
                  Login to your account
                </p>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="email" className="text-gray-700">Email</Label>
                <Input id="email" type="email" placeholder="m@example.com" required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="bg-gray-50 border-gray-200 text-gray-900 placeholder:text-gray-400 focus-visible:ring-blue-500"
                />
              </div>
              <div className="grid gap-2">
                <div className="flex items-center">
                  <Label htmlFor="password" className="text-gray-700">Password</Label>
                  <a href="#" className="ml-auto text-sm text-blue-600 hover:text-blue-500 font-medium">
                    Forgot details?
                  </a>
                </div>
                <Input id="password" type="password" required
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  className="bg-gray-50 border-gray-200 text-gray-900 placeholder:text-gray-400 focus-visible:ring-blue-500"
                />
              </div>
              <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white shadow-lg shadow-blue-500/30" disabled={isSignup}>
                {isSignup ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Please wait
                  </>
                ) : (
                  "Login"
                )}
              </Button>

              <div className="text-center text-sm text-gray-500">
                Don&apos;t have an account?{" "}
                <Link to="/signup" className="text-blue-600 hover:text-blue-500 font-medium hover:underline">
                  Sign up
                </Link>
              </div>
            </div>
          </form>

        </CardContent>
      </Card>
      <div className="text-balance text-center text-xs text-gray-400 [&_a]:underline [&_a]:underline-offset-4 hover:[&_a]:text-gray-500">
        By continuing, you agree to our <a href="#">Terms of Service</a> and <a href="#">Privacy Policy</a>.
      </div>
    </div>
  );
}
