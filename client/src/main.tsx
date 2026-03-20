import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import UserSessionContextProvider from './components/context/user-session-context.tsx'
import useSessionListener from './hooks/use-session-listener.ts'

const queryClient = new QueryClient()

export function Root() {
  useSessionListener() 
  return <App />
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <UserSessionContextProvider>
      <QueryClientProvider client={queryClient}>
        <Root />
      </QueryClientProvider>
    </UserSessionContextProvider>
  </StrictMode>,
)
