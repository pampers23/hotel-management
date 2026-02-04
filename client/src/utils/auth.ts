// auth-functions.ts
import { useAuthStore } from "@/stores/auth-store";
import { toast } from "sonner";
import { useMutation } from "@tanstack/react-query"


/**
 * Handle user login
 * @param email - User's email address
 * @param password - User's password
 * @param onSuccess - Optional callback function to execute on successful login
 * @returns Promise with success status and optional error message
 */
export const handleLogin = async (
  email: string,
  password: string,
  onSuccess?: () => void
): Promise<{ success: boolean; error?: string }> => {
  const { login } = useAuthStore.getState();

  try {
    const result = await login(email, password);

    if (result.success) {
      toast.success('Welcome back!', {
        id: 'auth-login-success',
      });
      
      // Execute callback if provided
      if (onSuccess) {
        onSuccess();
      }

      return { success: true };
    } else {
      toast.error(result.error || 'Login failed', {
        id: 'auth-login-error',
      });

      return { success: false, error: result.error };
    }
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'An unexpected error occurred';
    
    toast.error(errorMessage, {
      id: 'auth-login-error',
    });

    return { success: false, error: errorMessage };
  }
};

/**
 * Handle user registration
 * @param name - User's full name
 * @param email - User's email address
 * @param password - User's password
 * @param onSuccess - Optional callback function to execute on successful registration
 * @returns Promise with success status and optional error message
 */
export function SignUp() {
  return useMutation({
    mutationFn: async ({
      name,
      email,
      password,
    }: {
      name: string
      email: string
      password: string
    }) => {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/auth/sign-up`, {
        method: 'POST',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password }),
      })
      if (!res.ok) {
        const text = await res.text()
        throw new Error(text || 'Registration failed')
      }
      return res.json()
    },
  })
}


/**
 * Validate email format
 * @param email - Email address to validate
 * @returns boolean indicating if email is valid
 */
export const validateEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

/**
 * Validate password strength
 * @param password - Password to validate
 * @returns object with validation status and message
 */
export const validatePassword = (password: string): { 
  isValid: boolean; 
  message?: string 
} => {
  if (password.length < 6) {
    return { 
      isValid: false, 
      message: 'Password must be at least 6 characters long' 
    };
  }
  
  return { isValid: true };
};

/**
 * Handle Google OAuth login (placeholder)
 * This requires backend setup
 */
export const handleGoogleLogin = () => {
  toast.info("Google sign-in requires backend setup", {
    id: 'google-auth-info',
  });
  
  // TODO: Implement Google OAuth flow
  // window.location.href = '/api/auth/google';
};

/**
 * Custom hook for authentication operations
 * Provides access to all auth functions with loading state
 */
export const useAuth = () => {
  const { isLoading } = useAuthStore();

  return {
    login: handleLogin,
    register: SignUp,
    googleLogin: handleGoogleLogin,
    validateEmail,
    validatePassword,
    isLoading,
  };
};