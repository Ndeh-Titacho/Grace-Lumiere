import { useState } from "react";
import { Card,CardContent,CardDescription,CardHeader,CardTitle } from "@/Components/ui/card";
import { Calendar, Clock, DollarSign, MessageCircle } from "lucide-react";
import { Label } from "@/Components/ui/label";
import { Input } from "@/Components/ui/input";
import { Button } from "@/Components/ui/button";
import { Textarea } from "@/Components/ui/textarea";
import { toast } from "sonner";
import { Dialog,DialogContent,DialogDescription,DialogHeader, DialogTitle} from "@/Components/ui/dialog";


export const Consultation = () => {

  const [selectedPayment, setSelectedPayment] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    eventDate: "",
    serviceType: "",
    notes: "",
  });

  const consultationFee = "25,000 FCFA";
  const graceWhatsApp = "+237679069107"; // Grace Lumiere's WhatsApp number

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate form
    if (!formData.name || !formData.email || !formData.phone || !formData.eventDate || !formData.serviceType) {
      toast.error("Please fill in all required fields.");
      return;
    }

    // Send details to WhatsApp
    const message = encodeURIComponent(
      `Hello Grace Lumiere,\n\nNew Consultation Request:\n\nName: ${formData.name}\nEmail: ${formData.email}\nPhone: ${formData.phone}\nEvent Date: ${formData.eventDate}\nService Type: ${formData.serviceType}\nNotes: ${formData.notes || "None"}\n\nConsultation Fee: ${consultationFee}`
    );
    window.open(`https://wa.me/${graceWhatsApp}?text=${message}`, "_blank");

    toast.success("Your details have been sent via WhatsApp. Please proceed with payment to confirm your booking.");
  };

  const paymentMethods = [
    {
      id: "mtn",
      name: "MTN Mobile Money",
      details: {
        accountName: "Elegance Bridal",
        number: "+237 679 069 107",
      },
    },
    {
      id: "orange",
      name: "Orange Money",
      details: {
        accountName: "Elegance Bridal",
        number: "+237 679 069 107",
      },
    },
    {
      id: "bank",
      name: "Bank Transfer",
      details: {
        bankName: "Afriland First Bank",
        accountName: "Elegance Bridal SARL",
        accountNumber: "10002 12345 67890 12",
      },
    },
  ];

  return (
    <div className="min-h-screen">
      
      <main className="pt-32 pb-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-serif font-bold mb-4">
              Book A Consultation
            </h1>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Schedule a personalized appointment with our expert stylists to find your perfect look.
            </p>
          </div>

          {/* Consultation Fee Card */}
          <Card className="mb-8 border-primary/20 bg-linear-to-br from-champagne/10 to-blush/10">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-2xl">
                <DollarSign className="h-6 w-6 text-primary" />
                Consultation Fee
              </CardTitle>
              <CardDescription>
                A one-time fee to secure your personalized styling session
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-primary mb-4">
                {consultationFee}
              </div>
              <p className="text-muted-foreground mb-4">
                This fee covers your one-on-one consultation with our expert stylists and includes:
              </p>
              <ul className="space-y-2 text-muted-foreground">
                <li className="flex items-start gap-2">
                  <Calendar className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                  <span>60-minute personalized styling session</span>
                </li>
                <li className="flex items-start gap-2">
                  <Clock className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                  <span>Expert advice on design, fabrics, and styles</span>
                </li>
                <li className="flex items-start gap-2">
                  <DollarSign className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                  <span>Detailed quote and timeline for your project</span>
                </li>
              </ul>
            </CardContent>
          </Card>

          {/* Form and Payment Methods Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Consultation Form */}
            <Card className="lg:col-span-2">
              <CardHeader>
                <CardTitle>Consultation Details</CardTitle>
                <CardDescription>
                  Fill in your information to schedule your appointment
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="space-y-6">
                    <div className="space-y-2">
                      <Label htmlFor="name">Full Name *</Label>
                      <Input
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        placeholder="Enter your full name"
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="email">Email Address *</Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        placeholder="your.email@example.com"
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone Number *</Label>
                      <Input
                        id="phone"
                        name="phone"
                        type="tel"
                        value={formData.phone}
                        onChange={handleInputChange}
                        placeholder="+237 6XX XXX XXX"
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="eventDate">Event Date *</Label>
                      <Input
                        id="eventDate"
                        name="eventDate"
                        type="date"
                        value={formData.eventDate}
                        onChange={handleInputChange}
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="serviceType">Service Type *</Label>
                      <select
                        id="serviceType"
                        name="serviceType"
                        value={formData.serviceType}
                        onChange={handleInputChange}
                        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                        required
                      >
                        <option value="">Select a service</option>
                        <option value="wedding-gown">Wedding Gown</option>
                        <option value="bridal-package">Complete Bridal Package</option>
                        <option value="traditional">Traditional Outfit</option>
                        <option value="evening-reception">Evening/Reception Dress</option>
                        <option value="custom">Custom Design</option>
                        <option value="other">Other</option>
                      </select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="notes">Additional Notes</Label>
                      <Textarea
                        id="notes"
                        name="notes"
                        value={formData.notes}
                        onChange={handleInputChange}
                        placeholder="Share any specific requirements, design ideas, or questions..."
                        rows={4}
                      />
                    </div>
                  </div>

                  <Button type="submit" className="w-full">
                    Submit Consultation Request
                  </Button>
                </form>
              </CardContent>
            </Card>

            {/* Payment Methods */}
            <Card className="lg:col-span-1 h-fit lg:sticky lg:top-24">
              <CardHeader>
                <CardTitle>Payment Methods</CardTitle>
                <CardDescription>
                  Select to view details
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {paymentMethods.map((method) => (
                    <Button
                      key={method.id}
                      variant="outline"
                      className="w-full justify-start hover:border-primary hover:bg-primary/5"
                      onClick={() => setSelectedPayment(method.id)}
                    >
                      {method.name}
                    </Button>
                  ))}
                  
                  <div className="pt-4 mt-4 border-t space-y-2">
                    <p className="text-sm font-medium">Total Amount</p>
                    <p className="text-2xl font-bold text-primary">{consultationFee}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>

      {/* Payment Details Dialog */}
      <Dialog open={selectedPayment !== null} onOpenChange={() => setSelectedPayment(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {paymentMethods.find((m) => m.id === selectedPayment)?.name}
            </DialogTitle>
            <DialogDescription>
              Please use the following details to complete your payment
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            {selectedPayment === "bank" ? (
              <>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Bank Name</p>
                  <p className="text-lg font-semibold">
                    {paymentMethods.find((m) => m.id === selectedPayment)?.details.bankName}
                  </p>
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Account Name</p>
                  <p className="text-lg font-semibold">
                    {paymentMethods.find((m) => m.id === selectedPayment)?.details.accountName}
                  </p>
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Account Number</p>
                  <p className="text-lg font-semibold">
                    {paymentMethods.find((m) => m.id === selectedPayment)?.details.accountNumber}
                  </p>
                </div>
              </>
            ) : (
              <>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Account Name</p>
                  <p className="text-lg font-semibold">
                    {paymentMethods.find((m) => m.id === selectedPayment)?.details.accountName}
                  </p>
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Phone Number</p>
                  <p className="text-lg font-semibold">
                    {paymentMethods.find((m) => m.id === selectedPayment)?.details.number}
                  </p>
                </div>
              </>
            )}
            <div className="pt-4 border-t">
              <p className="text-sm font-medium text-muted-foreground">Amount</p>
              <p className="text-2xl font-bold text-primary">{consultationFee}</p>
            </div>
            <p className="text-sm text-muted-foreground">
              After completing your payment, send your transaction receipt via WhatsApp to confirm your booking.
            </p>
            <Button
              className="w-full gap-2"
              onClick={() => {
                const message = encodeURIComponent(
                  `Hello Grace Lumiere,\n\nI have completed payment for a consultation booking.\n\nDetails:\nName: ${formData.name}\nEmail: ${formData.email}\nPhone: ${formData.phone}\nEvent Date: ${formData.eventDate}\nService Type: ${formData.serviceType}\nAmount: ${consultationFee}\nPayment Method: ${paymentMethods.find((m) => m.id === selectedPayment)?.name}\n\nI will send my transaction receipt now.`
                );
                window.open(`https://wa.me/${graceWhatsApp}?text=${message}`, "_blank");
              }}
            >
              <MessageCircle className="h-4 w-4" />
              Send Receipt via WhatsApp
            </Button>
          </div>
        </DialogContent>
      </Dialog>

    </div>
  );
}
