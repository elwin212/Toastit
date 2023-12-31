'use client'
import { User } from "next-auth"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "./ui/Dropdown-menu"
import { FC } from 'react'
import UserAvatar from "./UserAvatar"
import Link from "next/link"
import { signOut } from "next-auth/react"
import { useToast } from '@/hooks/use-toast'

interface UserAccNavProps {
  user: Pick<User, "name" | "image" | "email">
}


const UserAccNav: FC<UserAccNavProps> = ({user}) => {
  const { toast } = useToast();
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <UserAvatar
          className="h-8 w-8" 
          user={{
          name: user.name || null,
          image: user.image || null,
          }}
        />
      </DropdownMenuTrigger>
      <DropdownMenuContent className="bg-white" align="end">
        <div className="flex items-center justify-start gap-2 p-2">
          <div className="flex flex-col space-y-1 leading-none">
            {user.name && <p className="font-medium">{user.name}</p>}
            {user.email && <p className="w-[200px] truncate text-sm text-zinc-700">{user.email}</p>}
          </div>
        </div>
        <DropdownMenuSeparator />

        <DropdownMenuItem asChild>
          <Link href="/profile">Profile</Link>
        </DropdownMenuItem>

        <DropdownMenuItem asChild>
          <Link href="/r/create">Create Group</Link>
        </DropdownMenuItem>

        <DropdownMenuItem asChild>
          <Link href="/settings">Settings</Link>
        </DropdownMenuItem>

          <DropdownMenuSeparator />

          <DropdownMenuItem             
            onSelect={(e) => {
              e.preventDefault();              
              signOut({ callbackUrl: `${window.location.origin}` })
              .then(() => {
                toast({
                  title: 'Success!',
                  description: 'You have been signed out',
                  variant: 'default',
                });
              })
              .catch((error) => {
                // Handle error if sign-out fails
                toast({
                  title: 'Something went wrong...',
                  description: 'Try again later',
                  variant: "destructive",
                });
              });
            }}
            className="cursor-pointer">
              Sign out
          </DropdownMenuItem>

      </DropdownMenuContent>
    </DropdownMenu>
    
  )
}

export default UserAccNav