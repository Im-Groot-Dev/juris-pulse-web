
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import PageLayout from "@/components/layout/PageLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { toast } from "sonner";
import AppointmentScheduler from "@/components/AppointmentScheduler";
import { useAuth, AppointmentData } from "@/contexts/AuthContext";
import { ArrowLeft, Briefcase, MapPin } from "lucide-react";
import { getLawyerData } from "@/utils/machineLearningSim";

const AppointmentPage = () => {
  const { lawyerId } = useParams<{ lawyerId: string }>();
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const [lawyer, setLawyer] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    // Redirect to login if not authenticated
    if (!isAuthenticated) {
      toast.error("Please log in to schedule an appointment");
      navigate("/login", { state: { from: `/appointment/${lawyerId}` } });
      return;
    }
    
    // Get lawyer details from the utility function
    if (lawyerId) {
      setLoading(true);
      
      setTimeout(() => {
        // Get all lawyers
        const allLawyers = getLawyerData();
        
        // Find the lawyer by ID
        const foundLawyer = allLawyers.find(lawyer => lawyer.id === lawyerId);
        
        if (foundLawyer) {
          // Format the lawyer data
          const formattedLawyer = {
            id: foundLawyer.id,
            name: `${foundLawyer.first_name} ${foundLawyer.last_name}`,
            domain: foundLawyer.domain,
            city: foundLawyer.city,
            experience: foundLawyer.experience
          };
          
          setLawyer(formattedLawyer);
        } else {
          toast.error("Lawyer not found");
          navigate("/find-lawyer");
        }
        
        setLoading(false);
      }, 500);
    }
  }, [lawyerId, navigate, isAuthenticated]);
  
  const handleScheduleSuccess = (appointmentData: Omit<AppointmentData, 'id'>) => {
    toast.success(`Appointment scheduled successfully with ${lawyer.name}`);
    navigate("/user-dashboard", { state: { activeTab: "appointments" } });
  };
  
  if (loading) {
    return (
      <PageLayout>
        <div className="container py-8 md:py-12">
          <div className="flex items-center justify-center min-h-[60vh]">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-accent"></div>
          </div>
        </div>
      </PageLayout>
    );
  }
  
  if (!lawyer) {
    return (
      <PageLayout>
        <div className="container py-8 md:py-12">
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
      <div className="container py-8 md:py-12">
        <Button 
          variant="outline" 
          className="mb-6 flex items-center gap-2"
          onClick={() => navigate(-1)}
        >
          <ArrowLeft className="h-4 w-4" /> Back
        </Button>
        
        <div className="mb-6">
          <h1 className="text-2xl md:text-3xl font-bold">Schedule an Appointment</h1>
          <p className="text-muted-foreground mt-1">
            Select your preferred date and time to meet with the lawyer
          </p>
        </div>
        
        <Card className="max-w-4xl mx-auto">
          <CardHeader className="border-b">
            <CardTitle className="text-xl md:text-2xl">Book a Consultation</CardTitle>
            <CardDescription className="flex flex-col gap-1 mt-2">
              <div className="flex items-center gap-2">
                <span className="font-medium">{lawyer.name}</span>
                <span className="text-muted-foreground">•</span>
                <span className="flex items-center gap-1">
                  <Briefcase className="h-3.5 w-3.5" />
                  {lawyer.domain}
                </span>
              </div>
              {lawyer.city && (
                <div className="flex items-center gap-1 text-muted-foreground text-sm">
                  <MapPin className="h-3.5 w-3.5" />
                  {lawyer.city}
                  {lawyer.experience && (
                    <>
                      <span>•</span>
                      <span>{lawyer.experience} years experience</span>
                    </>
                  )}
                </div>
              )}
            </CardDescription>
          </CardHeader>
          <CardContent className="pt-6">
            <AppointmentScheduler 
              lawyer={lawyer}
              onSchedule={handleScheduleSuccess}
              onCancel={() => navigate(-1)}
            />
          </CardContent>
        </Card>
      </div>
    </PageLayout>
  );
};

export default AppointmentPage;
