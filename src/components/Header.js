import Image from "next/image"
import MagnifyingGlassIcon from "@heroicons/react/24/outline/MagnifyingGlassIcon"
import ShoppingCartIcon from "@heroicons/react/24/outline/ShoppingCartIcon"
import Bars3Icon from "@heroicons/react/24/outline/Bars3Icon"
import { signIn, signOut, useSession } from "next-auth/react"
import { Router, useRouter } from "next/router"
import { useSelector } from "react-redux"
import { selectItems } from "@/slices/basketSlice"

const Header = () => {
    const { status, data: session } = useSession()
    const router = useRouter()
    const items = useSelector(selectItems)
    return (
        <header>
            {/* top nav */}
            <div className="flex items-center bg-amazon_blue p-1 flex-grow py-2">
                <div className="mt-2 mx-4 flex items-center flex-grow sm:flex-grow-0">
                    <img
                        onClick={() => router.push('/')}
                        src="https://links.papareact.com/f90"
                        width={150}
                        height={40}
                        className="object-contain cursor-pointer"
                        alt=""
                    />
                </div>

                {/* search */}
                <div className="hidden sm:flex bg-yellow-400 hover:bg-yellow-500 items-center h-10 rounded-md flex-grow cursor-pointer">
                    <input className="p-2 h-full w-6 flex-grow flex-shrink rounded-l-md focus:outline-none px-4" type="text" />
                    <MagnifyingGlassIcon className="h-12 p-4" />
                </div>

                {/* right */}
                <div className="text-white flex items-center text-xs space-x-6 mx-6 whitespace-nowrap">
                    <div onClick={!session ? signIn : signOut} className="link">
                        <p>{session ? `Hello, ${session.user.name}` : "Sign In"}</p>
                        <p className="font-extrabold md:text-sm">Account & Lists</p>
                    </div>

                    <div className="link" onClick={() => router.push("/orders")}>
                        <p>Returns</p>
                        <p className="font-extrabold md:text-sm">& Orders</p>
                    </div>

                    <div onClick={() => router.push("/checkout")} className="link flex relative items-center">
                        <span className="absolute top-0 right-0 md:right-10 h-4 w-4 bg-yellow-400 text-center rounded-full text-black font-bold">{items.length}</span>
                        <ShoppingCartIcon className="h-10" />
                        <p className="hidden md:inline mt-2 font-extrabold md:text-sm">Basket</p>
                    </div>
                </div>
            </div>

            {/* bottom nav */}
            <div className="flex items-center bg-amazon_blue-light text-sm text-white space-x-3 p-2 pl-6">
                <p className="link flex items-center">
                    <Bars3Icon className="h-6 mr-1" />
                    All
                </p>
                <p className="link">Prime Video</p>
                <p className="link">Amazon Business</p>
                <p className="link">Today's Deals</p>
                <p className="link hidden lg:inline-flex">Electronic</p>
                <p className="link hidden lg:inline-flex">Food & Grocery</p>
                <p className="link hidden lg:inline-flex">Prime</p>
                <p className="link hidden lg:inline-flex">Buy Again</p>
                <p className="link hidden lg:inline-flex">Shopper Toolkit</p>
                <p className="link hidden lg:inline-flex">Health & Personal Care</p>
            </div>
        </header>
    )
}
export default Header