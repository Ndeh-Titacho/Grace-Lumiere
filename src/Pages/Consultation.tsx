import { useEffect, useState } from "react";
import { Card,CardContent,CardDescription,CardHeader,CardTitle } from "@/Components/ui/card";
import {Calendar as CalendarIcon, Clock, DollarSign, MessageCircle,Info } from "lucide-react";
import {Label } from "@/Components/ui/label";
import { Input } from "@/Components/ui/input";
import { Button } from "@/Components/ui/button";
import { Textarea } from "@/Components/ui/textarea";
import { toast } from "sonner";
import { Dialog,DialogContent,DialogDescription,DialogHeader, DialogTitle} from "@/Components/ui/dialog";
import { Footer } from "@/Components/Layout/Footer";
import { NavBar } from "@/Components/Layout/NavBar";
import { Separator } from "@/Components/ui/separator";
import { Calendar } from "@/Components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/Components/ui/popover";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/Components/ui/select";
import { format, isWednesday, isSaturday } from "date-fns";
import { cn } from "@/lib/utils";
import {useForm, ValidationError } from '@formspree/react'


export const Consultation = () => {

  const [selectedPayment, setSelectedPayment] = useState<string | null>(null);

   const serviceOptions = [
    { value: "Bridal Gown", label: "Bridal Gown (Main Wedding Dress)", desc: "Your ceremony gown" },
    { value: "Civil / Registry Look", label: "Civil / Registry Look", desc: "Elegant, modern piece for your civil wedding" },
    { value: "Traditional / Cultural Attire", label: "Traditional / Cultural Attire", desc: "Custom design honoring your heritage" },
    { value: "Reception / Second Look", label: "Reception / Second Look", desc: "Statement piece for your celebration" },
    { value: "Others", label: "Others (Special Occasion Wear)", desc: "Birthday pieces, statement gowns for celebration" },
  ];

  const budgetBridalOptions = [
    { value: "Lumière Classic", label: "Lumière Classic — 400,000 – 900,000 XAF (~ $650 – $1,500)" },
    { value: "Lumière Luxe", label: "Lumière Luxe — 900,000 – 1,800,000 XAF (~ $1,500 – $3,000)" },
    { value: "Lumière Prestige", label: "Lumière Prestige — 1,800,000 – 2,800,000 XAF (~ $3,000 – $4,700)" },
    { value: "Lumière Privé", label: "Lumière Privé 👑 — 3,000,000 XAF and above (~ $5,000++)" },
  ];

  const budgetCivilOptions = [
    { value: "Lumière Essence", label: "Lumière Essence — 100,000 – 200,000 XAF (~ $170 – $330)" },
    { value: "Lumière Registry", label: "Lumière Registry — 200,000 – 400,000 XAF (~ $330 – $700)" },
    { value: "Lumière Vow", label: "Lumière Vow — 400,000+ XAF (~ $700+)" },
  ];

  const budgetTradOptions = [
    { value: "Lumière Heritage", label: "Lumière Heritage — 250,000 – 400,000 XAF" },
    { value: "Lumière Royale", label: "Lumière Royale — 400,000 – 800,000 XAF" },
    { value: "Lumière Legacy", label: "Lumière Legacy — 800,000 – 1,200,000 XAF" },
    { value: "Lumière Dynasty", label: "Lumière Dynasty — 1,200,000 – 2,000,000 XAF" },
    { value: "Lumière Palace", label: "Lumière Palace — 2.5M XAF++" },
  ];

  const budgetSpecialOptions = [
    { value: "Lumière Élégance", label: "Lumière Élégance — 100,000 – 200,000 XAF (refined simplicity)" },
    { value: "Lumière Allure", label: "Lumière Allure — 200,000 – 500,000 XAF (elevated sophistication)" },
    { value: "Lumière Opulence", label: "Lumière Opulence — 500,000 – 1,000,000 XAF (luxurious glamour)" },
    { value: "Lumière Grandeur", label: "Lumière Grandeur — 1,000,000 – 2,000,000 XAF (bold couture energy)" },
    { value: "Lumière Majesté", label: "Lumière Majesté — 2.5M XAF++ (grand entrances, elite celebrations)" },
  ];

  
      const [state, formspreeSubmit, reset] = useForm("xdapylrn");
  
      useEffect(() => {
      if (state.succeeded) {
          toast.success("Your enquiry has been sent successfully! We'll get back to you soon.");
      }
      if (state.errors && Object.keys(state.errors).length > 0) {
          toast.error("There was an error sending your enquiry. Please try again later.");
      }
  }, [state.succeeded, state.errors]);
  
  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
    email: "",
    location: "",
    weddingDate: "",
    weddingLocation: "",
    consultationType: "",
    consultationDate: "",
    consultationTime: "",
    services: [] as string[],
    bridalExperience: false,
    budget: "",
    dreamDress: "",
    silhouette: "",
    additionalNotes: "",
    budgetBridal: "",
    budgetCivil: "",
    budgetTrad: "",
    budgetSpecial: "",
    fittingsAvailability: "",
    timeline: "",
  });

  const graceWhatsApp = "+237679069107";

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleCheckboxChange = (name: string, value: string) => {
    setFormData((prev) => {
      const services = prev.services.includes(value)
        ? prev.services.filter((s) => s !== value)
        : [...prev.services, value];
      return { ...prev, services };
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!formData.fullName || !formData.phone || !formData.email || !formData.consultationType) {
      toast.error("Please fill in all required fields.");
      return;
    }

    const consultationFee = formData.consultationType === "virtual" ? "25,000 XAF" : "35,000 XAF";

    // Format the message for WhatsApp
    const message = encodeURIComponent(
      `Hello Grace Lumière,\n\n` +
      `📋 NEW CONSULTATION BOOKING\n\n` +
      `--- CLIENT INFORMATION ---\n` +
      `Name: ${formData.fullName}\n` +
      `Phone: ${formData.phone}\n` +
      `Email: ${formData.email}\n` +
      `Location: ${formData.location || "N/A"}\n\n` +
      `--- WEDDING DETAILS ---\n` +
      `Wedding Date: ${formData.weddingDate || "N/A"}\n` +
      `Wedding Location: ${formData.weddingLocation || "N/A"}\n\n` +
      `--- CONSULTATION ---\n` +
      `Type: ${formData.consultationType === "virtual" ? "Virtual (Online)" : "Physical (In-Studio)"}\n` +
      `Fee: ${consultationFee}\n` +
      `Preferred Date: ${formData.consultationDate ? formData.consultationDate.split("T")[0] : "N/A"}\n` +
      `Preferred Time: ${formData.consultationTime || "N/A"}\n\n` +
      `--- SERVICE SELECTION ---\n` +
      `Services: ${formData.services.length > 0 ? formData.services.join(", ") : "N/A"}\n` +
      `Bridal Experience (Full Package): ${formData.bridalExperience ? "Yes" : "No"}\n\n` +
      `--- BUDGET EXPECTATIONS ---\n` +
      `Bridal Gowns: ${formData.budgetBridal || "N/A"}\n` +
      `Civil Gowns: ${formData.budgetCivil || "N/A"}\n` +
      `Traditional Gowns: ${formData.budgetTrad || "N/A"}\n` +
      `Special Occasion Wear: ${formData.budgetSpecial || "N/A"}\n\n` +
      `--- STYLE & VISION ---\n` +
      `Dream Dress: ${formData.dreamDress || "N/A"}\n` +
      `Preferred Silhouette: ${formData.silhouette || "N/A"}\n\n` +
      `--- ADDITIONAL NOTES ---\n` +
      `${formData.additionalNotes || "None"}`
    );

    // Create a hidden form for Formspree submission
    const form = document.createElement("form");
    form.method = "POST";
    form.action = "https://formspree.io/f/xdapylrn";
    form.style.display = "none";

    const fields = {
      fullName: formData.fullName,
      phone: formData.phone,
      email: formData.email,
      location: formData.location,
      weddingDate: formData.weddingDate,
      weddingLocation: formData.weddingLocation,
      consultationType: formData.consultationType,
     consultationDate: formData.consultationDate.split("T")[0],
      consultationTime: formData.consultationTime,
      services: formData.services.join(", "),
      bridalExperience: formData.bridalExperience ? "Yes" : "No",
      // budget: formData.budget,
      dreamDress: formData.dreamDress,
      silhouette: formData.silhouette,
      additionalNotes: formData.additionalNotes,
      budgetBridal: formData.budgetBridal,
      budgetCivil: formData.budgetCivil,
      budgetTrad: formData.budgetTrad,
      budgetSpecial: formData.budgetSpecial,
      fittingsAvailability: formData.fittingsAvailability,
      timeline: formData.timeline,
    };

    Object.entries(fields).forEach(([key, value]) => {
      const input = document.createElement("input");
      input.type = "hidden";
      input.name = key;
      input.value = String(value);
      form.appendChild(input);
    });

    document.body.appendChild(form);
    form.submit();
    document.body.removeChild(form);

    // Send WhatsApp message
    window.open(`https://wa.me/${graceWhatsApp}?text=${message}`, "_blank");

    toast.info("Your details have been sent via WhatsApp. Please proceed with payment to confirm your booking.",
    );
  };

  const paymentMethods = [
    {
      id: "mtn",
      name: "MTN Mobile Money",
      details: { accountName: "LUCIENNE FONDOH ENGOH", number: "+237 679 069 107" },
    },
    {
      id: "orange",
      name: "Orange Money",
      details: { accountName: "LUCIENNE FONDOH ENGOH", number: "+237 6XX XXX XXX" },
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


 

  const consultationFeeDisplay = formData.consultationType === "physical" ? "35,000 XAF" : "25,000 XAF";

  return (
    <div className="min-h-screen">
      <NavBar />

      <main className="pt-32 pb-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-serif font-bold mb-4">
              Bridal Consultation Booking
            </h1>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Let's bring your dream gown to life.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Form */}
            <Card className="lg:col-span-2">
              <CardContent className="pt-6">
                <form onSubmit={handleSubmit} className="space-y-8">

                  {/* Section 1: Client Information */}
                  <div>
                    <h2 className="text-xl font-serif font-semibold mb-4 text-primary">Client Information</h2>
                    <Separator className="mb-6" />
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="fullName">Full Name *</Label>
                        <Input id="fullName" name="fullName" value={formData.fullName} onChange={handleInputChange} placeholder="Enter your full name" required />
                        <ValidationError prefix="Full Name" field="fullName" errors={state.errors} className="text-sm text-red-500 mt-1" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="phone">Phone Number *</Label>
                        <Input id="phone" name="phone" type="tel" value={formData.phone} onChange={handleInputChange} placeholder="+237 6XX XXX XXX" required />
                        <ValidationError prefix="Phone Number" field="phone" errors={state.errors} className="text-sm text-red-500 mt-1" />     
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="email">Email Address *</Label>
                        <Input id="email" name="email" type="email" value={formData.email} onChange={handleInputChange} placeholder="your.email@example.com" required />
                        <ValidationError prefix="Email Address" field="email" errors={state.errors} className="text-sm text-red-500 mt-1" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="location">Location (City/Country)</Label>
                        <Input id="location" name="location" value={formData.location} onChange={handleInputChange} placeholder="e.g. Douala, Cameroon" />
                        <ValidationError prefix="Location" field="location" errors={state.errors} className="text-sm text-red-500 mt-1" />
                      </div>
                    </div>
                  </div>

                  {/* Section 2: Wedding Details */}
                  <div>
                    <h2 className="text-xl font-serif font-semibold mb-4 text-primary">Wedding Details</h2>
                    <Separator className="mb-6" />
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="weddingDate">Wedding Date</Label>
                        <Input id="weddingDate" name="weddingDate" type="date" value={formData.weddingDate} onChange={handleInputChange} />
                        <ValidationError prefix="Wedding Date" field="weddingDate" errors={state.errors} className="text-sm text-red-500 mt-1" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="weddingLocation">Wedding Location</Label>
                        <Input id="weddingLocation" name="weddingLocation" value={formData.weddingLocation} onChange={handleInputChange} placeholder="Enter wedding venue / city" />
                        <ValidationError prefix="Wedding Location" field="weddingLocation" errors={state.errors} className="text-sm text-red-500 mt-1" />
                      </div>
                    </div>
                  </div>

                  {/* Section 3: Consultation Type */}
                  <div>
                    <h2 className="text-xl font-serif font-semibold mb-4 text-primary">Consultation Type</h2>
                    <Separator className="mb-6" />
                    <p className="text-sm text-muted-foreground mb-4">Kindly select your preferred consultation experience: *</p>
                    <div className="space-y-3">
                      <label className={`flex items-start gap-3 p-4 rounded-lg border cursor-pointer transition-colors ${formData.consultationType === "virtual" ? "border-primary bg-primary/5" : "border-border hover:border-primary/50"}`}>
                        <input type="radio" name="consultationType" value="virtual" checked={formData.consultationType === "virtual"} onChange={handleInputChange} className="mt-1" />
                        <div>
                          <span className="font-medium">Virtual Consultation (Online)</span>
                          <span className="block text-sm text-muted-foreground">25,000 XAF / Hour</span>
                        </div>
                        <ValidationError prefix="Consultation Type" field="consultationType" errors={state.errors} className="text-sm text-red-500 mt-1" />
                      </label>
                      <label className={`flex items-start gap-3 p-4 rounded-lg border cursor-pointer transition-colors ${formData.consultationType === "physical" ? "border-primary bg-primary/5" : "border-border hover:border-primary/50"}`}>
                        <input type="radio" name="consultationType" value="physical" checked={formData.consultationType === "physical"} onChange={handleInputChange} className="mt-1" />
                        <div>
                          <span className="font-medium">Physical Consultation (In-Studio)</span>
                          <span className="block text-sm text-muted-foreground">35,000 XAF / Hour</span>
                        </div>
                        <ValidationError prefix="Consultation Type" field="consultationType" errors={state.errors} className="text-sm text-red-500 mt-1" />
                      </label>
                    </div>
                    <div className="mt-4 p-3 rounded-md bg-muted/50 text-sm text-muted-foreground flex items-start gap-2">
                      <Info className="h-4 w-4 mt-0.5 shrink-0" />
                      <span>Consultation fees are applied per dress and will be deducted from the final cost of each piece created with Grace Lumière.</span>
                    </div>
                  </div>

                  {/* Section 4: Book Your Appointment */}
                  <div>
                    <h2 className="text-xl font-serif font-semibold mb-4 text-primary">Book Your Appointment</h2>
                    <Separator className="mb-6" />
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label>Preferred Consultation Date</Label>
                        <Popover>
                          <PopoverTrigger asChild>
                            <Button
                              variant="outline"
                              className={cn(
                                "w-full justify-start text-left font-normal",
                                !formData.consultationDate && "text-muted-foreground"
                              )}
                            >
                              <CalendarIcon className="mr-2 h-4 w-4" />
                              {formData.consultationDate
                                ? format(new Date(formData.consultationDate), "PPP")
                                : "Select a date"}
                            </Button>
                          </PopoverTrigger>
                          <PopoverContent className="w-auto p-0" align="start">
                            <Calendar
                              mode="single"
                              selected={formData.consultationDate ? new Date(formData.consultationDate) : undefined}
                              onSelect={(date) =>
                                setFormData((prev) => ({
                                  ...prev,
                                  consultationDate: date ? date.toISOString() : "",
                                }))
                              }
                              disabled={(date) =>
                                date < new Date() || (!isWednesday(date) && !isSaturday(date))
                              }
                              initialFocus
                              className="p-3 pointer-events-auto"
                            />
                          </PopoverContent>
                        </Popover>
                        <p className="text-xs text-muted-foreground">Only Wednesdays and Saturdays are available</p>
                      </div>
                      <div className="space-y-2">
                        <Label>Preferred Time</Label>
                        <Select
                          value={formData.consultationTime}
                          onValueChange={(value:any) =>
                            setFormData((prev) => ({ ...prev, consultationTime: value }))
                          }
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select a time slot" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="9:00 AM">9:00 AM</SelectItem>
                            <SelectItem value="11:00 AM">11:00 AM</SelectItem>
                            <SelectItem value="1:00 PM">1:00 PM</SelectItem>
                            <SelectItem value="3:00 PM">3:00 PM</SelectItem>
                            <SelectItem value="5:00 PM">5:00 PM</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </div>

                  {/* Section 5: Service Selection */}
                  <div>
                    <h2 className="text-xl font-serif font-semibold mb-4 text-primary">Service Selection</h2>
                    <Separator className="mb-6" />
                    <p className="text-sm text-muted-foreground mb-4">What would you like Grace Lumière to create for you?</p>
                    <div className="space-y-3">
                      {serviceOptions.map((option) => (
                        <label key={option.value} className={`flex items-start gap-3 p-4 rounded-lg border cursor-pointer transition-colors ${formData.services.includes(option.value) ? "border-primary bg-primary/5" : "border-border hover:border-primary/50"}`}>
                          <input
                            type="checkbox"
                            name="services"
                            value={option.value}
                            checked={formData.services.includes(option.value)}
                            onChange={() => handleCheckboxChange("services", option.value)}
                            className="mt-1"
                          />
                          <ValidationError prefix="Services" field="services" errors={state.errors} className="text-sm text-red-500 mt-1" />
                          <div>
                            <span className="font-medium">{option.label}</span>
                            <span className="block text-sm text-muted-foreground">{option.desc}</span>
                          </div>
                        </label>
                      ))}
                    </div>

                    {/* Bridal Experience */}
                    <div className="mt-6">
                      <label className={`flex items-start gap-3 p-4 rounded-lg border-2 cursor-pointer transition-colors ${formData.bridalExperience ? "border-primary bg-primary/5" : "border-dashed border-primary/30 hover:border-primary/50"}`}>
                        <input
                          type="checkbox"
                          name="bridalExperience"
                          checked={formData.bridalExperience}
                          onChange={() => setFormData((prev) => ({ ...prev, bridalExperience: !prev.bridalExperience }))}
                          className="mt-1"
                        />
                        <ValidationError prefix="Bridal Experience" field="bridalExperience" errors={state.errors} className="text-sm text-red-500 mt-1" />
                        <div>
                          <span className="font-medium">Bridal Experience (Full Package) 👑</span>
                          <span className="block text-sm text-muted-foreground">A complete couture experience including multiple looks for your wedding journey</span>
                        </div>
                      </label>
                    </div>
                  </div>
                  
{/* Section 6: Budget Expectations */}
                  <div>
                    <h2 className="text-xl font-serif font-semibold mb-4 text-primary">Budget Expectations</h2>
                    <Separator className="mb-6" />
                    <p className="text-sm text-muted-foreground mb-6">Kindly select your preferred budget range for each piece you're interested in.</p>
                    <div className="space-y-5">
                      <div className="space-y-2">
                        <Label>Bridal Gowns</Label>
                        <Select value={formData.budgetBridal} onValueChange={(v) => setFormData((p) => ({ ...p, budgetBridal: v }))}>
                          <SelectTrigger><SelectValue placeholder="Select bridal budget range" /></SelectTrigger>
                          <SelectContent>
                            {budgetBridalOptions.map((o) => (
                              <SelectItem key={o.value} value={o.value}>{o.label}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label>Civil Gowns</Label>
                        <Select value={formData.budgetCivil} onValueChange={(v) => setFormData((p) => ({ ...p, budgetCivil: v }))}>
                          <SelectTrigger><SelectValue placeholder="Select civil budget range" /></SelectTrigger>
                          <SelectContent>
                            {budgetCivilOptions.map((o) => (
                              <SelectItem key={o.value} value={o.value}>{o.label}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label>Traditional Gowns</Label>
                        <Select value={formData.budgetTrad} onValueChange={(v) => setFormData((p) => ({ ...p, budgetTrad: v }))}>
                          <SelectTrigger><SelectValue placeholder="Select traditional budget range" /></SelectTrigger>
                          <SelectContent>
                            {budgetTradOptions.map((o) => (
                              <SelectItem key={o.value} value={o.value}>{o.label}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label>Special Occasion Wear (birthdays / wedding guests)</Label>
                        <Select value={formData.budgetSpecial} onValueChange={(v) => setFormData((p) => ({ ...p, budgetSpecial: v }))}>
                          <SelectTrigger><SelectValue placeholder="Select special occasion budget range" /></SelectTrigger>
                          <SelectContent>
                            {budgetSpecialOptions.map((o) => (
                              <SelectItem key={o.value} value={o.value}>{o.label}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </div>

                  {/* Availability & Timeline */}
                  <div>
                    <h2 className="text-xl font-serif font-semibold mb-4 text-primary">Availability & Timeline</h2>
                    <Separator className="mb-6" />
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="fittingsAvailability">Will you be available for fittings at the Grace Lumière studio in Bamenda?</Label>
                        <Input id="fittingsAvailability" name="fittingsAvailability" value={formData.fittingsAvailability} onChange={handleInputChange} placeholder="e.g. Yes, available on weekends" />
                      </div>
                      <div className="space-y-2">
                        <Label>How long do we have to create your outfit?</Label>
                        <Select value={formData.timeline} onValueChange={(v) => setFormData((p) => ({ ...p, timeline: v }))}>
                          <SelectTrigger><SelectValue placeholder="Select a timeframe" /></SelectTrigger>
                          <SelectContent>
                            <SelectItem value="1-3 months">1 – 3 months</SelectItem>
                            <SelectItem value="3-6 months">3 – 6 months</SelectItem>
                            <SelectItem value="6-12 months">6 – 12 months</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </div>


                  {/* Section 7: Style & Vision */}
                  <div>
                    <h2 className="text-xl font-serif font-semibold mb-4 text-primary">Style & Vision</h2>
                    <Separator className="mb-6" />
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="dreamDress">Describe your dream dress</Label>
                        <Textarea id="dreamDress" name="dreamDress" value={formData.dreamDress} onChange={handleInputChange} placeholder="Tell us about your dream dress..." rows={3} />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="silhouette">Preferred silhouette</Label>
                        <Input id="silhouette" name="silhouette" value={formData.silhouette} onChange={handleInputChange} placeholder="e.g. A-line, Mermaid, Ball Gown, Sheath..." />
                      </div>
                    </div>
                  </div>

                  {/* Section 8: Additional Notes */}
                  <div>
                    <h2 className="text-xl font-serif font-semibold mb-4 text-primary">Additional Notes</h2>
                    <Separator className="mb-6" />
                    <div className="space-y-2">
                      <Label htmlFor="additionalNotes">Anything else you'd love us to know about your vision?</Label>
                      <Textarea id="additionalNotes" name="additionalNotes" value={formData.additionalNotes} onChange={handleInputChange} placeholder="Share any specific requirements, inspirations, or questions..." rows={4} />
                    </div>
                  </div>

                  {/* Important Notice */}
                  <div className="p-4 rounded-lg border border-primary/20 bg-primary/5">
                    <h3 className="font-semibold mb-2 flex items-center gap-2">
                      <Info className="h-4 w-4 text-primary" />
                      Important Notice
                    </h3>
                    <ul className="text-sm text-muted-foreground space-y-1 list-disc list-inside">
                      <li>Consultation bookings are only confirmed after payment.</li>
                      <li>Rescheduling must be done at least 24 hours in advance.</li>
                      <li>The consultation fee will be deducted from your total gown cost if you proceed with Grace Lumière.</li>
                    </ul>
                    <p className="text-sm text-muted-foreground mt-3 italic">
                      At Grace Lumière, every bride is a story waiting to be told. We look forward to creating yours.
                    </p>
                  </div>

                  <Button type="submit" className="w-full" size="lg">
                    Submit Consultation Request
                  </Button>
                </form>
              </CardContent>
            </Card>

            {/* Payment Methods Sidebar */}
            <div className="lg:col-span-1 space-y-6">
              <Card className="border-primary/20 bg-linear-to-br from-champagne/10 to-blush/10">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <DollarSign className="h-5 w-5 text-primary" />
                    Consultation Fee
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-primary mb-2">{consultationFeeDisplay} / Hour</div>
                  <p className="text-sm text-muted-foreground">
                    {formData.consultationType
                      ? formData.consultationType === "virtual" ? "Virtual (Online)" : "Physical (In-Studio)"
                      : "Select consultation type to see fee"}
                  </p>
                </CardContent>
              </Card>

              <Card className="h-fit lg:sticky lg:top-24">
                <CardHeader>
                  <CardTitle>Payment Methods</CardTitle>
                  <CardDescription>Select to view details</CardDescription>
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
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>

      {/* Payment Details Dialog */}
      <Dialog open={selectedPayment !== null} onOpenChange={() => setSelectedPayment(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{paymentMethods.find((m) => m.id === selectedPayment)?.name}</DialogTitle>
            <DialogDescription>Please use the following details to complete your payment</DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            {selectedPayment === "bank" ? (
              <>
                <div><p className="text-sm font-medium text-muted-foreground">Bank Name</p><p className="text-lg font-semibold">{paymentMethods.find((m) => m.id === selectedPayment)?.details.bankName}</p></div>
                <div><p className="text-sm font-medium text-muted-foreground">Account Name</p><p className="text-lg font-semibold">{paymentMethods.find((m) => m.id === selectedPayment)?.details.accountName}</p></div>
                <div><p className="text-sm font-medium text-muted-foreground">Account Number</p><p className="text-lg font-semibold">{paymentMethods.find((m) => m.id === selectedPayment)?.details.accountNumber}</p></div>
              </>
            ) : (
              <>
                <div><p className="text-sm font-medium text-muted-foreground">Account Name</p><p className="text-lg font-semibold">{paymentMethods.find((m) => m.id === selectedPayment)?.details.accountName}</p></div>
                <div><p className="text-sm font-medium text-muted-foreground">Phone Number</p><p className="text-lg font-semibold">{paymentMethods.find((m) => m.id === selectedPayment)?.details.number}</p></div>
              </>
            )}
            <div className="pt-4 border-t">
              <p className="text-sm font-medium text-muted-foreground">Amount</p>
              <p className="text-2xl font-bold text-primary">{consultationFeeDisplay}</p>
            </div>
            <p className="text-sm text-muted-foreground">After completing your payment, send your transaction receipt via WhatsApp to confirm your booking.</p>
            <Button
              className="w-full gap-2"
              onClick={() => {
                const message = encodeURIComponent(
                  `Hello Grace Lumière,\n\nI have completed payment for a consultation booking.\n\nName: ${formData.fullName}\nPhone: ${formData.phone}\nEmail: ${formData.email}\nAmount: ${consultationFeeDisplay}\nPayment Method: ${paymentMethods.find((m) => m.id === selectedPayment)?.name}\n\nI will send my transaction receipt now.`
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

      <Footer />
    </div>
  );
};

