
import { useState } from "react";
import { useAuth, AppointmentData } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Textarea } from "@/components/ui/textarea";
import { format } from "date-fns";
import { toast } from "sonner";
import { CalendarIcon, ClockIcon } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";

interface AppointmentSchedulerProps {
  lawyer: {
    id: string;
    name: string;
    domain: string;
  };
  onSchedule: (appointmentData: Omit<AppointmentData, 'id'>) => void;
  onCancel: () => void;
}

// Available time slots
const TIME_SLOTS = [
  "10:00 AM", "11:00 AM", "12:00 PM", 
  "2:00 PM", "3:00 PM", "4:00 PM", "5:00 PM"
];

const AppointmentScheduler = ({ lawyer, onSchedule, onCancel }: AppointmentSchedulerProps) => {
  const { scheduleAppointment } = useAuth();
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);
  const [selectedTime, setSelectedTime] = useState<string | undefined>(undefined);
  const [notes, setNotes] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // Get date 2 days from now as minimum bookable date
  const minDate = new Date();
  minDate.setDate(minDate.getDate() + 2);
  
  // Get date 30 days from now as maximum bookable date
  const maxDate = new Date();
  maxDate.setDate(maxDate.getDate() + 30);
  
  const handleSubmit = async () => {
    if (!selectedDate) {
      toast.error("Please select a date");
      return;
    }
    
    if (!selectedTime) {
      toast.error("Please select a time slot");
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      const appointmentData: Omit<AppointmentData, 'id'> = {
        lawyerId: lawyer.id,
        lawyerName: lawyer.name,
        date: format(selectedDate, "yyyy-MM-dd"),
        time: selectedTime,
        status: 'scheduled',
        notes: notes.trim() || undefined,
        domain: lawyer.domain
      };
      
      await scheduleAppointment(appointmentData);
      onSchedule(appointmentData);
    } catch (error) {
      console.error("Failed to schedule appointment:", error);
      toast.error("Failed to schedule appointment. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };
  
  // Filter weekends (Saturday and Sunday) from selectable dates
  const isWeekend = (date: Date) => {
    const day = date.getDay();
    return day === 0 || day === 6;
  };
  
  return (
    <div className="w-full space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <CalendarIcon className="h-5 w-5 text-primary" />
                Select a Date
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="sm:hidden">
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className={cn(
                        "w-full justify-start text-left font-normal",
                        !selectedDate && "text-muted-foreground"
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {selectedDate ? format(selectedDate, "PPP") : <span>Pick a date</span>}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="center">
                    <Calendar
                      mode="single"
                      selected={selectedDate}
                      onSelect={setSelectedDate}
                      disabled={(date) => 
                        date < minDate || 
                        date > maxDate ||
                        isWeekend(date)
                      }
                      className="pointer-events-auto"
                    />
                  </PopoverContent>
                </Popover>
              </div>
              
              <div className="hidden sm:block border rounded-md p-2">
                <Calendar
                  mode="single"
                  selected={selectedDate}
                  onSelect={setSelectedDate}
                  disabled={(date) => 
                    date < minDate || 
                    date > maxDate ||
                    isWeekend(date)
                  }
                  className="pointer-events-auto"
                />
              </div>
              
              <p className="text-sm text-muted-foreground mt-2">
                Note: Weekends are not available for appointments
              </p>
            </CardContent>
          </Card>
        </div>
        
        <div className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <ClockIcon className="h-5 w-5 text-primary" />
                Select a Time Slot
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <RadioGroup 
                value={selectedTime} 
                onValueChange={setSelectedTime}
                className="grid grid-cols-2 gap-2"
              >
                {TIME_SLOTS.map((time) => (
                  <div key={time} className="flex items-center space-x-2 border rounded-md p-2 hover:bg-muted/50 transition-colors">
                    <RadioGroupItem value={time} id={`time-${time}`} />
                    <Label htmlFor={`time-${time}`} className="cursor-pointer w-full">
                      {time}
                    </Label>
                  </div>
                ))}
              </RadioGroup>
              
              <div className="pt-2">
                <Label htmlFor="notes">Notes (Optional)</Label>
                <Textarea
                  id="notes"
                  placeholder="Briefly describe your legal issue"
                  className="mt-2 resize-none"
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  rows={4}
                />
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
      
      <CardFooter className="flex justify-end gap-2 pt-4 px-0">
        <Button variant="outline" onClick={onCancel} disabled={isSubmitting}>
          Cancel
        </Button>
        <Button 
          onClick={handleSubmit} 
          disabled={!selectedDate || !selectedTime || isSubmitting}
          className="min-w-[140px]"
        >
          {isSubmitting ? "Scheduling..." : "Schedule Appointment"}
        </Button>
      </CardFooter>
    </div>
  );
};

export default AppointmentScheduler;
