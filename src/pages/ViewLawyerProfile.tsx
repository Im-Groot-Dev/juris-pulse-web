
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import PageLayout from "@/components/layout/PageLayout";
import LawyerProfile from "@/components/LawyerProfile";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

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

// Mock lawyer data for demonstration
const MOCK_LAWYERS: Record<string, LawyerData> = {
  "lawyer1": {
    id: "lawyer1",
    name: "Rajesh Kumar",
    profileImage: "https://api.dicebear.com/7.x/personas/svg?seed=Rajesh",
    email: "rajesh.kumar@example.com",
    domain: "Corporate Law",
    experience: 12,
    fees_per_hearing: 5000,
    rating: 4.8,
    cases_won: 87,
    total_cases: 95,
    city: "Mumbai",
    bio: "Rajesh is a corporate law specialist with over a decade of experience handling complex business negotiations, mergers, and acquisitions for major Indian and international corporations.",
    contact_number: "+91 9876543210",
    law_school: "National Law School of India University, Bangalore",
    bar_association: "Bar Council of Maharashtra and Goa"
  },
  "lawyer2": {
    id: "lawyer2",
    name: "Priya Sharma",
    profileImage: "https://api.dicebear.com/7.x/personas/svg?seed=Priya",
    email: "priya.sharma@example.com",
    domain: "Family Law",
    experience: 8,
    fees_per_hearing: 3500,
    rating: 4.7,
    cases_won: 145,
    total_cases: 160,
    city: "Delhi",
    bio: "Priya specializes in family law matters including divorce, child custody, and matrimonial disputes. She is known for her compassionate approach and strong advocacy for her clients.",
    contact_number: "+91 9876543211",
    law_school: "Faculty of Law, Delhi University",
    bar_association: "Delhi Bar Association"
  },
  "lawyer3": {
    id: "lawyer3",
    name: "Avinash Mehta",
    profileImage: "https://api.dicebear.com/7.x/personas/svg?seed=Avinash",
    email: "avinash.mehta@example.com",
    domain: "Criminal Law",
    experience: 15,
    fees_per_hearing: 7000,
    rating: 4.9,
    cases_won: 210,
    total_cases: 230,
    city: "Bangalore",
    bio: "Avinash is one of the most sought-after criminal defense attorneys in Bangalore. With 15 years of experience, he has successfully defended clients in high-profile criminal cases.",
    contact_number: "+91 9876543212",
    law_school: "ILS Law College, Pune",
    bar_association: "Karnataka State Bar Council"
  }
};

const ViewLawyerProfile = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [lawyer, setLawyer] = useState<LawyerData | null>(null);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    // In a real app, this would fetch data from an API
    // For demo purposes, we'll use the mock data
    if (id) {
      setTimeout(() => {
        const foundLawyer = MOCK_LAWYERS[id];
        if (foundLawyer) {
          setLawyer(foundLawyer);
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
        
        <LawyerProfile lawyer={lawyer} />
      </div>
    </PageLayout>
  );
};

export default ViewLawyerProfile;
