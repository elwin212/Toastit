import Link from "next/link"
import { buttonVariants } from "./ui/Button"
import { getAuthSession } from '@/lib/auth'
import UserAccNav from "./UserAccNav"
import SearchBar from "./SearchBar"
import Image from 'next/image'

const Navbar = async () => {
    const session = await getAuthSession();

    return <div className="fixed top-0 inset-x-0 h-fit bg-zinc-100  border-zinc-300 z-[10] py-2">
        <div className="container max-w-7xl h-full mx-auto flex items-center justify-between pag-2">
            <Link href='/' className= "flex gap-2 item-center">            
                    <Image
                        src="/favicon-32x32.png" // Provide the path to your image in the /public directory
                        alt="My Icon"
                        width={50}
                        height={50}
                        className="h-8 w-8 sm:h-6 sm:w-6" // Apply any additional CSS classes you need
                    />
                <p className="hidden text-zinc-700 text-md font-medium md:block">Toastit</p>
            </Link>
            {/* serach bar */}
            <SearchBar />
            
            {session?.user ? (
                <UserAccNav user={session.user}/>                
            ) : (<Link href='/sign-in' className={buttonVariants()}>Sign In</Link>)}
        </div>
    </div>
}

export default Navbar