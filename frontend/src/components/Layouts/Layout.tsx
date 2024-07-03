import Navbar from '../Navbar'
import { ReactNode } from 'react'
interface LayoutProps {
  children: ReactNode
}

function Layout({ children }: LayoutProps) {
  return (
    <div className='bg-background-color relative flex min-h-screen w-full flex-col items-center gap-4 sm:gap-20'>
      <Navbar></Navbar>
      <div className='scrollbar scrollbar-track-red-900 flex w-full flex-col items-center justify-center gap-3 p-2'>
        {children}
      </div>
    </div>
  )
}
export default Layout
