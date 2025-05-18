
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CalendarIcon, ClockIcon, UserIcon, FileTextIcon } from "lucide-react";
import { useAuth, AppointmentData } from "@/contexts/AuthContext";
import { format } from "date-fns";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { toast } from "sonner";

const LawyerAppointments = () => {
  const { user } = useAuth();
  const [selectedAppointment, setSelectedAppointment] = useState<AppointmentData | null>(null);
  const [actionType, setActionType] = useState<'complete' | 'cancel' | null>(null);
  
  // Mock appointments data - in a real app, this would come from the backend
  const mockAppointments: AppointmentData[] = [
    {
      id: "appt1",
      lawyerId: user?.id || "",
      lawyerName: user?.name || "",
      date: "2025-05-25",
      time: "10:00 AM",
      status: "scheduled",
      notes: "Initial consultation about corporate structuring",
      domain: "Corporate Law",
      clientName: "Rahul Sharma",
      clientEmail: "rahul@example.com",
      clientPhone: "+91 9876543210"
    },
    {
      id: "appt2",
      lawyerId: user?.id || "",
      lawyerName: user?.name || "",
      date: "2025-05-26",
      time: "2:00 PM",
      status: "scheduled",
      notes: "Follow-up on property dispute case",
      domain: "Real Estate Law",
      clientName: "Priya Patel",
      clientEmail: "priya@example.com",
      clientPhone: "+91 9876543211"
    },
    {
      id: "appt3",
      lawyerId: user?.id || "",
      lawyerName: user?.name || "",
      date: "2025-05-20",
      time: "11:00 AM",
      status: "completed",
      notes: "Contract review for new business partnership",
      domain: "Corporate Law",
      clientName: "Amit Kumar",
      clientEmail: "amit@example.com",
      clientPhone: "+91 9876543212"
    },
    {
      id: "appt4",
      lawyerId: user?.id || "",
      lawyerName: user?.name || "",
      date: "2025-05-19",
      time: "3:00 PM",
      status: "cancelled",
      notes: "Consultation on intellectual property rights",
      domain: "Intellectual Property Law",
      clientName: "Sneha Gupta",
      clientEmail: "sneha@example.com",
      clientPhone: "+91 9876543213"
    }
  ];
  
  // Filter appointments by status
  const upcomingAppointments = mockAppointments.filter(appt => appt.status === "scheduled");
  const pastAppointments = mockAppointments.filter(appt => appt.status === "completed" || appt.status === "cancelled");
  
  const formatAppointmentDate = (dateString: string) => {
    try {
      return format(new Date(dateString), "MMMM d, yyyy");
    } catch (error) {
      return dateString;
    }
  };
  
  const handleCompleteAppointment = () => {
    // In a real app, this would update the appointment status in the backend
    toast.success("Appointment marked as completed");
    setSelectedAppointment(null);
    setActionType(null);
  };
  
  const handleCancelAppointment = () => {
    // In a real app, this would update the appointment status in the backend
    toast.success("Appointment cancelled");
    setSelectedAppointment(null);
    setActionType(null);
  };
  
  return (
    <div className="space-y-6">
      <Tabs defaultValue="upcoming" className="w-full">
        <TabsList>
          <TabsTrigger value="upcoming">Upcoming ({upcomingAppointments.length})</TabsTrigger>
          <TabsTrigger value="past">Past Appointments</TabsTrigger>
        </TabsList>
        
        <TabsContent value="upcoming">
          <div className="grid grid-cols-1 gap-4 mt-4">
            {upcomingAppointments.length === 0 ? (
              <Card className="bg-muted/30">
                <CardContent className="pt-6 text-center">
                  <p className="text-muted-foreground">No upcoming appointments</p>
                </CardContent>
              </Card>
            ) : (
              upcomingAppointments.map((appointment) => (
                <Card key={appointment.id} className="overflow-hidden">
                  <CardHeader className="pb-2">
                    <div className="flex justify-between items-start flex-wrap gap-2">
                      <div>
                        <CardTitle className="text-lg">{appointment.clientName}</CardTitle>
                        <CardDescription className="flex flex-col">
                          <span>{appointment.clientEmail}</span>
                          <span>{appointment.clientPhone}</span>
                        </CardDescription>
                      </div>
                      <Badge>Scheduled</Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-y-3">
                      <div className="flex items-center gap-2 text-sm">
                        <CalendarIcon size={14} className="text-primary" />
                        <span>{formatAppointmentDate(appointment.date)}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <ClockIcon size={14} className="text-primary" />
                        <span>{appointment.time}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <UserIcon size={14} className="text-primary" />
                        <span>{appointment.domain}</span>
                      </div>
                      {appointment.notes && (
                        <div className="flex gap-2 text-sm md:col-span-2">
                          <FileTextIcon size={14} className="text-primary mt-1" />
                          <span className="text-muted-foreground">{appointment.notes}</span>
                        </div>
                      )}
                    </div>
                    
                    <div className="flex flex-wrap gap-2 mt-4">
                      <Button 
                        size="sm" 
                        onClick={() => {
                          setSelectedAppointment(appointment);
                          setActionType('complete');
                        }}
                      >
                        Mark as Completed
                      </Button>
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => {
                          setSelectedAppointment(appointment);
                          setActionType('cancel');
                        }}
                      >
                        Cancel Appointment
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))
            )}
          </div>
        </TabsContent>
        
        <TabsContent value="past">
          <div className="grid grid-cols-1 gap-4 mt-4">
            {pastAppointments.length === 0 ? (
              <Card className="bg-muted/30">
                <CardContent className="pt-6 text-center">
                  <p className="text-muted-foreground">No past appointments</p>
                </CardContent>
              </Card>
            ) : (
              pastAppointments.map((appointment) => (
                <Card key={appointment.id} className="bg-muted/20">
                  <CardHeader className="pb-2">
                    <div className="flex justify-between items-start flex-wrap gap-2">
                      <div>
                        <CardTitle className="text-lg">{appointment.clientName}</CardTitle>
                        <CardDescription className="flex flex-col">
                          <span>{appointment.clientEmail}</span>
                          <span>{appointment.clientPhone}</span>
                        </CardDescription>
                      </div>
                      <Badge variant={appointment.status === 'completed' ? "default" : "destructive"}>
                        {appointment.status === 'completed' ? 'Completed' : 'Cancelled'}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-y-3">
                      <div className="flex items-center gap-2 text-sm">
                        <CalendarIcon size={14} className="text-muted-foreground" />
                        <span className="text-muted-foreground">{formatAppointmentDate(appointment.date)}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <ClockIcon size={14} className="text-muted-foreground" />
                        <span className="text-muted-foreground">{appointment.time}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <UserIcon size={14} className="text-muted-foreground" />
                        <span className="text-muted-foreground">{appointment.domain}</span>
                      </div>
                      {appointment.notes && (
                        <div className="flex gap-2 text-sm md:col-span-2">
                          <FileTextIcon size={14} className="text-muted-foreground mt-1" />
                          <span className="text-muted-foreground">{appointment.notes}</span>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))
            )}
          </div>
        </TabsContent>
      </Tabs>
      
      <AlertDialog 
        open={!!selectedAppointment && !!actionType} 
        onOpenChange={(open) => !open && setSelectedAppointment(null)}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>
              {actionType === 'complete' ? 'Complete Appointment' : 'Cancel Appointment'}
            </AlertDialogTitle>
            <AlertDialogDescription>
              {actionType === 'complete' 
                ? `Are you sure you want to mark the appointment with ${selectedAppointment?.clientName} on ${selectedAppointment && formatAppointmentDate(selectedAppointment.date)} as completed?`
                : `Are you sure you want to cancel the appointment with ${selectedAppointment?.clientName} on ${selectedAppointment && formatAppointmentDate(selectedAppointment.date)}?`
              }
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>No, go back</AlertDialogCancel>
            <AlertDialogAction 
              onClick={actionType === 'complete' ? handleCompleteAppointment : handleCancelAppointment}
            >
              Yes, {actionType === 'complete' ? 'complete' : 'cancel'} it
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default LawyerAppointments;
