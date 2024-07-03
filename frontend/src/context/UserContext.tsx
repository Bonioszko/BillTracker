import { createContext, useState, ReactNode, useEffect } from 'react'
import { User } from '../ts/interfaces_types'
interface UserContextProviderProps {
  children: ReactNode
}

export type UserContextType = {
  user: User | null
  setUser: React.Dispatch<React.SetStateAction<User | null>>
}

export const UserContext = createContext<UserContextType | undefined>(undefined)

export default function UserContextProvider({ children }: UserContextProviderProps) {
  const [user, setUser] = useState<User | null>(null)
  useEffect(() => {
    if (!user) {
      fetch('/api/auth/profile', {
        credentials: 'include', // Include this line
      })
        .then((response) => response.json())
        .then((data) => {
          setUser(data)
        })
    }
  }, [user])
  return <UserContext.Provider value={{ user, setUser }}>{children}</UserContext.Provider>
}
