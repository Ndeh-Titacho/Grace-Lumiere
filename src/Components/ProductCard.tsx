import type { itemsType } from "@/hooks/useCollection"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { Card } from "./ui/card"
import logo from '@/assets/grace l .jpg'
import { Heart } from "lucide-react"
import { Button } from "./ui/button"


interface ProductCardProps {
    item: itemsType
}

export const ProductCard = ({item} : ProductCardProps) => {

    const [isLiked, setIsLiked] = useState(false)
    const navigate = useNavigate()

    const handleLikeClick = (e: React.MouseEvent) => {
        e.stopPropagation()
        setIsLiked(!isLiked)
    }

    const handleCardClick = () => {
        navigate(`/product/${item.id}`)
    }

  return (
    <Card className="group cursor-pointer overflow-hidden border-border hover:shadow-elegant transition-smooth"
    onClick={handleCardClick}>
        <div className="relative aspect-3/4 overflow-hidden bg-muted">
            <img 
            src={item.images[0] || logo } 
            alt={item.name}
            className="w-full h-full  group-hover:scale-110 transition-smooth" />
            
            <Button 
            variant="ghost"
            size="icon"
            onClick={handleLikeClick}
            className={`absolute top-4 right-4 bg-white/80 backdrop-blur-sm hover:bg-white transition-smooth ${
            isLiked ? "text-red-500" : "text-muted-foreground"
          }`}>
            <Heart />
            </Button>
            
        </div>
        <div className="p-6">
          <h3 className="font-serif font-semibold text-lg mb-2 group-hover:text-primary transition-smooth">
            {item.name}
          </h3>
          <p className="text-muted-foreground text-sm mb-3 line-clamp-2">
            {item.description}
          </p>
          <div className="flex items-center justify-between ">
          <div className="flex flex-col gap-1">
            <p className="text-sm text-muted-foreground">Fabric</p>
            <p>{item.fabric}</p>

          </div>
          <p className="text-sm text-muted-foreground">
            {item.colors}
          </p>
          </div>
        </div>
        </Card>
  )
}
