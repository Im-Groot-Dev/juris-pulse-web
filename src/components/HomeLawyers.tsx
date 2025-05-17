
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import LawyerCard from "@/components/LawyerCard";
import { getLawyerData, DOMAINS, LawyerData } from "@/utils/machineLearningSim";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";

const HomeLawyers = () => {
  const [lawyers, setLawyers] = useState<LawyerData[]>([]);
  const [activeTab, setActiveTab] = useState(DOMAINS[0]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLawyers = () => {
      try {
        const allLawyers = getLawyerData();
        setLawyers(allLawyers);
      } catch (error) {
        console.error("Error fetching lawyers:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchLawyers();
  }, []);

  const filteredLawyers = lawyers.filter((lawyer) => lawyer.domain === activeTab);

  return (
    <div className="py-16 bg-secondary/20">
      <div className="container">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">
            Our Expert Lawyers
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Browse through our network of experienced legal professionals specialized in various domains
          </p>
        </div>

        <Tabs 
          defaultValue={DOMAINS[0]} 
          className="w-full"
          onValueChange={setActiveTab}
        >
          <div className="flex justify-center mb-8">
            <TabsList className="h-auto flex-wrap">
              {DOMAINS.slice(0, 5).map((domain) => (
                <TabsTrigger 
                  key={domain} 
                  value={domain}
                  className="px-4 py-2"
                >
                  {domain}
                </TabsTrigger>
              ))}
            </TabsList>
          </div>

          {DOMAINS.slice(0, 5).map((domain) => (
            <TabsContent key={domain} value={domain} className="mt-0">
              {loading ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                  {[1, 2, 3, 4].map((i) => (
                    <Card key={i} className="h-80 animate-pulse" />
                  ))}
                </div>
              ) : (
                <Carousel className="w-full">
                  <CarouselContent className="-ml-2 md:-ml-4">
                    {filteredLawyers.slice(0, 8).map((lawyer, index) => (
                      <CarouselItem key={lawyer.id} className="pl-2 md:pl-4 sm:basis-1/2 lg:basis-1/4">
                        <LawyerCard lawyer={lawyer} />
                      </CarouselItem>
                    ))}
                  </CarouselContent>
                  <div className="flex justify-center mt-4">
                    <CarouselPrevious className="static mx-2 transform-none" />
                    <CarouselNext className="static mx-2 transform-none" />
                  </div>
                </Carousel>
              )}
            </TabsContent>
          ))}
        </Tabs>

        <div className="mt-12 text-center">
          <Link to="/find-lawyer">
            <Button size="lg">
              View All Lawyers
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default HomeLawyers;
