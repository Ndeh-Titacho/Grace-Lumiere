import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/Components/ui/card";
import { Check,Download } from "lucide-react";
import { Button } from "@/Components/ui/button";
import { useCollection } from "@/hooks/useCollection";
import { toast } from "sonner";


export const Packages = () => {

  const { packages } = useCollection(); 


  //    const packages = [
  //   {
  //     id: 1,
  //     name: "Bridal Essentials",
  //     price: "750,000 FCFA",
  //     description: "Perfect for the minimalist bride",
  //     features: [
  //       "Wedding gown of your choice",
  //       "Bridal veil",
  //       "Basic alterations (2 fittings)",
  //       "Complimentary pressing",
  //       "Basic consultation (30 minutes)",
  //     ],
  //     pdfUrl: "/packages/bridal-essentials.pdf",
  //   },
  //   {
  //     id: 2,
  //     name: "Bridal Luxury",
  //     price: "1,250,000 FCFA",
  //     description: "Complete bridal experience",
  //     features: [
  //       "Wedding gown of your choice",
  //       "Bridal veil and accessories",
  //       "Premium alterations (4 fittings)",
  //       "Complimentary pressing and packaging",
  //       "Extended consultation (1 hour)",
  //       "Bridesmaid dress coordination (up to 3 dresses)",
  //       "Post-wedding dress cleaning",
  //     ],
  //     pdfUrl: "/packages/bridal-luxury.pdf",
  //     popular: true,
  //   },
  //   {
  //     id: 3,
  //     name: "Boutique Collection",
  //     price: "350,000 FCFA",
  //     description: "Elegant ready-to-wear package",
  //     features: [
  //       "3 ready-to-wear dresses",
  //       "Basic alterations (1 fitting per dress)",
  //       "Styling consultation (30 minutes)",
  //       "Complimentary pressing",
  //       "Seasonal discount voucher (10%)",
  //     ],
  //     pdfUrl: "/packages/boutique-collection.pdf",
  //   },
  //   {
  //     id: 4,
  //     name: "VIP Wardrobe",
  //     price: "1,500,000 FCFA",
  //     description: "Ultimate styling experience",
  //     features: [
  //       "5 custom-selected pieces",
  //       "Personal styling session (2 hours)",
  //       "Premium alterations (unlimited fittings)",
  //       "Exclusive access to new collections",
  //       "Private shopping appointments",
  //       "Seasonal wardrobe refresh consultation",
  //       "Complimentary storage for 6 months",
  //     ],
  //     pdfUrl: "/packages/vip-wardrobe.pdf",
  //   },
  // ];

  const handleDownload = (packageName: string, pdfUrl?: string) => {
    // Handle cases where the URL is missing
    if (!pdfUrl) {
      toast.info(`No PDF available for package: ${packageName}`);
      return;
    }

    toast.info(`Downloading ${packageName} package details`);

    // Create a temporary anchor element in memory
    const link = document.createElement('a');
    link.href = pdfUrl; 
    link.download = `${packageName}.pdf`;
    // Append the link to the body (not strictly required for all browsers,
    // but good practice to ensure the element exists in the DOM when clicked)
    document.body.appendChild(link);

    //  Simulate a click on the link to start the download
    link.click();

    // Clean up: remove the element from the DOM after the click
    document.body.removeChild(link);
};

  return (
    <div className="min-h-screen">

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-20 mt-20">
            <div className="text-center mb-16">
                <h1 className="text-5xl md:text-6xl font-serif font-bold mb-6">
                    Explore Our Packages
                </h1>
                <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                     Discover our carefully curated packages designed to make your special moments unforgettable. 
            From bridal essentials to complete wardrobe transformations.
                </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
                {packages.map((pkg) => (
                <Card
                key={pkg.id}
                className={`relative overflow-hidden transition-smooth hover:shadow-elegant ${
                pkg.is_popular ? "border-primary border-2" : ""
              }`}
                >
                     {pkg.is_popular && (
                <div className="absolute top-4 right-4 bg-primary text-primary-foreground px-4 py-1 rounded-full text-sm font-semibold">
                  Most Popular
                </div>
              )}

              <CardHeader>
                <CardTitle className="text-3xl font-serif">{pkg.name}</CardTitle>
                <CardDescription className="text-base">{pkg.description}</CardDescription>
                <div className="pt-4">
                    <p className="text-4xl font-bold text-primary">{pkg.price}</p>
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-3">
                    {pkg.features.map((feature, index) => (
                        <div key={index} className="flex items-start gap-3">
                            <Check className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                            <p className="text-muted-foreground">{feature}</p>
                        </div>
                    ))}
                </div>
                <Button
                onClick={() => handleDownload(pkg.name, pkg.pdf_url)}
                className="w-full"
                variant={pkg.is_popular ? "default" : "outline"}
                >
                <Download className="mr-2 h-4 w-4" />
                Download Package Details (PDF)
                </Button>
              </CardContent>

                </Card>
                ))}
            </div>

             <div className="mt-16 text-center bg-muted rounded-lg p-8 max-w-4xl mx-auto">
          <h3 className="text-2xl font-serif font-semibold mb-4">
            Need a Custom Package?
          </h3>
          <p className="text-muted-foreground mb-6">
            We can create a personalized package tailored to your specific needs and budget. 
            Contact us for a consultation.
          </p>
          <Button size="lg">
            Book a Consultation
          </Button>
        </div>
        </div>
    </div>
  )
}
