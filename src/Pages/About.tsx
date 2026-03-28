import { Heart,Users,Award } from "lucide-react"
import { Link } from "react-router-dom"
import { Button } from "@/Components/ui/button"
import { Label } from "@/Components/ui/label"
import { Input } from "@/Components/ui/input"
import { Textarea } from "@/Components/ui/textarea"
import { Send } from "lucide-react"
import { toast } from "sonner"
import {useForm, ValidationError } from '@formspree/react'
import { useEffect } from "react"


export const About = () => {

    const [state, handleSubmit, reset] = useForm("meepobyb");

    useEffect(() => {
    if (state.succeeded) {
        toast.success("Your enquiry has been sent successfully! We'll get back to you soon.");
    }
    if (state.errors && Object.keys(state.errors).length > 0) {
        toast.error("There was an error sending your enquiry. Please try again later.");
    }
}, [state.succeeded, state.errors]);

  return (
    <div className="min-h-screen flex flex-col items-center pt-20 font-antic font-extralight">
      
      <section className="max-w-3xl text-center py-16 px-4 sm:px-6 lg:px-8 bg-gradient-subtle">
        <h1 className="text-5xl font-light">About  Grace Lumière</h1>
        <p className="py-2 text-muted-foreground mb-4 text-xl">Because the Moment is Yours.</p>
      </section>

      <section className="w-full max-w-4xl text-left py-4 px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-light items-start ">Our Story</h1>
        <p className="text-muted-foreground mb-4 text-lg">Grace Lumiere was born from a passion for celebrating the beauty and elegance of African women. <br />
        Founded with a vision to provide exquisite bridal and evening wear, we understand that every moment deserves to be memorable.</p>

        <p className="text-muted-foreground mb-4 text-lg" >Our boutique specializes in curating collections that blend contemporary fashion with timeless elegance. From breathtaking bridal gowns to stunning evening dresses, each piece is carefully selected to make you feel confident and beautiful.</p>
      </section>

      {/* Values Section */}
        <section className="py-16 px-4 sm:px-6 lg:px-8 bg-muted/30">
          <div className="container mx-auto max-w-6xl">
            <h2 className="text-3xl font-roboto font-light text-foreground mb-12 text-center">
              Our Values
            </h2>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center space-y-4">
                <div className="flex justify-center">
                  <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center">
                    <Heart className="h-8 w-8 text-primary" />
                  </div>
                </div>
                <h3 className="text-xl font-light text-foreground">Passion</h3>
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
                <h3 className="text-xl font-light text-foreground">Quality</h3>
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
                <h3 className="text-xl font-light text-foreground">Service</h3>
                <p className="text-muted-foreground">
                  Our dedicated team is committed to providing personalized service that exceeds your expectations.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Enquiries Section */}
        <section className="py-16 px-4 sm:px-6 lg:px-8" id="enquiry">
          <div className="container mx-auto max-w-2xl">
            <h2 className="text-3xl font-serif font-semibold text-foreground mb-6 text-center">
              Make an Enquiry
            </h2>
            <p className="text-lg text-muted-foreground mb-8 text-center">
              Have a question or want to learn more? Send us a message and we'll get back to you.
            </p>
            <form onSubmit={handleSubmit}
              className="space-y-5"
            >
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Name</Label>
                  <Input id="name" type="text" name="name" required placeholder="Your name"  />
                  <ValidationError prefix="Name" field="name" errors={state.errors} className="text-sm text-red-500 mt-1" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" type="email" name="email" required placeholder="Your email"  />
                  <ValidationError prefix="Email" field="email" errors={state.errors} className="text-sm text-red-500 mt-1" />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="subject">Subject</Label>
                <Input id="subject" type="text" name="enquiry_subject" required placeholder="What is your enquiry about?"  />
                <ValidationError prefix="Subject" field="enquiry_subject" errors={state.errors} className="text-sm text-red-500 mt-1" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="message">Message</Label>
                <Textarea id="message" name="message" required rows={5} placeholder="Tell us more..."  />
                <ValidationError prefix="Message" field="message" errors={state.errors} className="text-sm text-red-500 mt-1" />
              </div>
              
              <Button type="submit" disabled={state.submitting} className="w-full" size="lg">
                <Send className="h-4 w-4 mr-2" /> Send Enquiry
              </Button>
            </form>
          </div>
        </section>
   

    </div>
  )
}
