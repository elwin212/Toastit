import Image from "next/image";
import Link from "next/link";
import { FC } from 'react'

interface FooterProps {
  
}

const Footer: FC<FooterProps> = ({}) => {
    const hoverLinkStyles = "hover:underline underline-offset-2";
    return (
        <footer className="dark:bg-black bg-zinc-100">
        <article className="container flex flex-col py-6 gap-x-8 gap-y-4 lg:flex-row lg:justify-between lg:py-4">
            <section className="flex flex-col lg:flex-row gap-x-2 gap-y-4 lg:items-center">
            <Link href={"/"} title="Toastis Home">
                <Image
                    src="/toastit192.png" // Provide the path to your image in the /public directory
                    alt="My Icon"
                    width={60}
                    height={60}
                    className="h-8 w-8 sm:h-6 sm:w-6" // Apply any additional CSS classes you need
                />
            </Link> 
            <p>
            Built by&nbsp;
            <Link
              href={"https://github.com/elwin212"}
              target="_blank"
              title="See Elwin's Github"
              rel="noreferrer"
              className={`font-medium text-primary ${hoverLinkStyles}`}
            >
              Elwin
            </Link>
            
          </p>                       
            </section>            

            <section
            data-name="legal-links"
            className="flex flex-row flex-wrap gap-4 text-sm lg:items-center"
            >
            <Link
                href={"/privacy"}
                title="See our privacy policy."
                className={hoverLinkStyles}
            >
                Privacy
            </Link>
            <Link
                href={"/terms"}
                title="See our terms & conditions"
                className={hoverLinkStyles}
            >
                Terms
            </Link>
            <Link
                href={"/about"}
                title="See what this website is about"
                className={hoverLinkStyles}
            >
                About
            </Link>
            </section>
        </article>
      
        </footer>
      );
}

export default Footer