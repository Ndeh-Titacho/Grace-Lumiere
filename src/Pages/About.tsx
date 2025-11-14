import { Heart,Users,Award } from "lucide-react"
import { Link } from "react-router-dom"


export const About = () => {
  return (
    <div className="min-h-screen flex flex-col items-center pt-20">
      
      <section className="max-w-3xl text-center py-16 px-4 sm:px-6 lg:px-8 bg-gradient-subtle">
        <h1 className="text-5xl font-bold font-serif">About  Grace Lumière</h1>
        <p className="py-2 text-muted-foreground mb-4 text-xl">Because the Moment is Yours.</p>
      </section>

      <section className="w-full max-w-4xl text-left py-4 px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold font-serif items-start ">Our Story</h1>
        <p className="text-muted-foreground mb-4 text-lg">Grace Lumiere was born from a passion for celebrating the beauty and elegance of African women. <br />
        Founded with a vision to provide exquisite bridal and evening wear, we understand that every moment deserves to be memorable.</p>

        <p className="text-muted-foreground mb-4 text-lg" >Our boutique specializes in curating collections that blend contemporary fashion with timeless elegance. From breathtaking bridal gowns to stunning evening dresses, each piece is carefully selected to make you feel confident and beautiful.</p>
      </section>

      {/* Values Section */}
        <section className="py-16 px-4 sm:px-6 lg:px-8 bg-muted/30">
          <div className="container mx-auto max-w-6xl">
            <h2 className="text-3xl font-serif font-semibold text-foreground mb-12 text-center">
              Our Values
            </h2>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center space-y-4">
                <div className="flex justify-center">
                  <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center">
                    <Heart className="h-8 w-8 text-primary" />
                  </div>
                </div>
                <h3 className="text-xl font-semibold text-foreground">Passion</h3>
                <p className="text-muted-foreground">
                  We are passionate about helping every woman find the perfect dress that makes her feel extraordinary.
                </p>
              </div>

              <div className="text-center space-y-4">
                <div className="flex justify-center">
                  <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center">
                    <Award className="h-8 w-8 text-primary" />
                  </div>
                </div>
                <h3 className="text-xl font-semibold text-foreground">Quality</h3>
                <p className="text-muted-foreground">
                  Every piece in our collection is chosen for its exceptional quality, craftsmanship, and attention to detail.
                </p>
              </div>

              <div className="text-center space-y-4">
                <div className="flex justify-center">
                  <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center">
                    <Users className="h-8 w-8 text-primary" />
                  </div>
                </div>
                <h3 className="text-xl font-semibold text-foreground">Service</h3>
                <p className="text-muted-foreground">
                  Our dedicated team is committed to providing personalized service that exceeds your expectations.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section className="py-16 px-4 sm:px-6 lg:px-8">
          <div className="container mx-auto max-w-4xl text-center">
            <h2 className="text-3xl font-serif font-semibold text-foreground mb-6">
              Visit Us
            </h2>
            <p className="text-lg text-muted-foreground mb-8">
              We would love to meet you and help you find the perfect dress for your special occasion.
            </p>
            <div className="space-y-2 text-muted-foreground">
              <p>WhatsApp: +237 6 79 06 91 07</p>
              <Link to="/appointment" className="underline">Open by appointment</Link>
            </div>
          </div>
        </section>
   

    </div>
  )
}
