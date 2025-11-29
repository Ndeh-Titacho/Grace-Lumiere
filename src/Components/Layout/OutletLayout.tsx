import { NavBar } from "./NavBar"
import { Footer } from "./Footer"
import { Outlet } from "react-router-dom"

export const OutletLayout = () => {
  return (
    <div className="w-full min-h-screen">
        <NavBar />
        <main className="flex-1">
            <Outlet />
        </main>
        <Footer />
    </div>
  )
}
