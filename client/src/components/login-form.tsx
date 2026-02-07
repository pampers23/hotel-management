import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  FieldSeparator,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import React from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import authImage from "@/assets/download.jpg"
import { Eye, EyeOff } from "lucide-react"
import { useMutation } from "@tanstack/react-query"
import { userLogin } from "@/actions/auth"
import { Controller, useForm } from "react-hook-form"
import { loginSchema, type LoginSchema } from "@/zod-schema"
import { toast } from "sonner"
import { useNavigate } from "react-router-dom"

export function LoginForm({ className, ...props }: React.ComponentProps<"div">) {
  const navigate = useNavigate()
  const [showPassword, setShowPassword] = React.useState(false)

  const { mutate, isPending } = useMutation({
    mutationFn: userLogin,
    onSuccess: () => navigate("/dashboard"),
    onError: (err) => {
      console.error("LOGIN ERROR:", err)
      toast.error("Login Failed", { description: err?.message ?? "Unknown error" })
    },
  })

  const form = useForm<LoginSchema>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  })

  function onSubmit(values: LoginSchema) {
    // leave this while debugging; remove later if you want
    console.error("SUBMIT VALUES", values)
    mutate(values)
  }

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card className="overflow-hidden p-0 bg-white">
        <CardContent className="grid p-0 md:grid-cols-2">
          <form onSubmit={form.handleSubmit(onSubmit)} className="p-6 md:p-8">
            <FieldGroup>
              <div className="flex flex-col items-center gap-2 text-center">
                <h1 className="text-2xl font-bold">Welcome back</h1>
                <p className="text-muted-foreground text-balance">
                  Login to your account
                </p>
              </div>

              <Field>
                <FieldLabel htmlFor="email">Email</FieldLabel>
                <Controller
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <Input
                      id="email"
                      type="email"
                      placeholder="m@example.com"
                      required
                      disabled={isPending}
                      autoComplete="email"
                      {...field}
                    />
                  )}
                />
              </Field>

              <Field>
                <div className="flex items-center">
                  <FieldLabel htmlFor="password">Password</FieldLabel>
                  <a
                    href="/forgot-password"
                    className="ml-auto text-sm underline-offset-2 hover:underline"
                  >
                    Forgot your password?
                  </a>
                </div>

                <div className="relative">
                  <Controller
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                      <Input
                        id="password"
                        type={showPassword ? "text" : "password"}
                        required
                        disabled={isPending}
                        autoComplete="current-password"
                        className="pr-10"
                        {...field}
                      />
                    )}
                  />

                  <button
                    type="button"
                    onClick={() => setShowPassword((prev) => !prev)}
                    className="cursor-pointer absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                    aria-label={showPassword ? "Hide password" : "Show password"}
                    disabled={isPending}
                  >
                    {showPassword ? (
                      <EyeOff className="h-4 w-4" />
                    ) : (
                      <Eye className="h-4 w-4" />
                    )}
                  </button>
                </div>
              </Field>

              <Field>
                <Button
                  type="submit"
                  disabled={isPending}
                  className="bg-gold hover:bg-orange-400 disabled:opacity-60 cursor-pointer w-full"
                >
                  {isPending ? "Logging in..." : "Login"}
                </Button>
              </Field>

              <FieldSeparator className="*:data-[slot=field-separator-content]:bg-card">
                Or continue with
              </FieldSeparator>

              <Field className="w-full">
                <Button
                  className="flex w-full items-center justify-center gap-2 cursor-pointer hover:bg-primary hover:text-white"
                  variant="outline"
                  type="button"
                  disabled={isPending}
                >
                  <span className="font-medium">Continue with Google</span>
                </Button>
              </Field>

              <FieldDescription className="text-center">
                Don&apos;t have an account? <a href="/sign-up">Sign up</a>
              </FieldDescription>
            </FieldGroup>
          </form>

          <div className="bg-muted relative hidden md:block">
            <img
              src={authImage}
              alt="Image"
              className="absolute inset-0 h-full w-full object-cover"
            />
          </div>
        </CardContent>
      </Card>

      <FieldDescription className="px-6 text-center">
        By clicking continue, you agree to our <a href="#">Terms of Service</a>{" "}
        and <a href="#">Privacy Policy</a>.
      </FieldDescription>
    </div>
  )
}
