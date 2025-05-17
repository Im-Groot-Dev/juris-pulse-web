
import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import PageLayout from "@/components/layout/PageLayout";
import LawyerCard from "@/components/LawyerCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { toast } from "sonner";
import { 
  getLawyerData, 
  filterLawyers,
  recommendLawyers,
  LawyerData,
  DOMAINS,
  CITIES
} from "@/utils/machineLearningSim";
import { useIsMobile } from "@/hooks/use-mobile";

const FindLawyer = () => {
  const isMobile = useIsMobile();
  const [searchParams, setSearchParams] = useSearchParams();
  const [loading, setLoading] = useState(true);
  const [showFilters, setShowFilters] = useState(!isMobile);
  
  // Results data
  const [allLawyers, setAllLawyers] = useState<LawyerData[]>([]);
  const [filteredLawyers, setFilteredLawyers] = useState<LawyerData[]>([]);
  
  // Query parameters
  const initialQuery = searchParams.get("q") || "";
  const initialDomain = searchParams.get("domain") || "";
  
  // Filter states
  const [query, setQuery] = useState(initialQuery);
  const [domain, setDomain] = useState(initialDomain);
  const [city, setCity] = useState("");
  const [gender, setGender] = useState("");
  const [minExperience, setMinExperience] = useState(0);
  const [minRating, setMinRating] = useState(0);
  const [maxFees, setMaxFees] = useState(50000);
  const [sort, setSort] = useState("rating"); // rating, experience, fees-low, fees-high
  
  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const lawyersPerPage = 12; // Display 12 lawyers per page
  
  useEffect(() => {
    const fetchAndProcessData = async () => {
      setLoading(true);
      
      try {
        // Get lawyer data
        const lawyerData = getLawyerData();
        setAllLawyers(lawyerData);
        
        // Apply filters
        applyFilters(lawyerData);
      } catch (error) {
        console.error("Error fetching lawyer data:", error);
        toast.error("Failed to load lawyer data");
      } finally {
        setLoading(false);
      }
    };
    
    fetchAndProcessData();
  }, [initialQuery, initialDomain]);
  
  const applyFilters = (data: LawyerData[] = allLawyers) => {
    let results = [...data];
    
    // AI recommendation based on query
    if (query) {
      results = recommendLawyers(query, data, data.length); // Use all lawyers instead of limiting to 50
    }
    
    // Apply manual filters
    results = filterLawyers(results, {
      domain: domain || undefined,
      city: city || undefined,
      gender: gender || undefined,
      minExperience: minExperience || undefined,
      minRating: minRating || undefined,
      maxFees: maxFees || undefined,
    });
    
    // Apply sorting
    switch (sort) {
      case "rating":
        results.sort((a, b) => b.rating - a.rating);
        break;
      case "experience":
        results.sort((a, b) => b.experience - a.experience);
        break;
      case "fees-low":
        results.sort((a, b) => a.fees_per_hearing - b.fees_per_hearing);
        break;
      case "fees-high":
        results.sort((a, b) => b.fees_per_hearing - a.fees_per_hearing);
        break;
      default:
        break;
    }
    
    setFilteredLawyers(results);
    setCurrentPage(1); // Reset to first page when applying new filters
  };
  
  const handleSearch = () => {
    // Update URL params for sharing/bookmarking
    const params = new URLSearchParams();
    if (query) params.set("q", query);
    if (domain) params.set("domain", domain);
    setSearchParams(params);
    
    // Apply filters
    applyFilters();
  };
  
  const handleResetFilters = () => {
    setDomain("");
    setCity("");
    setGender("");
    setMinExperience(0);
    setMinRating(0);
    setMaxFees(50000);
    setSort("rating");
    
    // Clear search params
    setSearchParams(new URLSearchParams());
    setQuery("");
    
    // Reset to all lawyers
    setFilteredLawyers(allLawyers);
    setCurrentPage(1);
  };
  
  // Get current lawyers
  const indexOfLastLawyer = currentPage * lawyersPerPage;
  const indexOfFirstLawyer = indexOfLastLawyer - lawyersPerPage;
  const currentLawyers = filteredLawyers.slice(indexOfFirstLawyer, indexOfLastLawyer);
  
  // Calculate page numbers
  const totalPages = Math.ceil(filteredLawyers.length / lawyersPerPage);
  
  const renderPagination = () => {
    if (totalPages <= 1) return null;
    
    let pages = [];
    if (totalPages <= 5) {
      // Show all page numbers if 5 or fewer
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      // Show first page, current page ±1, last page
      pages.push(1);
      if (currentPage > 3) pages.push("ellipsis");
      if (currentPage > 2) pages.push(currentPage - 1);
      if (currentPage !== 1 && currentPage !== totalPages) pages.push(currentPage);
      if (currentPage < totalPages - 1) pages.push(currentPage + 1);
      if (currentPage < totalPages - 2) pages.push("ellipsis");
      pages.push(totalPages);
    }
    
    return (
      <Pagination className="mt-8">
        <PaginationContent>
          {currentPage > 1 && (
            <PaginationItem>
              <PaginationPrevious onClick={() => setCurrentPage(currentPage - 1)} />
            </PaginationItem>
          )}
          
          {pages.map((page, index) => {
            if (page === "ellipsis") {
              return (
                <PaginationItem key={`ellipsis-${index}`}>
                  <PaginationEllipsis />
                </PaginationItem>
              );
            }
            
            return (
              <PaginationItem key={`page-${page}`}>
                <PaginationLink
                  isActive={currentPage === page}
                  onClick={() => setCurrentPage(page as number)}
                >
                  {page}
                </PaginationLink>
              </PaginationItem>
            );
          })}
          
          {currentPage < totalPages && (
            <PaginationItem>
              <PaginationNext onClick={() => setCurrentPage(currentPage + 1)} />
            </PaginationItem>
          )}
        </PaginationContent>
      </Pagination>
    );
  };

  return (
    <PageLayout>
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8 text-center">
          <h1 className="text-3xl md:text-4xl font-display font-bold mb-4 animate-slide-up">Find Your Perfect Legal Match</h1>
          <p className="text-muted-foreground max-w-2xl mx-auto animate-slide-up" style={{ animationDelay: '100ms' }}>
            Our AI-powered platform analyzes your legal needs and matches you with the ideal lawyer from our extensive network.
          </p>
        </div>
        
        <div className="mb-8 max-w-3xl mx-auto animate-slide-up" style={{ animationDelay: '200ms' }}>
          <Textarea
            placeholder="Describe your legal issue or case in detail..."
            className="w-full mb-4 h-24"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <Button className="w-full" onClick={handleSearch}>
            Find Your Legal Match
          </Button>
        </div>
        
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Filters sidebar */}
          <div className={`lg:w-1/4 ${showFilters ? 'block' : 'hidden'} lg:block animate-slide-up`} style={{ animationDelay: '300ms' }}>
            <div className="bg-secondary/30 p-6 rounded-lg sticky top-24">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-display font-medium">Filters</h2>
                <Button variant="ghost" size="sm" onClick={handleResetFilters}>
                  Reset
                </Button>
              </div>
              
              <Accordion type="multiple" defaultValue={["domain", "location", "experience", "fees"]}>
                <AccordionItem value="domain">
                  <AccordionTrigger>Legal Domain</AccordionTrigger>
                  <AccordionContent>
                    <Select value={domain} onValueChange={setDomain}>
                      <SelectTrigger>
                        <SelectValue placeholder="All domains" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All domains</SelectItem>
                        {DOMAINS.map((d) => (
                          <SelectItem key={d} value={d}>
                            {d}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </AccordionContent>
                </AccordionItem>
                
                <AccordionItem value="location">
                  <AccordionTrigger>Location</AccordionTrigger>
                  <AccordionContent>
                    <Select value={city} onValueChange={setCity}>
                      <SelectTrigger>
                        <SelectValue placeholder="All cities" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All cities</SelectItem>
                        {CITIES.map((c) => (
                          <SelectItem key={c} value={c}>
                            {c}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </AccordionContent>
                </AccordionItem>
                
                <AccordionItem value="gender">
                  <AccordionTrigger>Gender</AccordionTrigger>
                  <AccordionContent>
                    <Select value={gender} onValueChange={setGender}>
                      <SelectTrigger>
                        <SelectValue placeholder="Any gender" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">Any gender</SelectItem>
                        <SelectItem value="male">Male</SelectItem>
                        <SelectItem value="female">Female</SelectItem>
                      </SelectContent>
                    </Select>
                  </AccordionContent>
                </AccordionItem>
                
                <AccordionItem value="experience">
                  <AccordionTrigger>Experience</AccordionTrigger>
                  <AccordionContent>
                    <div className="space-y-4">
                      <div className="space-y-1">
                        <div className="flex justify-between">
                          <Label>Minimum Years</Label>
                          <span>{minExperience} years</span>
                        </div>
                        <Slider
                          defaultValue={[0]}
                          min={0}
                          max={30}
                          step={1}
                          value={[minExperience]}
                          onValueChange={(value) => setMinExperience(value[0])}
                        />
                      </div>
                    </div>
                  </AccordionContent>
                </AccordionItem>
                
                <AccordionItem value="rating">
                  <AccordionTrigger>Rating</AccordionTrigger>
                  <AccordionContent>
                    <div className="space-y-4">
                      <div className="space-y-1">
                        <div className="flex justify-between">
                          <Label>Minimum Rating</Label>
                          <span>{minRating.toFixed(1)}</span>
                        </div>
                        <Slider
                          defaultValue={[0]}
                          min={0}
                          max={5}
                          step={0.5}
                          value={[minRating]}
                          onValueChange={(value) => setMinRating(value[0])}
                        />
                      </div>
                    </div>
                  </AccordionContent>
                </AccordionItem>
                
                <AccordionItem value="fees">
                  <AccordionTrigger>Fees</AccordionTrigger>
                  <AccordionContent>
                    <div className="space-y-4">
                      <div className="space-y-1">
                        <div className="flex justify-between">
                          <Label>Maximum Fees</Label>
                          <span>₹{maxFees.toLocaleString()}</span>
                        </div>
                        <Slider
                          defaultValue={[50000]}
                          min={5000}
                          max={50000}
                          step={1000}
                          value={[maxFees]}
                          onValueChange={(value) => setMaxFees(value[0])}
                        />
                      </div>
                    </div>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
              
              <div className="mt-6 space-y-4">
                <Label>Sort By</Label>
                <Select value={sort} onValueChange={setSort}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="rating">Top Rated</SelectItem>
                    <SelectItem value="experience">Most Experienced</SelectItem>
                    <SelectItem value="fees-low">Fees: Low to High</SelectItem>
                    <SelectItem value="fees-high">Fees: High to Low</SelectItem>
                  </SelectContent>
                </Select>
                
                <Button className="w-full mt-4" onClick={() => applyFilters()}>
                  Apply Filters
                </Button>
              </div>
            </div>
          </div>
          
          {/* Main content area */}
          <div className="lg:w-3/4">
            <div className="flex justify-between items-center mb-6">
              <div className="flex-1">
                <h2 className="text-2xl font-display font-medium mb-2 animate-slide-up" style={{ animationDelay: '400ms' }}>
                  {loading ? (
                    <span className="inline-block w-32 h-8 bg-muted/30 animate-pulse rounded"></span>
                  ) : (
                    `Found ${filteredLawyers.length} lawyers`
                  )}
                </h2>
                
                <p className="text-sm text-muted-foreground animate-slide-up" style={{ animationDelay: '500ms' }}>
                  {domain ? `Specializing in ${domain}` : "Across all legal domains"}
                  {city ? ` in ${city}` : ""}
                  {query ? ` matching "${query}"` : ""}
                </p>
              </div>
              
              <Button
                variant="outline"
                className="lg:hidden"
                onClick={() => setShowFilters(!showFilters)}
              >
                {showFilters ? "Hide Filters" : "Show Filters"}
              </Button>
            </div>
            
            {loading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[1, 2, 3, 4, 5, 6].map((i) => (
                  <div
                    key={i}
                    className="h-80 bg-secondary/30 animate-pulse rounded-lg shadow-md"
                  />
                ))}
              </div>
            ) : filteredLawyers.length === 0 ? (
              <div className="text-center py-12">
                <div className="mb-4 text-muted-foreground">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-medium mb-2">No lawyers found</h3>
                <p className="text-muted-foreground mb-4">
                  Try adjusting your filters or search query to find a match
                </p>
                <Button onClick={handleResetFilters}>Reset Filters</Button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {currentLawyers.map((lawyer, index) => (
                  <div 
                    key={lawyer.id} 
                    className="animate-scale-in" 
                    style={{ animationDelay: `${index * 50}ms` }}
                  >
                    <LawyerCard lawyer={{
                      id: lawyer.id,
                      first_name: lawyer.first_name,
                      last_name: lawyer.last_name,
                      experience: lawyer.experience,
                      gender: lawyer.gender || "",
                      domain: lawyer.domain,
                      fees_per_hearing: lawyer.fees_per_hearing,
                      rating: lawyer.rating,
                      city: lawyer.city,
                      law_school: lawyer.law_school,
                      profileImage: lawyer.profileImage,
                      cases_won: lawyer.cases_won,
                      total_cases: lawyer.total_cases,
                      contact_number: lawyer.contact_number
                    }} />
                  </div>
                ))}
              </div>
            )}
            
            {/* Pagination */}
            {!loading && filteredLawyers.length > 0 && renderPagination()}
          </div>
        </div>
      </div>
    </PageLayout>
  );
};

export default FindLawyer;
