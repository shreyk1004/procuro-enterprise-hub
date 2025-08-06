import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ChevronLeft, ChevronRight, Play, Users, Mail, Brain, Search } from "lucide-react";
import { Link } from "react-router-dom";

interface DemoSlide {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  content: string;
  features: string[];
}

const demoSlides: DemoSlide[] = [
  {
    id: "find-engineers",
    title: "Find Growth Engineers",
    description: "AI-powered talent discovery with contextual matching",
    icon: <Search className="w-6 h-6" />,
    content: "Discover qualified candidates like Sarah Chen (Former Senior Growth Engineer at Stripe) with 5+ years experience in B2B SaaS growth, matched to your specific needs and company stage.",
    features: [
      "Contextual matching based on company stage",
      "Experience verification and qualification",
      "Direct contact information",
      "Background analysis and recommendations"
    ]
  },
  {
    id: "share-results",
    title: "Share Results Seamlessly",
    description: "Instant sharing and collaboration with your team",
    icon: <Users className="w-6 h-6" />,
    content: "Share candidate lists directly with team members. Send 'Solid Growth Engineers' to shrey@procurolabs.com and kyle@procurolabs.com with one click.",
    features: [
      "One-click team sharing",
      "Email integration",
      "Collaborative decision making",
      "Audit trail and notifications"
    ]
  },
  {
    id: "compose-campaigns",
    title: "Compose Email Campaigns",
    description: "AI-powered outreach with personalized messaging",
    icon: <Mail className="w-6 h-6" />,
    content: "Generate personalized outreach emails for each candidate. Book calls with growth engineers using your Calendly integration with professional, tailored messaging.",
    features: [
      "Personalized email generation",
      "Calendly integration",
      "Bulk campaign management",
      "Professional templates"
    ]
  },
  {
    id: "memory-context",
    title: "Memory & Context",
    description: "Persistent knowledge and intelligent context switching",
    icon: <Brain className="w-6 h-6" />,
    content: "Procura remembers your preferences, company context, and previous interactions. Switch between different contexts like hiring, research, or procurement seamlessly.",
    features: [
      "Persistent memory across sessions",
      "Context switching capabilities",
      "Preference learning",
      "Multi-identity support"
    ]
  }
];

