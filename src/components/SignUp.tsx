import Link from 'next/link'
import UserAuthForm from './UserAuthForm'
import Image from 'next/image'


const SignUp = () => {
  return (
    <div className='container mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[400px]'>
        <div className="flex flex-col space-y-2 text-center">
            <div className="flex justify-center items-center">
                <Image
                        src="/favicon-32x32.png" // Provide the path to your image in the /public directory
                        alt="My Icon"
                        width={50}
                        height={50}
                        className="h-8 w-8 sm:h-6 sm:w-6" // Apply any additional CSS classes you need
                    />
            </div>
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
                    Sign In    
                </Link>
            </p>
        </div>   
    </div>
  )
}

export default SignUp