import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"

const ForgotPassword = () => {
  const [email, setEmail] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    // TODO: call your forgot-password API here
    console.log("Reset password email:", email)
  }

  return (
    <div className="flex min-h-screen items-center justify-center px-4">
      <div className="w-full max-w-xl">
        <div className="rounded-lg border bg-white p-8">
          
          {/* Header */}
          <h1 className="text-2xl font-semibold">
            Forgot your password?
          </h1>
          <p className="mt-2 text-sm text-muted-foreground">
            Enter the email address associated with your account and we'll send
            you a link to reset your password.
          </p>

          {/* Form */}
          <form onSubmit={handleSubmit} className="mt-6 space-y-6">
            <div className="flex flex-col gap-2">
              <Label
                htmlFor="email"
                className="text-sm font-medium"
              >
                Email
              </Label>
              <Input
                id="email"
                type="email"
                placeholder="Enter your email here"
                autoComplete="email"
                autoFocus
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="h-10 w-full rounded-md border px-3 text-sm outline-none focus:ring-2 focus:ring-primary"
              />
            </div>

            <Button
              type="submit"
              className="cursor-pointer h-10 w-full rounded-md bg-primary text-sm font-medium text-white hover:bg-primary/90"
            >
              Send Password Link
            </Button>
          </form>

          {/* Footer */}
          <div className="mt-4 text-center text-sm">
            <span className="cursor-pointer hover:underline text-primary" >
              Back to login
            </span>
          </div>

        </div>
      </div>
    </div>
  )
}

export default ForgotPassword
