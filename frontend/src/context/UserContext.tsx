import { createContext, useState, ReactNode, useEffect } from "react";

interface UserContextProviderProps {
    children: ReactNode;
}
export interface User {
    name: string;
    email: string;
    id: string;
}

export type UserContextType = {
    user: User | null;
    setUser: React.Dispatch<React.SetStateAction<User | null>>;
};

export const UserContext = createContext<UserContextType | undefined>(
    undefined
);

export default function UserContextProvider({
    children,
}: UserContextProviderProps) {
    const [user, setUser] = useState<User | null>(null);
    console.log(user);
    useEffect(() => {
        if (!user) {
            console.log();
            fetch("/api/auth/profile", {
                credentials: "include", // Include this line
            })
                .then((response) => response.json())
                .then((data) => {
                    console.log(data);
                    setUser(data);
                });
        }
    }, []);
    return (
        <UserContext.Provider value={{ user, setUser }}>
            {children}
        </UserContext.Provider>
    );
}
