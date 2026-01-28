import { SignupForm } from "@/components/signup-form"
import authImage from "@/assets/hero-hotel.jpg"

const SignUp = () => {
  return (
    <div className="bg-muted flex min-h-svh flex-col items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-sm md:max-w-4xl">
        <SignupForm />
        <div className="bg-muted relative hidden md:block">
          <img
            src={authImage}
            alt="Image"
            className="absolute inset-0 h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
          />
        </div>
      </div>  
    </div>
  )
}

export default SignUp
