
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { CalendarIcon, MapPinIcon, StarIcon, CheckCircleIcon, PhoneIcon, MailIcon } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "sonner";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

interface LawyerProfileProps {
  lawyer: {
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
  };
  onScheduleAppointment: () => void;
}

const LawyerDetailsProfile = ({ lawyer, onScheduleAppointment }: LawyerProfileProps) => {
  const { isAuthenticated, saveLawyer, unsaveLawyer, getSavedLawyers, hasScheduledAppointment } = useAuth();
  
  const isSaved = isAuthenticated && getSavedLawyers().includes(lawyer.id);
  const hasAppointment = isAuthenticated && hasScheduledAppointment(lawyer.id);
  
  const handleSaveLawyer = () => {
    if (!isAuthenticated) {
      toast.error("Please login to save this lawyer");
      return;
    }
    
    if (isSaved) {
      unsaveLawyer(lawyer.id);
    } else {
      saveLawyer(lawyer.id);
    }
  };

  return (
    <Card className="bg-card/50 border-border/50 backdrop-blur-sm shadow-md hover:shadow-lg transition-all duration-300">
      <CardHeader className="pb-2">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex flex-col md:flex-row items-center md:items-start gap-4">
            <Avatar className="h-24 w-24 border-2 border-primary/20">
              <AvatarImage src={lawyer.profileImage} alt={lawyer.name} />
              <AvatarFallback className="text-xl">{lawyer.name.charAt(0)}</AvatarFallback>
            </Avatar>
            <div>
              <div className="flex flex-col md:flex-row items-center md:items-start gap-2">
                <CardTitle className="text-xl">{lawyer.name}</CardTitle>
                <Badge variant="outline" className="bg-primary/10 text-primary">
                  {lawyer.domain}
                </Badge>
              </div>
              <CardDescription className="mt-1 flex items-center gap-1">
                <MapPinIcon size={14} />
                {lawyer.city}
              </CardDescription>
              <div className="flex items-center gap-1 mt-1">
                <StarIcon size={16} className="text-yellow-500 fill-yellow-500" />
                <span className="font-medium">{lawyer.rating || 4.5}</span>
                <span className="text-muted-foreground text-sm">({lawyer.total_cases} cases)</span>
              </div>
            </div>
          </div>
          
          <div className="flex flex-col gap-2 w-full md:w-auto">
            <Badge className="self-center md:self-end mb-1">
              ₹{lawyer.fees_per_hearing} per consultation
            </Badge>
            <div className="flex gap-2">
              <Button 
                variant={isSaved ? "outline" : "default"} 
                className="flex-1"
                onClick={handleSaveLawyer}
              >
                {isSaved ? "Unsave" : "Save"}
              </Button>
              <Button 
                className="flex-1" 
                onClick={onScheduleAppointment}
                disabled={hasAppointment}
              >
                {hasAppointment ? "Appointed" : "Schedule"}
              </Button>
            </div>
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="pt-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h3 className="text-lg font-semibold mb-2">About</h3>
            <p className="text-muted-foreground">
              {lawyer.bio || `${lawyer.name} is an experienced ${lawyer.domain} lawyer with ${lawyer.experience} years of practice, offering expert legal services in ${lawyer.city}.`}
            </p>
            
            <div className="mt-4 space-y-4">
              <div>
                <h4 className="text-sm font-medium mb-1">Education</h4>
                <p className="text-sm text-muted-foreground">{lawyer.law_school || "National Law University"}</p>
              </div>
              
              <div>
                <h4 className="text-sm font-medium mb-1">Bar Association</h4>
                <p className="text-sm text-muted-foreground">{lawyer.bar_association || "State Bar Council"}</p>
              </div>
              
              <div className="flex flex-col gap-1">
                <h4 className="text-sm font-medium">Contact Information</h4>
                <div className="flex items-center gap-1 text-sm text-muted-foreground">
                  <PhoneIcon size={14} />
                  {lawyer.contact_number || "+91 9876543210"}
                </div>
                <div className="flex items-center gap-1 text-sm text-muted-foreground">
                  <MailIcon size={14} />
                  {lawyer.email}
                </div>
              </div>
            </div>
          </div>
          
          <div className="space-y-4">
            <h3 className="text-lg font-semibold mb-2">Performance</h3>
            
            <div>
              <div className="flex justify-between mb-1">
                <span className="text-sm font-medium">Success Rate</span>
                <span className="text-sm font-medium">
                  {Math.round((lawyer.cases_won / lawyer.total_cases) * 100) || 85}%
                </span>
              </div>
              <Progress value={(lawyer.cases_won / lawyer.total_cases) * 100 || 85} className="h-2" />
            </div>
            
            <div>
              <div className="flex justify-between mb-1">
                <span className="text-sm font-medium">Cases Won</span>
                <span className="text-sm font-medium">
                  {lawyer.cases_won} / {lawyer.total_cases}
                </span>
              </div>
              <div className="flex gap-1">
                <div className="bg-green-500/20 text-green-700 text-xs px-2 py-1 rounded flex items-center gap-1 flex-1">
                  <CheckCircleIcon size={12} /> 
                  <span>Won: {lawyer.cases_won}</span>
                </div>
                <div className="bg-muted/30 text-muted-foreground text-xs px-2 py-1 rounded flex-1 text-center">
                  Total: {lawyer.total_cases}
                </div>
              </div>
            </div>
            
            <div>
              <h4 className="text-sm font-medium mb-2">Experience</h4>
              <div className="flex items-center gap-2">
                <div className="h-14 w-14 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold">
                  {lawyer.experience}+
                </div>
                <div className="text-sm text-muted-foreground">
                  Years of experience in {lawyer.domain}
                </div>
              </div>
            </div>
            
            <div>
              <h4 className="text-sm font-medium mb-2">Availability</h4>
              <div className="flex gap-1 flex-wrap">
                <Badge variant="outline" className="bg-green-500/10 text-green-700 hover:bg-green-500/20">
                  <CalendarIcon size={12} className="mr-1" /> Mon-Fri
                </Badge>
                <Badge variant="outline" className="bg-blue-500/10 text-blue-700 hover:bg-blue-500/20">
                  10:00 AM - 6:00 PM
                </Badge>
              </div>
            </div>
          </div>
        </div>
        
        <div className="mt-8 border-t pt-6">
          <h3 className="text-lg font-semibold mb-4">Client Testimonials</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Card className="bg-muted/30">
              <CardContent className="p-4">
                <div className="flex items-start gap-2">
                  <div className="flex-none">
                    <Avatar className="h-10 w-10">
                      <AvatarFallback>RK</AvatarFallback>
                    </Avatar>
                  </div>
                  <div>
                    <div className="flex items-center gap-1 mb-1">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <StarIcon 
                          key={star} 
                          size={14} 
                          className={`${star <= 5 ? "text-yellow-500 fill-yellow-500" : "text-muted"}`} 
                        />
                      ))}
                    </div>
                    <p className="text-sm italic text-muted-foreground">
                      "Excellent service and guidance throughout my case. Professional and dedicated approach."
                    </p>
                    <div className="mt-2 text-xs font-medium">Rahul K. - Corporate Matter</div>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card className="bg-muted/30">
              <CardContent className="p-4">
                <div className="flex items-start gap-2">
                  <div className="flex-none">
                    <Avatar className="h-10 w-10">
                      <AvatarFallback>SM</AvatarFallback>
                    </Avatar>
                  </div>
                  <div>
                    <div className="flex items-center gap-1 mb-1">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <StarIcon 
                          key={star} 
                          size={14} 
                          className={`${star <= 4 ? "text-yellow-500 fill-yellow-500" : "text-muted"}`} 
                        />
                      ))}
                    </div>
                    <p className="text-sm italic text-muted-foreground">
                      "Very knowledgeable and responsive. Helped me navigate a complex legal situation with ease."
                    </p>
                    <div className="mt-2 text-xs font-medium">Sneha M. - Property Dispute</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default LawyerDetailsProfile;
