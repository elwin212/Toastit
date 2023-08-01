import { redirect } from 'next/navigation'

import { UserNameForm } from '@/components/UserNameForm'
import { authOptions, getAuthSession } from '@/lib/auth'

export const metadata = {
  title: 'Profile',
  description: 'User profile page',
}

export default async function SettingsPage() {
  const session = await getAuthSession()

  if (!session?.user) {
    redirect(authOptions?.pages?.signIn || '/login')
  }

  return (
    <div className='max-w-4xl mx-auto py-12'>
      <div className='grid items-start gap-8'>
        <h1 className='font-bold text-3xl md:text-4xl'>Profile</h1>

        <div className='grid gap-10'>
            <h2>This page is still in progress...</h2>
          
        </div>
      </div>
    </div>
  )
}