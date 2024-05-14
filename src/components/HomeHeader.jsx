import Link from "next/link"
import { TbGridDots } from "react-icons/tb";
export default function HomeHeader() {
    return (
        <header className="flex justify-end p-5 text-sm">
            <div className="flex space-x-4 items-center">
                <Link href={"https://gmail.google.com"} className="hover:underline">Gmail</Link>
                <Link href={"https://image.google.com"} className="hover:underline">Images</Link>
                <TbGridDots className="bg-transparent hover:bg-gray-200 text-4xl rounded-full p-2" />
                <button className="bg-blue-500 text-white px-4 py-2 font-medium 
                rounded-md hover:brightness-105 hover:shadow-md transition-shadow">Sign In</button>
            </div>
        </header>
    )
}
