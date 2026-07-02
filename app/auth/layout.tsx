import { buttonVariants } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="absolute top-5 left-5">
        <Link href="/" className={buttonVariants({ variant: "secondary"})}>
          <ArrowLeft className="size-4" />
          Go Back
        </Link>
      </div>

      <div className="max-w-md w-full mx-auto">
        {children}
      </div>
    </div>
  )
}