export const ProductDemoSection = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % demoSlides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + demoSlides.length) % demoSlides.length);
  };

  return (
    <div className="py-20 bg-background" data-section="product-demo">
      <div className="container mx-auto px-4">
        {/* Video Section */}
        <div className="max-w-4xl mx-auto mb-16">
          <div className="text-center mb-8">
            <h2
              className="text-3xl lg:text-4xl text-foreground mb-6"
              style={{ fontFamily: "Playfair Display, serif", fontWeight: 400 }}
            >
              See Procura in Action
            </h2>
          </div>
          
          <div className="relative aspect-video rounded-2xl overflow-hidden shadow-2xl">
            <iframe
              src="https://www.youtube.com/embed/_vs-LkOTlEs"
              title="Procura Demo Video"
              className="w-full h-full"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
            ></iframe>
          </div>
        </div>

        <div className="text-center max-w-4xl mx-auto mb-16">
          <h2
            className="text-3xl lg:text-4xl text-foreground mb-6"
            style={{ fontFamily: "Playfair Display, serif", fontWeight: 400 }}
          >
            Explore Key Features
          </h2>
        </div>

        {/* Desktop Version - Tabs */}
        <div className="hidden lg:block">
          <Tabs value={demoSlides[currentSlide].id} onValueChange={(value) => {
            const index = demoSlides.findIndex(slide => slide.id === value);
            setCurrentSlide(index);
          }}>
            <TabsList className="grid w-full grid-cols-4 mb-8">
              {demoSlides.map((slide) => (
                <TabsTrigger key={slide.id} value={slide.id} className="flex items-center gap-2">
                  {slide.icon}
                  <span className="hidden xl:inline">{slide.title}</span>
                </TabsTrigger>
              ))}
            </TabsList>
            
            {demoSlides.map((slide) => (
              <TabsContent key={slide.id} value={slide.id} className="mt-0">
                <Card className="border-0 shadow-lg">
                  <CardContent className="p-8">
                    <div className="grid lg:grid-cols-2 gap-8 items-center">
                      <div className="space-y-6">
                        <div className="flex items-center gap-3">
                          <div className="p-2 bg-primary/10 rounded-lg">
                            {slide.icon}
                          </div>
                          <div>
                            <h3 className="text-2xl font-semibold text-foreground">{slide.title}</h3>
                            <p className="text-muted-foreground">{slide.description}</p>
                          </div>
                        </div>
                        
                        <p className="text-lg text-foreground leading-relaxed">
                          {slide.content}
                        </p>
                        
                        <div className="space-y-3">
                          <h4 className="font-medium text-foreground">Key Features:</h4>
                          <ul className="space-y-2">
                            {slide.features.map((feature, index) => (
                              <li key={index} className="flex items-center gap-2 text-muted-foreground">
                                <div className="w-1.5 h-1.5 bg-primary rounded-full"></div>
                                {feature}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                      
                      <div className="relative">
                        <div className="bg-gradient-to-br from-primary/5 to-primary/10 rounded-lg p-8 border border-primary/20">
                          <div className="aspect-video bg-muted/30 rounded-lg overflow-hidden">
                            {slide.id === "find-engineers" && (
                              <img 
                                src="/search part 1.png" 
                                alt="Procura search interface showing growth engineer discovery"
                                className="w-full h-full object-cover rounded-lg"
                              />
                            )}
                            {slide.id === "share-results" && (
                              <img 
                                src={"/natural usage \"send me\".png"} 
                                alt="Procura sharing results with team members"
                                className="w-full h-full object-cover rounded-lg"
                              />
                            )}
                            {slide.id === "compose-campaigns" && (
                              <img 
                                src="/showcase email stuff.png" 
                                alt="Procura email campaign composition interface"
                                className="w-full h-full object-cover rounded-lg"
                              />
                            )}
                            {slide.id === "memory-context" && (
                              <img 
                                src="/showcasing memories.png" 
                                alt="Procura memory and context management interface"
                                className="w-full h-full object-cover rounded-lg"
                              />
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            ))}
          </Tabs>
        </div>

        {/* Mobile Version - Carousel */}
        <div className="lg:hidden">
          <div className="relative">
            <Card className="border-0 shadow-lg">
              <CardContent className="p-6">
                <div className="space-y-6">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-primary/10 rounded-lg">
                      {demoSlides[currentSlide].icon}
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-foreground">{demoSlides[currentSlide].title}</h3>
                      <p className="text-sm text-muted-foreground">{demoSlides[currentSlide].description}</p>
                    </div>
                  </div>
                  
                  <p className="text-foreground leading-relaxed">
                    {demoSlides[currentSlide].content}
                  </p>
                  
                  <div className="space-y-3">
                    <h4 className="font-medium text-foreground">Key Features:</h4>
                    <ul className="space-y-2">
                      {demoSlides[currentSlide].features.map((feature, index) => (
                        <li key={index} className="flex items-center gap-2 text-sm text-muted-foreground">
                          <div className="w-1 h-1 bg-primary rounded-full"></div>
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <div className="bg-gradient-to-br from-primary/5 to-primary/10 rounded-lg p-6 border border-primary/20">
                    <div className="aspect-video bg-muted/30 rounded-lg overflow-hidden">
                      {demoSlides[currentSlide].id === "find-engineers" && (
                        <img 
                          src="/search part 1.png" 
                          alt="Procura search interface showing growth engineer discovery"
                          className="w-full h-full object-cover rounded-lg"
                        />
                      )}
                      {demoSlides[currentSlide].id === "share-results" && (
                        <img 
                          src={"/natural usage \"send me\".png"} 
                          alt="Procura sharing results with team members"
                          className="w-full h-full object-cover rounded-lg"
                        />
                      )}
                      {demoSlides[currentSlide].id === "compose-campaigns" && (
                        <img 
                          src="/showcase email stuff.png" 
                          alt="Procura email campaign composition interface"
                          className="w-full h-full object-cover rounded-lg"
                        />
                      )}
                      {demoSlides[currentSlide].id === "memory-context" && (
                        <img 
                          src="/showcasing memories.png" 
                          alt="Procura memory and context management interface"
                          className="w-full h-full object-cover rounded-lg"
                        />
                      )}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            {/* Navigation Buttons */}
            <Button
              variant="outline"
              size="icon"
              className="absolute left-2 top-1/2 -translate-y-1/2 bg-background/80 backdrop-blur-sm"
              onClick={prevSlide}
            >
              <ChevronLeft className="w-4 h-4" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              className="absolute right-2 top-1/2 -translate-y-1/2 bg-background/80 backdrop-blur-sm"
              onClick={nextSlide}
            >
              <ChevronRight className="w-4 h-4" />
            </Button>
          </div>
          
          {/* Dots Indicator */}
          <div className="flex justify-center gap-2 mt-6">
            {demoSlides.map((_, index) => (
              <button
                key={index}
                className={`w-2 h-2 rounded-full transition-colors ${
                  index === currentSlide ? 'bg-primary' : 'bg-muted'
                }`}
                onClick={() => setCurrentSlide(index)}
              />
            ))}
          </div>
        </div>

        <div className="text-center mt-12">
          <Link to="/early-access">
            <Button className="bg-primary hover:bg-primary/90 text-primary-foreground">
              Try Procura Now
            </Button>
          </Link>
          <p className="text-sm text-muted-foreground mt-2">
            We'll have you trying Procura within 1 hour
          </p>
        </div>
      </div>
    </div>
  );
}; 