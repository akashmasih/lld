import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { RouterProvider } from 'react-router'
import { router } from './routes/index.js'
import { AuthProvider } from './shared/hooks/useAuth.js'
import { QueryClientProvider } from '@tanstack/react-query'
import queryClient from './lib/queryClient.js'
import { ToastContainer } from 'react-toastify'
import './styles/index.css'



createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AuthProvider>
      <QueryClientProvider client={queryClient}>
        <ToastContainer />
        <RouterProvider router={router} />
      </QueryClientProvider>
    </AuthProvider>
  </StrictMode>,
)
