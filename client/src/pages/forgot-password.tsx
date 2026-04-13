import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Link } from "react-router-dom"
import { useMutation } from "@tanstack/react-query"
import { sendPasswordResetLink } from "@/actions/auth"
import { useForm } from "react-hook-form"
import { forgotPasswordSchema, type ForgotPasswordSchema } from "@/zod-schema"
import { zodResolver } from "@hookform/resolvers/zod"
import { DotPulse } from "ldrs/react"

const ForgotPassword = () => {
  const { mutate, isPending } = useMutation({
    mutationFn: sendPasswordResetLink,
  })

  const form = useForm<ForgotPasswordSchema>({
    defaultValues: {
      email: "",
    },
    resolver: zodResolver(forgotPasswordSchema),
  });

  function onSubmit(values: ForgotPasswordSchema) {
    mutate(values);
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
          <form onSubmit={form.handleSubmit(onSubmit)} className="mt-6 space-y-6">
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
                className="h-10 w-full rounded-md border px-3 text-sm outline-none focus:ring-2 focus:ring-primary"
              />
            </div>

            <Button
              disabled={isPending}
              type="submit"
              className="cursor-pointer h-10 w-full rounded-md bg-primary text-sm font-medium text-white hover:bg-primary/90"
            >
              {isPending ? (
                <>
                  Sending
                  <DotPulse size="30" speed="1.3" color="white"/>
                </>
              ) : (
                "Send reset password link"
              )}
            </Button>
          </form>

          {/* Footer */}
          <div className="mt-4 text-center text-sm">
            <span className="cursor-pointer hover:underline text-primary" >
              <Link to={"/login"}>
                Back to login
              </Link>
            </span>
          </div>

        </div>
      </div>
    </div>
  )
}

export default ForgotPassword
