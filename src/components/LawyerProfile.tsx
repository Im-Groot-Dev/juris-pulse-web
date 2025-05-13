
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { CalendarIcon, MapPinIcon, StarIcon, CheckCircleIcon, PhoneIcon, MailIcon } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { AppointmentData } from "@/contexts/AuthContext";
import AppointmentScheduler from "./AppointmentScheduler";
import { toast } from "sonner";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

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
}

const LawyerProfile = ({ lawyer }: LawyerProfileProps) => {
  const { user, isAuthenticated, saveLawyer, unsaveLawyer, getSavedLawyers, hasScheduledAppointment } = useAuth();
  const [showScheduler, setShowScheduler] = useState(false);
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("overview");
  
  const isSaved = isAuthenticated && getSavedLawyers().includes(lawyer.id);
  const hasAppointment = isAuthenticated && hasScheduledAppointment(lawyer.id);
  
  const handleSaveLawyer = () => {
    if (!isAuthenticated) {
      toast.error("Please login to save this lawyer");
      navigate("/login", { state: { from: `/lawyer/${lawyer.id}` } });
      return;
    }
    
    if (isSaved) {
      unsaveLawyer(lawyer.id);
    } else {
      saveLawyer(lawyer.id);
    }
  };
  
  const handleAppointment = () => {
    if (!isAuthenticated) {
      toast.error("Please login to schedule an appointment");
      navigate("/login", { state: { from: `/lawyer/${lawyer.id}` } });
      return;
    }
    
    setShowScheduler(true);
  };
  
  const handleScheduleSuccess = (appointmentData: Omit<AppointmentData, 'id'>) => {
    setShowScheduler(false);
    toast.success(`Appointment scheduled with ${lawyer.name}`);
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
                onClick={handleAppointment}
                disabled={hasAppointment}
              >
                {hasAppointment ? "Appointed" : "Schedule"}
              </Button>
            </div>
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="pt-4">
        <Tabs defaultValue="overview" className="w-full" onValueChange={setActiveTab}>
          <TabsList className="grid grid-cols-3 mb-4">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="experience">Experience</TabsTrigger>
            <TabsTrigger value="contact">Contact</TabsTrigger>
          </TabsList>
          
          <TabsContent value="overview">
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
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="experience">
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold mb-3">Professional Experience</h3>
                <div className="space-y-4">
                  <div className="border-l-2 border-primary/30 pl-4 pb-4">
                    <h4 className="font-medium">Senior Partner</h4>
                    <p className="text-sm text-muted-foreground">Legal Associates LLP, {lawyer.city}</p>
                    <p className="text-xs text-muted-foreground mt-1">2018 - Present</p>
                    <p className="text-sm mt-2">
                      Specializing in {lawyer.domain} cases with a focus on high-profile clients. Managing a team of 4 junior lawyers.
                    </p>
                  </div>
                  
                  <div className="border-l-2 border-primary/30 pl-4 pb-4">
                    <h4 className="font-medium">Associate Lawyer</h4>
                    <p className="text-sm text-muted-foreground">Justice & Partners, {lawyer.city}</p>
                    <p className="text-xs text-muted-foreground mt-1">2011 - 2018</p>
                    <p className="text-sm mt-2">
                      Handled over 100 cases in {lawyer.domain} with a success rate of 85%.
                    </p>
                  </div>
                </div>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold mb-3">Education & Certifications</h3>
                <div className="space-y-4">
                  <div className="border-l-2 border-primary/30 pl-4 pb-4">
                    <h4 className="font-medium">{lawyer.law_school || "National Law University"}</h4>
                    <p className="text-sm text-muted-foreground">Bachelor of Laws (LLB)</p>
                    <p className="text-xs text-muted-foreground mt-1">2007 - 2011</p>
                  </div>
                  
                  <div className="border-l-2 border-primary/30 pl-4">
                    <h4 className="font-medium">Certified Mediator</h4>
                    <p className="text-sm text-muted-foreground">Indian Institute of Arbitration and Mediation</p>
                    <p className="text-xs text-muted-foreground mt-1">2013</p>
                  </div>
                </div>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold mb-2">Case Highlights</h3>
                <div className="bg-muted/30 rounded-md p-3">
                  <ul className="list-disc list-inside space-y-2 text-sm">
                    <li>Successfully represented clients in {Math.round(lawyer.cases_won * 0.2)} high-profile cases</li>
                    <li>Specialized in complex {lawyer.domain} litigation</li>
                    <li>{Math.round(lawyer.cases_won * 0.4)} cases settled out of court</li>
                    <li>{Math.round(lawyer.cases_won * 0.3)} cases won through trial</li>
                  </ul>
                </div>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="contact">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-lg font-semibold mb-3">Contact Information</h3>
                <div className="space-y-3">
                  <div className="flex items-start gap-2">
                    <PhoneIcon size={18} className="text-muted-foreground mt-0.5" />
                    <div>
                      <p className="font-medium">Phone</p>
                      <p className="text-muted-foreground">{lawyer.contact_number || "+91 9876543210"}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-2">
                    <MailIcon size={18} className="text-muted-foreground mt-0.5" />
                    <div>
                      <p className="font-medium">Email</p>
                      <p className="text-muted-foreground">{lawyer.email}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-2">
                    <MapPinIcon size={18} className="text-muted-foreground mt-0.5" />
                    <div>
                      <p className="font-medium">Office Address</p>
                      <p className="text-muted-foreground">
                        Legal Square, Civil Lines<br />
                        {lawyer.city}, 400001<br />
                        India
                      </p>
                    </div>
                  </div>
                </div>
                
                <div className="mt-6">
                  <h3 className="text-lg font-semibold mb-2">Office Hours</h3>
                  <div className="grid grid-cols-2 gap-2 text-sm">
                    <div>
                      <p className="font-medium">Monday - Friday</p>
                      <p className="text-muted-foreground">9:30 AM - 6:30 PM</p>
                    </div>
                    <div>
                      <p className="font-medium">Saturday</p>
                      <p className="text-muted-foreground">10:00 AM - 2:00 PM</p>
                    </div>
                    <div>
                      <p className="font-medium">Sunday</p>
                      <p className="text-muted-foreground">Closed</p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold mb-3">Professional Information</h3>
                <div className="space-y-3">
                  <div>
                    <p className="font-medium">Bar Council Registration</p>
                    <p className="text-muted-foreground">{lawyer.bar_association || "State Bar Council"}</p>
                  </div>
                  
                  <div>
                    <p className="font-medium">Practice Areas</p>
                    <div className="flex flex-wrap gap-2 mt-1">
                      <Badge variant="outline">{lawyer.domain}</Badge>
                      <Badge variant="outline">Litigation</Badge>
                      <Badge variant="outline">Consultation</Badge>
                    </div>
                  </div>
                  
                  <div>
                    <p className="font-medium">Languages</p>
                    <p className="text-muted-foreground">English, Hindi, Marathi</p>
                  </div>
                  
                  <div className="mt-4">
                    <p className="font-medium">Consultation Fees</p>
                    <div className="mt-2 bg-muted/30 p-3 rounded-md">
                      <div className="flex justify-between">
                        <span>Initial Consultation:</span>
                        <span>₹{Math.round(lawyer.fees_per_hearing * 0.5).toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between mt-1">
                        <span>Per Hearing:</span>
                        <span>₹{lawyer.fees_per_hearing.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between mt-1">
                        <span>Case Filing:</span>
                        <span>₹{Math.round(lawyer.fees_per_hearing * 2).toLocaleString()}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
      
      {showScheduler && (
        <CardFooter className="flex-col border-t pt-6">
          <h3 className="text-lg font-semibold mb-4 w-full">Schedule Appointment</h3>
          <AppointmentScheduler 
            lawyer={lawyer} 
            onSchedule={handleScheduleSuccess}
            onCancel={() => setShowScheduler(false)}
          />
        </CardFooter>
      )}
    </Card>
  );
};

export default LawyerProfile;
