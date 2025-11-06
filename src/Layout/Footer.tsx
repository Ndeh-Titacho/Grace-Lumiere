import { Button } from "@/Components/ui/button"
import { Instagram, Facebook, MessageCircle} from "lucide-react"

export const Footer = () => {

  const currentYear = new Date().getFullYear();


  return (
    <footer className="fixed bottom-0 left-0 right-0 bg-muted">
       {/* CTA Section */}
      <div className="bg-gradient-to-r from-champagne/20 to-blush/20 py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-serif font-semibold mb-4">
            Book A Consultation
          </h2>
          <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
            Schedule a personalized consultation with our expert stylists to find your perfect look.
          </p>
          <Button 
            asChild
            size="lg"
            className="bg-primary hover:bg-primary/90 text-primary-foreground font-medium shadow-elegant"
          >
            <a href="/consultation">
              <MessageCircle className="mr-2 h-5 w-5" />
              Book Now
            </a>
          </Button>
        </div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div >
          <h1 className="font-semibold text-2xl mb-4">Grace Lumiere</h1>
          <p className="py-2 text-muted-foreground mb-4">Where grace meets light.</p>
          <p className=" w-80 text-muted-foreground mb-4 text-sm">Cameroon's premier destination for exquisite bridal gowns and elegant boutique fashion.</p>
        </div>
        <div>
          <h3 className="font-semibold text-xl mb-4">Quick Links</h3>
          <ul className="flex-col space-y-2">
            <li><a href="#Bridal" className="text-muted-foreground">Bridal Suite</a></li>
            <li><a href="#boutique" className="text-muted-foreground">Boutique Collections</a></li>
            <li><a href="#contact" className="text-muted-foreground">Contact</a></li>
          </ul>
        </div>
        <div>
          <h3 className="font-semibold text-xl mb-4">Connect With Us</h3>
          <div className="flex space-x-4">
            <Button
            variant="ghost"
            size="icon"
            className="hover:bg-primary/10 hover:text-primary">
              <Instagram className="h-5 w-5"/>
            </Button>

            <Button
              variant="ghost"
              size="icon"
              className="hover:bg-primary/10 hover:text-primary">
              <Facebook className="h-5 w-5"/>
            </Button>

            <Button
              variant="ghost"
              size="icon"
              className="hover:bg-primary/10 hover:text-primary">
              <MessageCircle className="h-5 w-5"/>
            </Button>
          </div>
        </div>
         </div>

      </div>
      <div className="flex justify-center py-4 border-border border-t text-sm text-muted-foreground">
        <p>&copy; {currentYear} Grace Lumiere. All rights reserved.</p>
      </div>
    </footer>
  )
}
