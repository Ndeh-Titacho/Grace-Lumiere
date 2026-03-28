import F001 from '@/assets/Fortitude Collection/CIC08857.jpg'
import F002 from '@/assets/Fortitude Collection/CIC08999.jpg'
import F003 from '@/assets/Fortitude Collection/CIC09101 (1).jpg'
import F004 from '@/assets/Fortitude Collection/CIC08993.jpg'
import { useState, useEffect } from 'react'
import { useCollection, type itemsType } from '@/hooks/useCollection'
import { ProductCard } from '@/Components/ProductCard'
import { Button } from '@/Components/ui/button'
import { Link } from 'react-router-dom'



export const Bridal = () => {

    const [currentSlide, setCurrentSlide] = useState(0)
    const { collections, bridalProducts, isLoading, error } = useCollection();

   
    
      const slides = [
        {
          image: F001,
          title: 'Fortitude Collection - 1',
          description: 'Discover your perfect bridal moment'
        },
        {
          image: F002,
          title: 'Fortitude Collection - 2',
          description: 'Creating unforgettable memories'
        },
        {
          image: F003,
          title: 'Fortitude Collection - 3',
          description: 'Embrace elegance and grace'
        },
        {
          image: F004,
          title: 'Fortitude Collection - 4',
          description: 'Timeless beauty for every moment'
        }
      ]
    
      useEffect(() => {
        const timer = setInterval(() => {
          setCurrentSlide((prev) => (prev + 1) % slides.length);
        }, 5000);
        return () => clearInterval(timer);
      }, []);
    
  return (
    <div className='min-h-screen font-antic font-extralight'>

        {/* Hero Section */}
        <section className='relative h-[70vh] md:h-screen  mt-20 '>
            <div className='absolute inset-0 '>
                {slides.map((slides, index) => (

                    <div 
                    key={index}
                    className={`absolute inset-0  transition-opacity duration-1000 ${currentSlide === index ? 'opacity-100' : 'opacity-0'}`}>
                        <img 
                        src={slides.image} 
                        alt={slides.title}
                        className='w-full h-full object-cover' />
                    </div>
                ))}
            </div>


            {/* Hero Content */}
            <div className='relative flex flex-col items-center justify-center h-full text-black'>
                <h1 className='text-5xl md:text-7xl font-light drop-shadow-lg'>Bridal Suite</h1>
                <p className='text-xl md:text-xl drop-shadow-lg'>Discover exquisite gowns for your special day</p>

                 <div className='flex flex-col md:flex-row justify-center gap-2 mt-4'>
                          <Button
                          size="lg"
                          asChild
                          className='w-[300px]'
                          >
                            <Link to="/consultation">Book A Consultation</Link>
                          </Button>
                             <Button
                            size="lg"
                            variant="outline"
                            asChild
                            className="w-[300px] border-white text-black  bg-white/10 backdrop-blur-sm font-medium"
                          >
                            <Link to="/about#enquiry">Make Enquiries</Link>
                          </Button>
                        </div>
            </div>

           
        </section>


        <section>
            <div className='container py-20 mx-auto px-4 sm:px-6 lg:px-8 text-center '>
                <h1 className='text-4xl md:text-5xl font-roboto font-light text-center mb-8'>Our Gowns</h1>
                <p className='text-lg text-muted-foreground mb-6 leading-relaxed'> Each dress is carefully crafted to make your wedding day unforgettable. <br />Click on any gown to view details and make an enquiry.
                </p>
            </div>

            <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 px-8 pb-20'>
                {bridalProducts?.map((item: itemsType)=> (
                    <ProductCard 
                    key={item.id}
                    item={item}
                    />
                ))}
            </div>
        </section>
    </div>
  )
}
