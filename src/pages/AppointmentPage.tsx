
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import PageLayout from "@/components/layout/PageLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { toast } from "sonner";
import AppointmentScheduler from "@/components/AppointmentScheduler";
import { useAuth, AppointmentData } from "@/contexts/AuthContext";

// Mock lawyer data - in a real app this would be fetched from an API
const MOCK_LAWYERS = {
  "lawyer1": {
    id: "lawyer1",
    name: "Rajesh Kumar",
    domain: "Corporate Law",
  },
  "lawyer2": {
    id: "lawyer2",
    name: "Priya Sharma",
    domain: "Family Law",
  },
  "lawyer3": {
    id: "lawyer3",
    name: "Avinash Mehta",
    domain: "Criminal Law",
  }
};

const AppointmentPage = () => {
  const { lawyerId } = useParams<{ lawyerId: string }>();
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const [lawyer, setLawyer] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    // Redirect to login if not authenticated
    if (!isAuthenticated) {
      navigate("/login", { state: { from: `/appointment/${lawyerId}` } });
      return;
    }
    
    // Simulate API call to get lawyer details
    if (lawyerId) {
      setTimeout(() => {
        const foundLawyer = MOCK_LAWYERS[lawyerId as keyof typeof MOCK_LAWYERS];
        if (foundLawyer) {
          setLawyer(foundLawyer);
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
    navigate("/user-dashboard");
  };
  
  if (loading) {
    return (
      <PageLayout>
        <div className="container py-12">
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
        <Button 
          variant="outline" 
          className="mb-6"
          onClick={() => navigate(-1)}
        >
          ← Back
        </Button>
        
        <Card className="max-w-4xl mx-auto">
          <CardHeader>
            <CardTitle className="text-2xl">Schedule an Appointment</CardTitle>
            <CardDescription>
              Book a consultation with {lawyer.name}, {lawyer.domain} specialist
            </CardDescription>
          </CardHeader>
          <CardContent>
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
