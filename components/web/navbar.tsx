'use client'

import { Button, buttonVariants } from "@/components/ui/button";
import { authClient } from "@/lib/auth-client";
import { createAuthClient } from "better-auth/react";
import Link from "next/link";
import { useRouter } from 'next/navigation';
import { toast } from "sonner";
import { ThemeToggle } from "./theme-toggle";


const { useSession } = createAuthClient()
const Navbar = () => {
	const { data: session, isPending } = useSession()
  return (
    <nav className="w-full py-5 flex items-center justify-between">
      <div className="flex items-center gap-8 ">
				<Link href="/">
					<h1 className="text-3xl font-bold">
						Next<span className="text-blue-500">Pro</span>
					</h1>
				</Link>

				<div className="flex items-center gap-2">
					<Link className={buttonVariants({variant: "ghost"})} href="/">Home</Link>
					<Link className={buttonVariants({variant: "ghost"})} href="/blog">Blog</Link>
					<Link className={buttonVariants({variant: "ghost"})} href="/create">Create</Link>
				</div>
			</div>

			<div className="flex items-center gap-2">
				{ isPending ? null : session ? (
					<Button onClick={LogOut}>Logout</Button>
				) : (
					<>
						<Link className={buttonVariants()} href="/auth/sign-up">Sign up</Link>
						<Link className={buttonVariants({ variant: "outline" })} href="/auth/login">Login</Link>
					</>
				)}
				<ThemeToggle />
			</div>
    </nav>
  )
}

function LogOut() {
	const router = useRouter();
	authClient.signOut({
		fetchOptions: {
			onSuccess: () => {
				toast.success("Logged out successfully");
				router.push("/");
			},
			onError: (error) => {
				toast.error(error.error?.message);
			},
		},
	});
}

export default Navbar