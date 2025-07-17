import { Search, Mail, Phone, ShoppingCart, ArrowRight, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";


// this is the feature list - TO EDIT

const features = [
  {
    icon: Search,
    title: "Intelligent Search",
    description: "AI agents scour the web to find prospects, leads, and opportunities that match your exact criteria.",
    stats: "10x faster than manual research",
    color: "from-blue-500 to-cyan-500"
  },
  {
    icon: Mail,
    title: "Email Automation",
    description: "Personalized email campaigns at scale with AI-generated content and optimal timing.",
    stats: "95% delivery rates",
    color: "from-purple-500 to-pink-500"
  },
  {
    icon: Phone,
    title: "Voice Outreach",
    description: "AI-powered phone calls that sound natural and convert prospects into qualified leads.",
    stats: "3x higher conversion",
    color: "from-green-500 to-emerald-500"
  },
  {
    icon: ShoppingCart,
    title: "Bulk Purchasing",
    description: "Automated procurement processes that negotiate prices and manage vendor relationships.",
    stats: "30% cost savings",
    color: "from-orange-500 to-red-500"
  }
];

export const FeaturesSection = () => {
  return (
    <div className="py-24 bg-background">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold font-heading text-foreground mb-6">
            Everything Your Business Needs to 
            <span className="block text-primary">
              Scale Automatically
            </span>
          </h2>
          
          <p className="text-xl text-muted-foreground leading-relaxed font-body">
            Our AI agents handle the repetitive tasks that consume your team's time, 
            letting you focus on strategy and growth.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 gap-8 mb-16">
          {features.map((feature, index) => {
            const IconComponent = feature.icon;
            return (
              <div
                key={feature.title}
                className="group relative bg-gradient-card border border-border rounded-2xl p-8 shadow-card hover:shadow-glow transition-all duration-300 animate-fade-in-up"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                {/* Icon */}
                <div className={`inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-r ${feature.color} mb-6`}>
                  <IconComponent className="h-8 w-8 text-white" />
                </div>
                
                {/* Content */}
                <h3 className="text-2xl font-bold font-heading text-foreground mb-4">
                  {feature.title}
                </h3>
                
                <p className="text-muted-foreground mb-6 leading-relaxed font-body">
                  {feature.description}
                </p>
                
                {/* Stats */}
                <div className="flex items-center justify-between">
                  <div className="text-primary font-semibold">
                    {feature.stats}
                  </div>
                  <ArrowRight className="h-5 w-5 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all duration-200" />
                </div>

                {/* Hover Effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-accent/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
            );
          })}
        </div>

        {/* CTA Section */}
        <div className="text-center bg-gradient-card border border-border rounded-3xl p-12">
          <h3 className="text-3xl font-bold font-heading mb-4 text-foreground">
            Work like you're a team of 100
          </h3>
          <Button size="lg" onClick={() => window.location.href = 'mailto:kshrey10@wharton.upenn.edu'}>
            Contact Us
            <ArrowRight className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </div>
  );
};