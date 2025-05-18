
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import PageLayout from "@/components/layout/PageLayout";
import LawyerProfile from "@/components/LawyerDetailsProfile";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { useAuth } from "@/contexts/AuthContext";
import { getLawyerData, LawyerData } from "@/utils/machineLearningSim";

const ViewLawyerProfile = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [lawyer, setLawyer] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);
  const { isAuthenticated } = useAuth();
  
  useEffect(() => {
    if (id) {
      setLoading(true);
      
      // Get all lawyers from the utility function
      const allLawyers = getLawyerData();
      
      // Find the lawyer by ID
      const foundLawyer = allLawyers.find(lawyer => lawyer.id === id);
      
      setTimeout(() => {
        if (foundLawyer) {
          // Convert the data format to match what LawyerDetailsProfile expects
          const formattedLawyer = {
            id: foundLawyer.id,
            name: `${foundLawyer.first_name} ${foundLawyer.last_name}`,
            profileImage: foundLawyer.profileImage,
            email: foundLawyer.contact_number ? `${foundLawyer.first_name.toLowerCase()}.${foundLawyer.last_name.toLowerCase()}@example.com` : "lawyer@example.com",
            domain: foundLawyer.domain,
            experience: foundLawyer.experience,
            fees_per_hearing: foundLawyer.fees_per_hearing,
            rating: foundLawyer.rating,
            cases_won: foundLawyer.cases_won || Math.floor(foundLawyer.total_cases * 0.8),
            total_cases: foundLawyer.total_cases || 150,
            city: foundLawyer.city,
            bio: `${foundLawyer.first_name} ${foundLawyer.last_name} is a ${foundLawyer.experience} year experienced ${foundLawyer.domain} lawyer based in ${foundLawyer.city}.`,
            contact_number: foundLawyer.contact_number || "+91 9876543210",
            law_school: foundLawyer.law_school,
            bar_association: foundLawyer.bar_association
          };
          
          setLawyer(formattedLawyer);
        } else {
          toast.error("Lawyer not found");
          navigate("/find-lawyer");
        }
        setLoading(false);
      }, 500); // Simulate network delay
    }
  }, [id, navigate]);
  
  const handleAppointmentClick = () => {
    if (!isAuthenticated) {
      toast.error("Please log in to schedule an appointment");
      navigate("/login", { state: { from: `/lawyer/${id}` } });
      return;
    }
    
    // Navigate to the appointment page
    navigate(`/appointment/${id}`);
  };
  
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
        
        <LawyerProfile lawyer={lawyer} onScheduleAppointment={handleAppointmentClick} />
      </div>
    </PageLayout>
  );
};

export default ViewLawyerProfile;
