import GeneralFeed from "@/components/GeneralFeed";
import CustomFeed from "@/components/CustomFeed"
import { buttonVariants } from "@/components/ui/Button";
import { getAuthSession } from "@/lib/auth";
import { HomeIcon } from "lucide-react";
import Link from "next/link";

export const dynamic = "force-dynamic";
export const fetchCache = "force-no-store";

export default async function Home() {

  const session = await getAuthSession();


  return (
    <>
    <h1 className="font-bold text-3xl md:text-4xl">See what&apos;s everyone saying</h1>
    <div className="grid grid-cols-1 md:grid-col-3 gap-y-4 md:gap-x-4 py-6">
      {/* feed */}
      {/* @ts-expect-error server component */}
      {session? <CustomFeed /> : <GeneralFeed />}

      {/* subscription */}
      <div className="overflow-hidden h-fit rounded-lg border border-gray-200 order-first md_order-last">
        <div className="bg-emerald-100 px-6 py-4 flex justify-between items-center">
          <p className="font-semibold py-3 flex items-center gap-1.5">
            <HomeIcon className="w-4 h-4"/>
            Home
          </p>
          <p className="font-semibold text-zinc-500">This website is still in progress, stay tuned!</p>
        </div>

        <div className="-my-3 divide-y divide-gray-100 px-6 py-4 text-sm leading-6">
          <div className="flex justify-between gap-x-4 py-3">
            <p className="text-zinc-500">
              Your personal Toastit page. Check your personal communities.
              <br/>Create a Group or subscribe to a Group to post!              
            </p>
                                    
          </div>
          <Link className={buttonVariants({
            className: "w-full mt-4 mb-6"
          })} href="/r/create">Create Groups</Link>
        </div>
      </div>

    </div>
    </>
  )
}
