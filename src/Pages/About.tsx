import { Heart,Users,Award } from "lucide-react"
import { Link } from "react-router-dom"
import { Button } from "@/Components/ui/button"
import { Label } from "@/Components/ui/label"
import { Input } from "@/Components/ui/input"
import { Textarea } from "@/Components/ui/textarea"
import Lulu from "@/assets/Lulu.jpeg"
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
    <div className="min-h-screen flex flex-col items-center  pt-20 font-antic font-extralight">

      
                {/* Hero / About Section */}
        <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-subtle">
          <h1 className="text-4xl sm:text-5xl font-serif font-bold text-foreground  mb-10 text-center ">
              About Grace Lumière
            </h1>
          
          <div className="container mx-auto max-w-6xl">
           
            <div className="grid lg:grid-cols-2 gap-10 items-start">
              <div className="space-y-5 text-muted-foreground leading-relaxed order-2 lg:order-1">
              <p>
                Grace Lumière, founded by Cameroonian designer Engoh L. Fondoh, is a women's fashion brand
                dedicated to creating timeless, elegant pieces that allow every woman to step into her most
                confident and radiant self. Rooted in emotion, culture, and personal storytelling, the brand
                transforms fashion into an intimate expression of identity and beauty.
              </p>
              <p>
                Engoh grew up in a world softly shaped by the hum of a sewing machine and the loving presence
                of her grandmother, whose hands carried the art of craftsmanship. As a child, she sat beside
                her, learning simple stitches and unknowingly absorbing the language of creation. What began
                as childhood curiosity soon became the foundation of her creative destiny.
              </p>
              <p>
                Though she once imagined a future in science, dreaming of medicine or engineering, fashion
                slowly revealed itself through her evolving relationship with clothing. Each garment became
                more than fabric—it became expression, emotion, and identity. This quiet realization sparked
                her first creation: a handmade Ankara dress, imperfect yet deeply personal, marking the
                beginning of her journey into design.
              </p>
              <p>
                As her passion grew, so did her commitment to mastering the art. She explored textiles,
                sketching, draping, and pattern making, embracing mistakes as part of her learning.
                Eventually, she took a bold step into formal fashion education, where she found a creative
                community that helped shape her voice as a designer.
              </p>
              <p>
                Her journey expanded beyond the classroom, with experiences across West Africa that deepened
                her understanding of fashion as culture. From the vibrant energy of Lagos, where she studied
                pattern drafting and explored bridal fabrics at Yaba market, to the creative spirit of Ghana,
                where she participated in fashion shows and connected with leading designers, each experience
                strengthened her vision and purpose.
              </p>
              <p>
                These moments taught her that fashion is more than design—it is movement, culture, and
                connection. It is the courage to evolve, to trust instinct, and to grow through experience.
              </p>
              <p>
                Today, Grace Lumière is built on that foundation: emotion, heritage, and transformation.
                Each piece is created to work with the female form, enhancing natural beauty rather than
                concealing it. At its core, the brand believes that a woman's inner essence should be
                reflected outwardly—because true elegance is not created, it is revealed.
              </p>
              <p className="font-medium text-foreground">
                Grace Lumière is not just fashion. It is story, identity, and light.
              </p>
              </div>
              <div className="order-1 lg:order-2 lg:sticky lg:top-24">
                <img
                  src={Lulu}
                  alt="Grace Lumière"
                  className="w-full h-auto rounded-lg shadow-elegant"
                />
              </div>
            </div>
          </div>
        </section>


         {/* Our Process Section */}
        <section className="py-16 px-4 sm:px-6 lg:px-8">
          <div className="container mx-auto max-w-4xl">
            <h2 className="text-3xl font-serif font-semibold text-foreground mb-6 text-center">
              Our Process
            </h2>
            <div className="space-y-4 text-muted-foreground leading-relaxed">
              <p>
                Your journey with Grace Lumière begins with a personal consultation centered entirely on
                you—the bride. In this warm, intentional moment, we listen to your story, vision, and your
                dream gown.
              </p>
              <p>
                We then translate your ideas into a bespoke design created to give you confidence as you
                walk down the aisle.
              </p>
              <p>
                From the first sketch to the final fitting, every step is handled with care and artistry,
                ensuring your gown reflects you and your love story.
              </p>
            </div>
          </div>
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
