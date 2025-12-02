import F001 from '@/assets/Fortitude Collection/CIC08857.jpg'
import F002 from '@/assets/Fortitude Collection/CIC08999.jpg'
import F003 from '@/assets/Fortitude Collection/CIC09101 (1).jpg'
import F004 from '@/assets/Fortitude Collection/CIC08935.jpg'
import { useState, useEffect } from 'react'
import { Button } from '@/Components/ui/button'
import { Link } from 'react-router-dom'
import { Star } from 'lucide-react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { useCollection, type itemsType } from '@/hooks/useCollection'


export const Landing = () => {

  const [currentSlide, setCurrentSlide] = useState(0)
  const [imageLoaded, setImageLoaded] = useState(false)
  const { items, testimonials } = useCollection();



  // fallback placeholder slide while items are loading / empty
  const placeholderSlide: itemsType[] = [
        {
          id: '1',
          name: 'Fortitude Collection - 1',
          description: 'Discover your perfect bridal moment',
          price: 0,
          images: [F001],
          category: '',
          sizes: [],
          colors: '',
          fabric: '',
          fabric_composition: '',
          collection_id: ''
        },
        {
          id: '2',
          name: 'Fortitude Collection - 2',
          description: 'Creating unforgettable memories',
          price: 0,
          images: [F002],
          category: '',
          sizes: [],
          colors: '',
          fabric: '',
          fabric_composition: '',
          collection_id: ''
        },
        {
          id: '3',
          name: 'Fortitude Collection - 3',
          description: 'Embrace elegance and grace',
          price: 0,
          images: [F003],
          category: '',
          sizes: [],
          colors: '',
          fabric: '',
          fabric_composition: '',
          collection_id: ''
        },
        {
          id: '4',
          name: 'Fortitude Collection - 4',
          description: 'Timeless beauty for every moment',
          price: 0,
          images: [F004],
          category: '',
          sizes: [],
          colors: '',
          fabric: '',
          fabric_composition: '',
          collection_id: ''
        }
      ]

  // ensure we never use an empty slides array in render/effects
  const slides: itemsType[] = items ?? [];
  const displaySlides: itemsType[] = slides.length > 0 ? slides : placeholderSlide;

  useEffect(() => {
    if (displaySlides.length === 0) return;
    // keep currentSlide in range if slides length changes
    if (currentSlide >= displaySlides.length) setCurrentSlide(0);

    const src = displaySlides[currentSlide]?.images?.[0];
    if (!src) {
      setImageLoaded(false);
      return;
    }
    setImageLoaded(false);
    const img = new Image();
    img.src = src;
    img.onload = () => setImageLoaded(true);
    return () => {
      // cleanup not strictly necessary here, but safe
    };
  }, [currentSlide, displaySlides.length]);

  useEffect(() => {
    if (displaySlides.length <= 1) return;
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % displaySlides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [displaySlides.length]);

  const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % displaySlides.length);
  const prevSlide = () => setCurrentSlide((prev) => (prev - 1 + displaySlides.length) % displaySlides.length);



  return (
    <div className='min-h-screen'>

      {/* Hero Section  */}
      <section className='relative h-screen mt-20'>
        <div className='absolute inset-0'>
          {displaySlides.map((slide, index ) => (
            <div
              key={index}
              className={`absolute inset-0 transition-opacity duration-1000 ${currentSlide === index ? 'opacity-100 ' : 'opacity-0'}`}
            >
          
            <img src={slide.images?.[0] ?? F001} alt={slide.name} className='w-full h-full object-cover' />
            <div className="absolute inset-0 hero-overlay" />
            </div>
          ))}
        </div>

        {/* Hero Content */}
        <div className='relative h-full flex items-center justify-center text-center px-4'>
          <div className='max-w-4xl '>
            <h1 className='text-5xl md:text-7xl font-serif font-bold text-white mb-6 drop-shadow-lg'>
              {displaySlides[currentSlide]?.name}
            </h1>
            <p className='text-xl md:text-2xl text-white/90 mb-8 drop-shadow-md'>
              {displaySlides[currentSlide]?.description}
            </p>
            <div className='flex flex-col md:flex-row justify-center gap-2'>
              <Button
              size="lg"
              asChild
              className=''
              >
                <Link to="/bridal">Explore Bridal</Link>
              </Button>
                 <Button
                size="lg"
                variant="outline"
                asChild
                className="border-white text-white  bg-white/10 backdrop-blur-sm font-medium"
              >
                <Link to="/boutique">Shop Boutique</Link>
              </Button>
            </div>
          </div>
        </div>

        {/* Navigation Arrows */}
        <Button
          variant="ghost"
          size="icon"
          className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white"
          onClick={prevSlide}
        >
          <ChevronLeft className="h-8 w-8" />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white"
          onClick={nextSlide}
        >
          <ChevronRight className="h-8 w-8" />
        </Button>

         {/* Slide Indicators */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-2">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`h-2 rounded-full transition-all ${
                index === currentSlide
                  ? "w-8 bg-white"
                  : "w-2 bg-white/50 hover:bg-white/75"
              }`}
            />
          ))}
        </div>
      </section>

           {/* Our Story */}
      <section className='py-20 container mx-auto px-4 sm:px-6 lg:px-8'>
        <div className='max-w-3xl mx-auto text-center'>
          <h1 className='text-4xl md:text-5xl font-serif font-semibold mb-6 animate-slide-up '>Our Story</h1>
          <p className='text-lg text-muted-foreground mb-6 leading-relaxed'>Grace Lumière is Cameroon's premier destination for exquisite bridal gowns and sophisticated boutique fashion. We believe every woman deserves to feel extraordinary, whether it's her wedding day or any special moment in life.</p>
          <p className='text-lg text-muted-foreground mb-6 leading-relaxed'>Our curated collections showcase the artistry of skilled designers, ensuring that each piece is a true reflection of elegance and grace.</p>
        </div>
      </section>

          {/* Featured Collections */}
      {/* Featured Collections */}
      <section className="py-20 bg-muted">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl md:text-5xl font-serif font-semibold text-center mb-12">
            Featured Collections
          </h2>
          <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
            <Link to="/bridal" className="group">
              <div className="relative overflow-hidden rounded-lg shadow-elegant transition-smooth hover:scale-105">
                <img
                  src={F001}
                  alt="Bridal Suite"
                  className="w-full h-96 object-cover"
                />
                <div className="absolute inset-0 bg-linear-to-t from-primary/60 to-transparent flex items-end">
                  <div className="p-8 text-white">
                    <h3 className="text-3xl font-serif font-semibold mb-2">Bridal Suite</h3>
                    <p className="text-white/90">Discover your dream wedding gown</p>
                  </div>
                </div>
              </div>
            </Link>
            <Link to="/boutique" className="group">
              <div className="relative overflow-hidden rounded-lg shadow-elegant transition-smooth hover:scale-105">
                <img
                  src={F004}
                  alt="Boutique Collection"
                  className="w-full h-96 object-cover"
                />
                <div className="absolute inset-0 bg-linear-to-t from-primary/60 to-transparent flex items-end">
                  <div className="p-8 text-white">
                    <h3 className="text-3xl font-serif font-semibold mb-2">Boutique Collection</h3>
                    <p className="text-white/90">Elegant ready-to-wear pieces</p>
                  </div>
                </div>
              </div>
            </Link>
          </div>
        </div>
      </section>

        {/* Testimonials */}
      <section className="py-20 container mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-4xl md:text-5xl font-serif font-semibold text-center mb-12">
          What Our Clients Say
        </h2>
        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="bg-card p-8 rounded-lg shadow-soft hover:shadow-elegant transition-smooth"
            >
              <div className="flex gap-1 mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="h-5 w-5 fill-primary text-primary" />
                ))}
              </div>
              <p className="text-muted-foreground mb-4 italic">"{testimonial.review_text}"</p>
              <p className="font-semibold">{testimonial.client_name}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}
