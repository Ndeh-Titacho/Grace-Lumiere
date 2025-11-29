import { Link, useLocation } from "react-router-dom"
import { useState } from "react"
import logo from "@/assets/grace l .jpg"
import { Button } from "@/Components/ui/button"
import { ChevronDown, Heart,Menu, X } from "lucide-react"
import { bridalCollections, boutiqueCollections } from "@/data/products";
import { DropdownMenu,DropdownMenuTrigger,DropdownMenuContent,DropdownMenuItem } from "@/Components/ui/dropdown-menu"

export const NavBar = () => {
     const location = useLocation()
 const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

 const isActive = (path: string) => location.pathname === path
  return (
       <nav className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border shadow-soft">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center group">
            <img 
              src={logo} 
              alt="Grace Lumiere" 
              className=" h-12 sm:h-14 w-auto object-contain transition-smooth group-hover:opacity-80"
            />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link
              to="/"
              className={`text-sm font-medium transition-smooth relative group ${
                isActive("/")
                  ? "text-primary"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              Home
              <span
                className={`absolute -bottom-1 left-0 h-0.5 bg-primary transition-smooth ${
                  isActive("/") ? "w-full" : "w-0 group-hover:w-full"
                }`}
              />
            </Link>

            {/* Bridal Suite Dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger className="text-sm font-medium transition-smooth text-muted-foreground hover:text-foreground flex items-center gap-1 outline-none">
                Bridal Suite
                <ChevronDown className="h-3 w-3" />
              </DropdownMenuTrigger>
              <DropdownMenuContent className="bg-background border-border">
                <DropdownMenuItem asChild>
                  <Link to="/bridal" className="cursor-pointer">
                    View All
                  </Link>
                </DropdownMenuItem>
                {bridalCollections.map((collection) => (
                  <DropdownMenuItem key={collection.id} asChild>
                    <Link to={`/collection/bridal/${collection.id}`} className="cursor-pointer">
                      {collection.name}
                    </Link>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Boutique Dropdown */}
             <Link
              to="/boutique"
              className={`text-sm font-medium transition-smooth relative group ${
                isActive("/boutique")
                  ? "text-primary"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              Boutique
              <span
                className={`absolute -bottom-1 left-0 h-0.5 bg-primary transition-smooth ${
                  isActive("/boutique") ? "w-full" : "w-0 group-hover:w-full"
                }`}
              />
            </Link>
            {/* <DropdownMenu>
              <DropdownMenuTrigger className="text-sm font-medium transition-smooth text-muted-foreground hover:text-foreground flex items-center gap-1 outline-none">
                Boutique
                <ChevronDown className="h-3 w-3" />
              </DropdownMenuTrigger>
              <DropdownMenuContent className="bg-background border-border">
                <DropdownMenuItem asChild>
                  <Link to="/boutique" className="cursor-pointer">
                    View All
                  </Link>
                </DropdownMenuItem>
                {boutiqueCollections.map((collection) => (
                  <DropdownMenuItem key={collection.id} asChild>
                    <Link to={`/collection/boutique/${collection.id}`} className="cursor-pointer">
                      {collection.name}
                    </Link>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu> */}

            <Link
              to="/about"
              className={`text-sm font-medium transition-smooth relative group ${
                isActive("/about")
                  ? "text-primary"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              About
              <span
                className={`absolute -bottom-1 left-0 h-0.5 bg-primary transition-smooth ${
                  isActive("/about") ? "w-full" : "w-0 group-hover:w-full"
                }`}
              />
            </Link>

            <Link
              to="/packages"
              className={`text-sm font-medium transition-smooth relative group ${
                isActive("/packages")
                  ? "text-primary"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              Explore Packages
              <span
                className={`absolute -bottom-1 left-0 h-0.5 bg-primary transition-smooth ${
                  isActive("/packages") ? "w-full" : "w-0 group-hover:w-full"
                }`}
              />
            </Link>

            <Button variant="ghost" size="icon" className="relative">
              <Heart className="h-5 w-5" />
              <span className="absolute -top-1 -right-1 h-4 w-4 rounded-full bg-primary text-primary-foreground text-xs flex items-center justify-center">
                0
              </span>
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </Button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 animate-fade-in">
            <div className="flex flex-col space-y-4">
              <Link
                to="/"
                onClick={() => setMobileMenuOpen(false)}
                className={`text-base font-medium transition-smooth px-4 py-2 rounded-lg ${
                  isActive("/")
                    ? "text-primary bg-primary/10"
                    : "text-muted-foreground hover:text-foreground hover:bg-muted"
                }`}
              >
                Home
              </Link>

              <div className="px-4 py-2">
                <p className="text-xs font-semibold text-muted-foreground uppercase mb-2">Bridal Suite</p>
                <div className="flex flex-col space-y-2 ml-4">
                  <Link
                    to="/bridal"
                    onClick={() => setMobileMenuOpen(false)}
                    className="text-sm text-muted-foreground hover:text-foreground"
                  >
                    View All
                  </Link>
                  {bridalCollections.map((collection) => (
                    <Link
                      key={collection.id}
                      to={`/collection/bridal/${collection.id}`}
                      onClick={() => setMobileMenuOpen(false)}
                      className="text-sm text-muted-foreground hover:text-foreground"
                    >
                      {collection.name}
                    </Link>
                  ))}
                </div>
              </div>

              <div className="px-4 py-2">
                <p className="text-xs font-semibold text-muted-foreground uppercase mb-2">Boutique</p>
                <div className="flex flex-col space-y-2 ml-4">
                  <Link
                    to="/boutique"
                    onClick={() => setMobileMenuOpen(false)}
                    className="text-sm text-muted-foreground hover:text-foreground"
                  >
                    View All
                  </Link>
                  {boutiqueCollections.map((collection) => (
                    <Link
                      key={collection.id}
                      to={`/collection/boutique/${collection.id}`}
                      onClick={() => setMobileMenuOpen(false)}
                      className="text-sm text-muted-foreground hover:text-foreground"
                    >
                      {collection.name}
                    </Link>
                  ))}
                </div>
              </div>

              <Link
                to="/about"
                onClick={() => setMobileMenuOpen(false)}
                className={`text-base font-medium transition-smooth px-4 py-2 rounded-lg ${
                  isActive("/about")
                    ? "text-primary bg-primary/10"
                    : "text-muted-foreground hover:text-foreground hover:bg-muted"
                }`}
              >
                About
              </Link>

              <Link
                to="/packages"
                onClick={() => setMobileMenuOpen(false)}
                className={`text-base font-medium transition-smooth px-4 py-2 rounded-lg ${
                  isActive("/packages")
                    ? "text-primary bg-primary/10"
                    : "text-muted-foreground hover:text-foreground hover:bg-muted"
                }`}
              >
                Explore Packages
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}
