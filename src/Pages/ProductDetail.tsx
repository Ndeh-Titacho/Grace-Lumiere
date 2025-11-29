import { useParams, useNavigate } from "react-router-dom"
import { bridalProducts } from "@/data/products"
import { boutiqueProducts } from "@/data/products"
import { useState } from "react"
import { Button } from "@/Components/ui/button"
import { ArrowLeft, Heart, MessageCircle } from "lucide-react"
import { Badge } from "@/Components/ui/badge"
import { Dialog,DialogContent,DialogDescription,DialogHeader,DialogTitle } from "@/Components/ui/dialog"



export const ProductDetail = () => {

    const { id } = useParams()
    const navigate = useNavigate()
    const [isLiked, setIsLiked] = useState(false);
    const [selectedSize, setSelectedSize] = useState<string>("");
    const [selectedImageIndex, setSelectedImageIndex] = useState(0);
    const [selectedPayment, setSelectedPayment] = useState<string | null>(null);
    const [showSizeChart, setShowSizeChart] = useState(false);

    // Find products in both collections
    const allProducts = [...bridalProducts, ...boutiqueProducts]
    const product = allProducts.find((prod) => prod.id === id);

    if (!product) {
        return (
            <div className="min-h-screen">
                <div className="container mx-auto px-4 py-20 mt-20 text-center">
                    <h1 className="text-4xl font-serif mb-4">Product Not Found</h1>
                    <Button onClick={() => navigate(-1)}>Go Back</Button>
                </div>
            </div>
        );
    }

    const placeholderImage = product.category === "bridal"
        ? "https://images.unsplash.com/photo-1515934751635-c81c6bc9a2d8?w=1200&h=1600&fit=crop"
        : "https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=1200&h=1600&fit=crop";

    // create an array of images 
    const productImages = product.images && product.images.length > 0 ? product.images : [placeholderImage, placeholderImage, placeholderImage];

    const handleWhatsAppEnquiry = () => {
        const phoneNumber = "237679069107"
        const message = encodeURIComponent(
            `Hello! I'm interested in ${product.name} (ID: ${product.id}). Could you provide more information?`
        );
        window.open(`https://wa.me/${phoneNumber}?text=${message}`, "_blank");
    };


    return (
        <div className="min-h-screen pb-12">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 mt-20 ">
                <Button
                    variant="ghost"
                    onClick={() => navigate(-1)}
                    className="mb-6 ">
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Back
                </Button>
            </div>

            <div className="grid lg:grid-cols-2 gap-12 px-4">
                {/* Image Gallery */}
                <div className="space-y-4">
                    <div className="relative">
                        <img
                            src={productImages[selectedImageIndex]}
                            alt={product.name}
                            className="w-full h-full object-cover"
                        />
                        <Button
                            variant="ghost"
                            size="icon"
                            className={`absolute top-4 right-4 bg-white/80 backdrop-blur-sm hover:bg-white ${isLiked ? "text-red-500" : "text-muted-foreground"}`}
                            onClick={() => setIsLiked(!isLiked)}
                        >
                            <Heart className={`h-5 w-5 ${isLiked ? "fill-current" : ""}`} />
                        </Button>
                    </div>

                    {/* Thumbnail gallery */}
                    {productImages.length > 1 && (
                        <div className="grid grid-cols-4 gap-4">
                            {productImages.map((image, index) => (
                                <button
                                    key={index}
                                    onClick={() => setSelectedImageIndex(index)}
                                    className={`relative aspect-3/4 rounded-lg overflow-hidden bg-muted border-2 transition-smooth ${selectedImageIndex === index ? "border-primary" : "border-transparent hover:border-primary/50"}`}
                                >
                                    <img
                                        src={image}
                                        alt={`${product.name} view ${index + 1}`}
                                        className="w-full h-full object-cover"
                                    />
                                </button>
                            ))}
                        </div>
                    )}
                </div>

                {/* Product Details */}
                <div className="space-y-8">
                    <div>
                        <h1 className="text-4xl md:text-5xl font-serif font-bold mb-4">
                            {product.name}
                        </h1>
                        <p className="text-sm text-muted-foreground mb-2">Product ID: {product.id}</p>
                    </div>

                    <div>
                        <h3 className="text-lg font-semibold mb-3">Description</h3>
                        <p className="text-muted-foreground leading-relaxed">{product.description}</p>
                    </div>

                    <div className="grid grid-cols-2 gap-6">
                        <div>
                            <h4 className="font-semibold mb-3">Color</h4>
                            <Badge variant="secondary" className="text-base px-4 py-2">{product.color}</Badge>
                        </div>
                        <div>
                            <h4 className="font-semibold mb-3">Fabric</h4>
                            <p className="text-muted-foreground">{product.fabricType}</p>
                        </div>
                    </div>

                    <div>
                        <h4 className="font-semibold mb-3">Fabric Composition</h4>
                        <p className="text-muted-foreground">{product.fabricComposition}</p>
                    </div>

                    <div>
                        <div className="flex items-center justify-between mb-4">
                            <h4 className="font-semibold">Available Sizes</h4>
                            <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => setShowSizeChart(true)}
                                className="text-primary hover:text-primary/80"
                            >
                                View Size Chart
                            </Button>
                        </div>
                        <div className="flex flex-wrap gap-3">
                            {product.sizes.map((size) => (
                                <Button
                                    key={size}
                                    variant={selectedSize === size ? "default" : "outline"}
                                    size="lg"
                                    onClick={() => setSelectedSize(size)}
                                    className="min-w-16"
                                >
                                    {size}
                                </Button>
                            ))}
                        </div>
                    </div>
                     <div className="bg-muted p-6 rounded-lg">
              <h4 className="font-semibold mb-4">Payment Options</h4>
              <div className="space-y-2">
                <Button
                  variant="ghost"
                  className="w-full justify-start text-muted-foreground hover:text-foreground"
                  onClick={() => setSelectedPayment("orange")}
                >
                  • Mobile Money (Orange Cameroon)
                </Button>
                <Button
                  variant="ghost"
                  className="w-full justify-start text-muted-foreground hover:text-foreground"
                  onClick={() => setSelectedPayment("mtn")}
                >
                  • Mobile Money (MTN Cameroon)
                </Button>
                <Button
                  variant="ghost"
                  className="w-full justify-start text-muted-foreground hover:text-foreground"
                  onClick={() => setSelectedPayment("bank")}
                >
                  • Bank Transfer
                </Button>
              </div>
            </div>

               <Button
              onClick={handleWhatsAppEnquiry}
              className="w-full bg-primary hover:bg-primary/90 text-primary-foreground shadow-elegant"
              size="lg"
            >
              <MessageCircle className="mr-2 h-5 w-5" />
              Make Enquiry via WhatsApp
            </Button>
                </div>

                
            </div>
             {/* Payment Details Modal */}
      <Dialog open={selectedPayment !== null} onOpenChange={() => setSelectedPayment(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {selectedPayment === "orange" && "Orange Money Payment"}
              {selectedPayment === "mtn" && "MTN Mobile Money Payment"}
              {selectedPayment === "bank" && "Bank Transfer Payment"}
            </DialogTitle>
            <DialogDescription>
              Use the details below to complete your payment
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 py-4">
            {selectedPayment === "orange" && (
              <>
                <div>
                  <p className="text-sm font-semibold mb-1">Account Name</p>
                  <p className="text-muted-foreground">Grace Lumiere</p>
                </div>
                <div>
                  <p className="text-sm font-semibold mb-1">Orange Money Number</p>
                  <p className="text-muted-foreground">+237 6XX XXX XXX</p>
                </div>
              </>
            )}

            {selectedPayment === "mtn" && (
              <>
                <div>
                  <p className="text-sm font-semibold mb-1">Account Name</p>
                  <p className="text-muted-foreground">Grace Lumiere</p>
                </div>
                <div>
                  <p className="text-sm font-semibold mb-1">MTN Mobile Money Number</p>
                  <p className="text-muted-foreground">+237 6XX XXX XXX</p>
                </div>
              </>
            )}

            {selectedPayment === "bank" && (
              <>
                <div>
                  <p className="text-sm font-semibold mb-1">Bank Name</p>
                  <p className="text-muted-foreground">Afriland First Bank</p>
                </div>
                <div>
                  <p className="text-sm font-semibold mb-1">Account Name</p>
                  <p className="text-muted-foreground">Grace Lumiere</p>
                </div>
                <div>
                  <p className="text-sm font-semibold mb-1">Account Number</p>
                  <p className="text-muted-foreground">XXXXXXXXXX</p>
                </div>
              </>
            )}

            <div className="bg-muted p-4 rounded-lg mt-4">
              <p className="text-sm text-muted-foreground">
                After making payment, please contact us via WhatsApp with your payment reference for confirmation.
              </p>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Size Chart Modal */}
      <Dialog open={showSizeChart} onOpenChange={setShowSizeChart}>
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle>Size Guide</DialogTitle>
            <DialogDescription>
              Use this chart to find your perfect fit
            </DialogDescription>
          </DialogHeader>
          <div className="overflow-x-auto py-4">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left py-3 px-4 font-semibold">Size</th>
                  <th className="text-left py-3 px-4 font-semibold">Bust (cm)</th>
                  <th className="text-left py-3 px-4 font-semibold">Waist (cm)</th>
                  <th className="text-left py-3 px-4 font-semibold">Hips (cm)</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-border">
                  <td className="py-3 px-4">XS</td>
                  <td className="py-3 px-4">80-84</td>
                  <td className="py-3 px-4">60-64</td>
                  <td className="py-3 px-4">86-90</td>
                </tr>
                <tr className="border-b border-border">
                  <td className="py-3 px-4">S</td>
                  <td className="py-3 px-4">84-88</td>
                  <td className="py-3 px-4">64-68</td>
                  <td className="py-3 px-4">90-94</td>
                </tr>
                <tr className="border-b border-border">
                  <td className="py-3 px-4">M</td>
                  <td className="py-3 px-4">88-92</td>
                  <td className="py-3 px-4">68-72</td>
                  <td className="py-3 px-4">94-98</td>
                </tr>
                <tr className="border-b border-border">
                  <td className="py-3 px-4">L</td>
                  <td className="py-3 px-4">92-96</td>
                  <td className="py-3 px-4">72-76</td>
                  <td className="py-3 px-4">98-102</td>
                </tr>
                <tr>
                  <td className="py-3 px-4">XL</td>
                  <td className="py-3 px-4">96-100</td>
                  <td className="py-3 px-4">76-80</td>
                  <td className="py-3 px-4">102-106</td>
                </tr>
              </tbody>
            </table>
            <p className="text-sm text-muted-foreground mt-6 text-center">
              Contact us via WhatsApp for assistance with sizing
            </p>
          </div>
        </DialogContent>
      </Dialog>
        </div>

        
    )
};


