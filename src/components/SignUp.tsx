import Link from 'next/link'
import { Icons } from './icons'
import UserAuthForm from './UserAuthForm'



const SignUp = () => {
  return (
    <div className='container mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[400px]'>
        <div className="flex flex-col space-y-2 text-center">
            <Icons.logo className="mx-auto h-6 w-6"/>
            <h1 className="text-2x font-semibold tracking-tight">Sign Up</h1>
            <p className="text-sm max-w-xs mx-auto">
                By continuing, you are agree to our User Agreement and Private Policy.
            </p>

            {/* sign-out form */}
            <UserAuthForm  />
            <p className="px-8 text-center text-sm text-zinc-700">
                Already have account?{' '}
                <Link 
                    href="/sign-in" 
                    className="hover:text-zinc-800 text-sm underline underline-offset-4">
                    Sign Up    
                </Link>
            </p>
        </div>   
    </div>
  )
}

export default SignUp