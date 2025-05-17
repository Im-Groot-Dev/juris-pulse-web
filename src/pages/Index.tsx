
import { Link } from "react-router-dom";
import PageLayout from "@/components/layout/PageLayout";
import { Button } from "@/components/ui/button";
import { ArrowRight, BookOpen, Briefcase, CheckCircle, Gavel, SearchCheck, ShieldCheck, UserCheck } from "lucide-react";
import Globe from "@/components/Globe";
import HomeLawyers from "@/components/HomeLawyers";
import { initializeSampleData } from "@/utils/machineLearningSim";
import { useEffect } from "react";

const Index = () => {
  useEffect(() => {
    // Initialize sample lawyer data
    initializeSampleData();
  }, []);

  return (
    <PageLayout>
      {/* Hero Section */}
      <section className="relative">
        <div className="container mx-auto px-4 py-16 md:py-24">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="order-2 lg:order-1 animate-fade-in">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold mb-6 leading-tight">
                Find the <span className="text-primary">Perfect Legal Expert</span> For Your Case
              </h1>
              <p className="text-lg mb-8 text-muted-foreground">
                Our AI-powered platform matches you with the ideal lawyer for your specific legal needs, saving you time and ensuring the best possible representation.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link to="/find-lawyer">
                  <Button size="lg" className="w-full sm:w-auto">
                    Find a Lawyer <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
                <Link to="/lawyer-register">
                  <Button size="lg" variant="outline" className="w-full sm:w-auto">
                    Join as a Lawyer
                  </Button>
                </Link>
              </div>
            </div>
            <div className="order-1 lg:order-2 flex justify-center">
              <div className="w-full max-w-md aspect-square">
                <Globe />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Lawyers Section */}
      <HomeLawyers />

      {/* How It Works Section */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">How It Works</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Our platform simplifies the process of finding the right legal representation in just a few easy steps
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-card rounded-lg p-6 text-center shadow-sm">
              <div className="w-16 h-16 bg-primary/10 text-primary rounded-full flex items-center justify-center mx-auto mb-4">
                <SearchCheck size={32} />
              </div>
              <h3 className="text-xl font-bold mb-2">Describe Your Case</h3>
              <p className="text-muted-foreground">
                Tell us about your legal issue and requirements in detail to help us find the best match
              </p>
            </div>
            
            <div className="bg-card rounded-lg p-6 text-center shadow-sm">
              <div className="w-16 h-16 bg-primary/10 text-primary rounded-full flex items-center justify-center mx-auto mb-4">
                <UserCheck size={32} />
              </div>
              <h3 className="text-xl font-bold mb-2">Get Matched</h3>
              <p className="text-muted-foreground">
                Our AI algorithm analyzes your needs and matches you with the most suitable lawyers
              </p>
            </div>
            
            <div className="bg-card rounded-lg p-6 text-center shadow-sm">
              <div className="w-16 h-16 bg-primary/10 text-primary rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle size={32} />
              </div>
              <h3 className="text-xl font-bold mb-2">Schedule Consultation</h3>
              <p className="text-muted-foreground">
                Book an appointment with your selected lawyer directly through our platform
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-16 bg-secondary/20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">Legal Services We Cover</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Our platform connects you with expert lawyers across a wide range of legal domains
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-card border border-border/50 rounded-lg p-6 hover:shadow-md transition-shadow">
              <Gavel className="h-8 w-8 text-primary mb-4" />
              <h3 className="text-xl font-bold mb-2">Corporate Law</h3>
              <p className="text-muted-foreground mb-4">
                Expert guidance for businesses on formation, contracts, compliance, and corporate governance
              </p>
              <Link to="/find-lawyer?domain=Corporate%20Law" className="text-primary hover:underline inline-flex items-center">
                Find Specialists <ArrowRight className="ml-1 h-4 w-4" />
              </Link>
            </div>

            <div className="bg-card border border-border/50 rounded-lg p-6 hover:shadow-md transition-shadow">
              <ShieldCheck className="h-8 w-8 text-primary mb-4" />
              <h3 className="text-xl font-bold mb-2">Criminal Law</h3>
              <p className="text-muted-foreground mb-4">
                Skilled advocates providing defense and representation in criminal proceedings
              </p>
              <Link to="/find-lawyer?domain=Criminal%20Law" className="text-primary hover:underline inline-flex items-center">
                Find Specialists <ArrowRight className="ml-1 h-4 w-4" />
              </Link>
            </div>

            <div className="bg-card border border-border/50 rounded-lg p-6 hover:shadow-md transition-shadow">
              <BookOpen className="h-8 w-8 text-primary mb-4" />
              <h3 className="text-xl font-bold mb-2">Family Law</h3>
              <p className="text-muted-foreground mb-4">
                Compassionate legal support for divorce, child custody, adoption, and family matters
              </p>
              <Link to="/find-lawyer?domain=Family%20Law" className="text-primary hover:underline inline-flex items-center">
                Find Specialists <ArrowRight className="ml-1 h-4 w-4" />
              </Link>
            </div>

            <div className="bg-card border border-border/50 rounded-lg p-6 hover:shadow-md transition-shadow">
              <Briefcase className="h-8 w-8 text-primary mb-4" />
              <h3 className="text-xl font-bold mb-2">Civil Law</h3>
              <p className="text-muted-foreground mb-4">
                Resolution of disputes between individuals and organizations through civil proceedings
              </p>
              <Link to="/find-lawyer?domain=Civil%20Law" className="text-primary hover:underline inline-flex items-center">
                Find Specialists <ArrowRight className="ml-1 h-4 w-4" />
              </Link>
            </div>

            <div className="bg-card border border-border/50 rounded-lg p-6 hover:shadow-md transition-shadow">
              <ShieldCheck className="h-8 w-8 text-primary mb-4" />
              <h3 className="text-xl font-bold mb-2">Intellectual Property</h3>
              <p className="text-muted-foreground mb-4">
                Protection of creative works, inventions, and business identities through patents and trademarks
              </p>
              <Link to="/find-lawyer?domain=Intellectual%20Property" className="text-primary hover:underline inline-flex items-center">
                Find Specialists <ArrowRight className="ml-1 h-4 w-4" />
              </Link>
            </div>

            <div className="bg-card border border-border/50 rounded-lg p-6 hover:shadow-md transition-shadow">
              <Gavel className="h-8 w-8 text-primary mb-4" />
              <h3 className="text-xl font-bold mb-2">All Legal Services</h3>
              <p className="text-muted-foreground mb-4">
                Explore our full range of legal services including tax, real estate, immigration, and more
              </p>
              <Link to="/find-lawyer" className="text-primary hover:underline inline-flex items-center">
                Browse All Services <ArrowRight className="ml-1 h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-primary/5">
        <div className="container mx-auto px-4">
          <div className="bg-card border border-border/50 rounded-xl p-8 md:p-12 text-center max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">Ready to Find Your Legal Match?</h2>
            <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
              Join thousands of clients who have successfully found the right legal expert for their needs through our platform
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link to="/find-lawyer">
                <Button size="lg" className="w-full sm:w-auto">
                  Find a Lawyer Now
                </Button>
              </Link>
              <Link to="/about">
                <Button variant="outline" size="lg" className="w-full sm:w-auto">
                  Learn More About Us
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </PageLayout>
  );
};

export default Index;
