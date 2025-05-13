import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import PageLayout from "@/components/layout/PageLayout";
import Globe from "@/components/Globe";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle 
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { initializeSampleData, DOMAINS } from "@/utils/machineLearningSim";
import { useAuth } from "@/contexts/AuthContext";

const Index = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const [query, setQuery] = useState("");
  const heroRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Initialize sample data
    initializeSampleData();
    
    // Parallax effect on scroll
    const handleScroll = () => {
      if (heroRef.current) {
        const scrollY = window.scrollY;
        heroRef.current.style.transform = `translateY(${scrollY * 0.4}px)`;
      }
    };
    
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleSearch = () => {
    navigate(`/find-lawyer?q=${encodeURIComponent(query)}`);
  };

  const features = [
    {
      title: "AI Legal Matching",
      description: "Our advanced machine learning algorithm matches you with the perfect lawyer for your specific legal needs.",
      icon: (
        <div className="rounded-lg p-2 bg-accent/10 text-accent">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
          </svg>
        </div>
      )
    },
    {
      title: "Verified Professionals",
      description: "Every lawyer on our platform is thoroughly vetted and verified for credentials, experience and expertise.",
      icon: (
        <div className="rounded-lg p-2 bg-accent/10 text-accent">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
          </svg>
        </div>
      )
    },
    {
      title: "Transparent Pricing",
      description: "Clear fee structures with no hidden costs. Know exactly what you're paying for before you commit.",
      icon: (
        <div className="rounded-lg p-2 bg-accent/10 text-accent">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
          </svg>
        </div>
      )
    },
    {
      title: "Client-Lawyer Matching",
      description: "Our ML algorithm analyzes your case details to ensure the perfect client-lawyer match every time.",
      icon: (
        <div className="rounded-lg p-2 bg-accent/10 text-accent">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16l2.879-2.879m0 0a3 3 0 104.243-4.242 3 3 0 00-4.243 4.242zM21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
      )
    }
  ];

  return (
    <PageLayout withoutPadding>
      {/* Hero section with 3D globe */}
      <section className="relative h-screen lawyermatch-hero">
        <Globe />
        
        <div className="container relative h-full mx-auto px-4 z-10 flex flex-col justify-center items-center">
          <div 
            ref={heroRef}
            className="max-w-4xl text-center space-y-6"
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold leading-tight animate-fade-in">
              <span className="text-gradient">AI-Powered</span> Legal Expertise<br />At Your Fingertips
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto animate-fade-in" style={{ animationDelay: '100ms' }}>
              Our advanced machine learning algorithms match you with the perfect lawyer for your specific legal needs, ensuring optimal outcomes for every case.
            </p>
            
            <div 
              className="max-w-2xl w-full mx-auto mt-8 animate-fade-in flex flex-col gap-4" 
              style={{ animationDelay: '200ms' }}
            >
              <Textarea 
                placeholder="Describe your legal issue or case..."
                className="bg-secondary/70 backdrop-blur-md border-secondary"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
              />
              <div className="flex gap-4">
                <Button 
                  size="lg" 
                  className="w-full"
                  disabled={!query.trim()}
                  onClick={handleSearch}
                >
                  Find Your Legal Match
                </Button>
                
                {!isAuthenticated && (
                  <Button
                    variant="outline"
                    size="lg"
                    className="w-full bg-secondary/70 backdrop-blur-md"
                    onClick={() => navigate("/register")}
                  >
                    Register Now
                  </Button>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Practice Areas */}
      <section className="py-20 bg-secondary/50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16 animate-slide-up">
            <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">Legal Practice Areas</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Our platform connects you with expert lawyers across all major legal domains, ensuring you find the right specialist for your specific needs.
            </p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {["Corporate Law", "Criminal Law", "Family Law", "Civil Law", "Intellectual Property", 
              "Real Estate Law", "Tax Law", "Constitutional Law", "Environmental Law", "Immigration Law"].map((domain, index) => (
              <div
                key={domain}
                className="animate-scale-in card-3d"
                style={{ animationDelay: `${index * 50}ms` }}
              >
                <Card className="h-full bg-card/70 hover:bg-card/90 transition-colors">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg">{domain}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">
                      Find top {domain.toLowerCase()} specialists
                    </p>
                  </CardContent>
                  <CardFooter>
                    <Button 
                      variant="ghost" 
                      className="w-full"
                      onClick={() => navigate(`/find-lawyer?domain=${encodeURIComponent(domain)}`)}
                    >
                      View Lawyers
                    </Button>
                  </CardFooter>
                </Card>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16 animate-slide-up">
            <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">Why Choose LegalMatch?</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Our innovative platform uses cutting-edge technology to transform how you find and work with legal professionals.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <div
                key={feature.title}
                className="animate-scale-in"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <Card className="h-full card-3d">
                  <CardHeader className="pb-2">
                    {feature.icon}
                    <CardTitle className="text-lg mt-4">{feature.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">{feature.description}</p>
                  </CardContent>
                </Card>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-secondary/50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center animate-fade-in">
            <h2 className="text-3xl md:text-4xl font-display font-bold mb-6">Ready to Find Your Perfect Legal Match?</h2>
            <p className="text-lg text-muted-foreground mb-8">
              Join thousands of clients who have found their ideal legal representation through our advanced AI-powered platform.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              {!isAuthenticated ? (
                <Button size="lg" className="px-8" onClick={() => navigate("/register")}>
                  Sign Up Now
                </Button>
              ) : (
                <Button size="lg" className="px-8" onClick={() => navigate("/user-dashboard")}>
                  Go to Dashboard
                </Button>
              )}
              <Button size="lg" variant="outline" className="px-8" onClick={() => navigate("/find-lawyer")}>
                Search Lawyers
              </Button>
            </div>
          </div>
        </div>
      </section>
    </PageLayout>
  );
};

export default Index;
