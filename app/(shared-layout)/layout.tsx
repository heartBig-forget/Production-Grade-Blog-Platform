import Navbar from "@/components/web/navbar"

const SharedLayout = ({ children } : { children: React.ReactNode}) => {
  return (
    <div>
      <Navbar />
      {children}
    </div>
  )
}

export default SharedLayout