import Navbar from "../Navbar";
import { ReactNode } from "react";
interface LayoutProps {
    children: ReactNode;
}

function Layout({ children }: LayoutProps) {
    return (
        <div className=" relative w-full min-h-screen bg-background-color  flex flex-col items-center gap-4 sm:gap-20">
            <Navbar></Navbar>
            <div className="w-full flex justify-center items-center flex-col gap-3 p-2">
                {children}
            </div>
        </div>
    );
}
export default Layout;
