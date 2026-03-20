import { Navigate } from 'react-router-dom'
import { useAuthStore } from '@/stores/auth-store'
import SessionLoader from '../session-loader'

type Props = {
  children: React.ReactNode
}

export default function AuthGuard({ children }: Props) {
  const { session, isLoading } = useAuthStore()

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-lg animate-pulse">Verifying session...</div>
        <SessionLoader />
      </div>
    )
  }

  if (!session?.user) {
    return <Navigate to="/login" replace />
  }

  return <>{children}</>
}