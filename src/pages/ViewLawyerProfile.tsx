
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import PageLayout from "@/components/layout/PageLayout";
import LawyerProfile from "@/components/LawyerProfile";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { toast } from "sonner";
import { SAMPLE_LAWYERS } from "@/utils/machineLearningSim";
import { useAuth } from "@/contexts/AuthContext";

interface LawyerData {
  id: string;
  name: string;
  profileImage?: string;
  email: string;
  domain: string;
  experience: number;
  fees_per_hearing: number;
  rating?: number;
  cases_won: number;
  total_cases: number;
  city: string;
  bio?: string;
  contact_number?: string;
  law_school?: string;
  bar_association?: string;
}

const ViewLawyerProfile = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [lawyer, setLawyer] = useState<LawyerData | null>(null);
  const [loading, setLoading] = useState(true);
  const { isAuthenticated } = useAuth();
  
  useEffect(() => {
    // In a real app, this would fetch data from an API
    // For demo purposes, we'll use the sample data
    if (id) {
      setLoading(true);
      setTimeout(() => {
        // First check localStorage for lawyer profile (for newly registered lawyers)
        const storedLawyer = localStorage.getItem(`lawyer_${id}`);
        if (storedLawyer) {
          try {
            const parsedLawyer = JSON.parse(storedLawyer);
            setLawyer({
              id: parsedLawyer.id,
              name: `${parsedLawyer.first_name} ${parsedLawyer.last_name}`,
              profileImage: parsedLawyer.profileImage,
              email: parsedLawyer.email,
              domain: parsedLawyer.domain,
              experience: parsedLawyer.experience,
              fees_per_hearing: parsedLawyer.fees_per_hearing,
              rating: parsedLawyer.rating || 4.5,
              cases_won: parsedLawyer.cases_won,
              total_cases: parsedLawyer.total_cases,
              city: parsedLawyer.city,
              bio: parsedLawyer.bio,
              contact_number: parsedLawyer.contact_number,
              law_school: parsedLawyer.law_school,
              bar_association: parsedLawyer.bar_association
            });
            setLoading(false);
            return;
          } catch (error) {
            console.error("Failed to parse lawyer data:", error);
          }
        }
        
        // Fall back to sample lawyers
        const sampleLawyer = SAMPLE_LAWYERS.find(l => l.id === id);
        if (sampleLawyer) {
          setLawyer({
            id: sampleLawyer.id,
            name: `${sampleLawyer.first_name} ${sampleLawyer.last_name}`,
            profileImage: `https://api.dicebear.com/7.x/personas/svg?seed=${sampleLawyer.first_name}`,
            email: sampleLawyer.email,
            domain: sampleLawyer.domain,
            experience: sampleLawyer.experience,
            fees_per_hearing: sampleLawyer.fees_per_hearing,
            rating: sampleLawyer.rating,
            cases_won: sampleLawyer.cases_won,
            total_cases: sampleLawyer.total_cases,
            city: sampleLawyer.city,
            bio: `${sampleLawyer.first_name} is a specialized ${sampleLawyer.domain} lawyer with ${sampleLawyer.experience} years of experience. They have successfully handled ${sampleLawyer.cases_won} cases out of ${sampleLawyer.total_cases} total cases.`,
            contact_number: "+91 9876543210",
            law_school: sampleLawyer.law_school,
            bar_association: sampleLawyer.bar_association
          });
        } else {
          toast.error("Lawyer not found");
          navigate("/find-lawyer");
        }
        setLoading(false);
      }, 500); // Simulate network delay
    }
  }, [id, navigate]);
  
  if (loading) {
    return (
      <PageLayout>
        <div className="container py-12">
          <div className="flex items-center justify-center min-h-[50vh]">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
          </div>
        </div>
      </PageLayout>
    );
  }
  
  if (!lawyer) {
    return (
      <PageLayout>
        <div className="container py-12">
          <div className="text-center">
            <h1 className="text-2xl font-bold mb-4">Lawyer Not Found</h1>
            <p className="text-muted-foreground mb-6">
              We couldn't find the lawyer you're looking for.
            </p>
            <Button onClick={() => navigate("/find-lawyer")}>
              Browse All Lawyers
            </Button>
          </div>
        </div>
      </PageLayout>
    );
  }
  
  return (
    <PageLayout>
      <div className="container py-12">
        <div className="mb-6">
          <Button 
            variant="outline" 
            className="mb-6"
            onClick={() => navigate(-1)}
          >
            ← Back
          </Button>
          
          <h1 className="text-3xl font-bold">Lawyer Profile</h1>
          <p className="text-muted-foreground">View detailed information and schedule appointments</p>
        </div>
        
        {!isAuthenticated && (
          <Card className="mb-6 p-4 bg-muted/30 border-accent/30">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
              <p className="text-sm text-muted-foreground">
                <strong>Sign in to schedule appointments</strong> and save this lawyer to your profile.
              </p>
              <div className="flex gap-2">
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={() => navigate("/login", { state: { from: `/lawyer/${id}` } })}
                >
                  Sign In
                </Button>
                <Button 
                  size="sm" 
                  onClick={() => navigate("/register", { state: { from: `/lawyer/${id}` } })}
                >
                  Register
                </Button>
              </div>
            </div>
          </Card>
        )}
        
        <LawyerProfile lawyer={lawyer} />
      </div>
    </PageLayout>
  );
};

export default ViewLawyerProfile;
