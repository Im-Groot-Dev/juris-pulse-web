
import { useState } from "react";
import { useAuth, AppointmentData } from "@/contexts/AuthContext";
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CalendarIcon, MapPinIcon, ClockIcon, FileTextIcon } from "lucide-react";
import { format } from "date-fns";
import { toast } from "sonner";
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

const UserAppointments = () => {
  const { getUserAppointments, cancelAppointment } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [selectedAppointment, setSelectedAppointment] = useState<AppointmentData | null>(null);
  const appointments = getUserAppointments();
  
  const handleCancelAppointment = async () => {
    if (!selectedAppointment) return;
    
    setIsLoading(true);
    try {
      await cancelAppointment(selectedAppointment.id);
      setSelectedAppointment(null);
    } catch (error) {
      console.error("Failed to cancel appointment:", error);
    } finally {
      setIsLoading(false);
    }
  };
  
  const formatAppointmentDate = (dateString: string) => {
    try {
      return format(new Date(dateString), "MMMM d, yyyy");
    } catch (error) {
      return dateString;
    }
  };
  
  // Group appointments by status
  const scheduledAppointments = appointments.filter(
    appointment => appointment.status === 'scheduled'
  );
  
  const pastAppointments = appointments.filter(
    appointment => appointment.status === 'completed' || appointment.status === 'cancelled'
  );
  
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Your Appointments</h2>
      
      {appointments.length === 0 ? (
        <Card className="bg-muted/30">
          <CardContent className="pt-6 text-center">
            <p className="text-muted-foreground">You don't have any appointments yet.</p>
          </CardContent>
        </Card>
      ) : (
        <>
          {scheduledAppointments.length > 0 && (
            <div>
              <h3 className="text-lg font-semibold mb-4">Upcoming Appointments</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {scheduledAppointments.map((appointment) => (
                  <Card key={appointment.id} className="bg-card/50 hover:shadow-md transition-shadow">
                    <CardHeader className="pb-2">
                      <div className="flex justify-between items-start">
                        <div>
                          <CardTitle className="text-lg">{appointment.lawyerName}</CardTitle>
                          <CardDescription>{appointment.domain}</CardDescription>
                        </div>
                        <Badge>Scheduled</Badge>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        <div className="flex items-center gap-2 text-sm">
                          <CalendarIcon size={14} className="text-primary" />
                          <span>{formatAppointmentDate(appointment.date)}</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm">
                          <ClockIcon size={14} className="text-primary" />
                          <span>{appointment.time}</span>
                        </div>
                        {appointment.notes && (
                          <div className="flex gap-2 text-sm">
                            <FileTextIcon size={14} className="text-primary mt-1" />
                            <span className="text-muted-foreground">{appointment.notes}</span>
                          </div>
                        )}
                        <div className="pt-2">
                          <Button 
                            variant="destructive" 
                            size="sm"
                            onClick={() => setSelectedAppointment(appointment)}
                          >
                            Cancel Appointment
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          )}
          
          {pastAppointments.length > 0 && (
            <div className="mt-8">
              <h3 className="text-lg font-semibold mb-4">Past Appointments</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {pastAppointments.map((appointment) => (
                  <Card key={appointment.id} className="bg-muted/20">
                    <CardHeader className="pb-2">
                      <div className="flex justify-between items-start">
                        <div>
                          <CardTitle className="text-lg">{appointment.lawyerName}</CardTitle>
                          <CardDescription>{appointment.domain}</CardDescription>
                        </div>
                        <Badge variant={appointment.status === 'completed' ? "default" : "destructive"}>
                          {appointment.status === 'completed' ? 'Completed' : 'Cancelled'}
                        </Badge>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        <div className="flex items-center gap-2 text-sm">
                          <CalendarIcon size={14} className="text-muted-foreground" />
                          <span className="text-muted-foreground">{formatAppointmentDate(appointment.date)}</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm">
                          <ClockIcon size={14} className="text-muted-foreground" />
                          <span className="text-muted-foreground">{appointment.time}</span>
                        </div>
                        {appointment.notes && (
                          <div className="flex gap-2 text-sm">
                            <FileTextIcon size={14} className="text-muted-foreground mt-1" />
                            <span className="text-muted-foreground">{appointment.notes}</span>
                          </div>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          )}
        </>
      )}
      
      <AlertDialog open={!!selectedAppointment} onOpenChange={(open) => !open && setSelectedAppointment(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Cancel Appointment</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to cancel your appointment with {selectedAppointment?.lawyerName} on {selectedAppointment && formatAppointmentDate(selectedAppointment.date)} at {selectedAppointment?.time}?
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>No, keep appointment</AlertDialogCancel>
            <AlertDialogAction onClick={handleCancelAppointment} disabled={isLoading}>
              Yes, cancel appointment
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default UserAppointments;
