
import { useState } from "react";
import { useAuth, AppointmentData } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Textarea } from "@/components/ui/textarea";
import { format } from "date-fns";
import { toast } from "sonner";

interface AppointmentSchedulerProps {
  lawyer: {
    id: string;
    name: string;
    domain: string;
  };
  onSchedule: (appointmentData: Omit<AppointmentData, 'id'>) => void;
  onCancel: () => void;
}

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
          <div>
            <Label>Select a Date</Label>
            <div className="mt-2 border rounded-md p-2">
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
          </div>
        </div>
        
        <div className="space-y-4">
          <div>
            <Label>Select a Time Slot</Label>
            <RadioGroup 
              value={selectedTime} 
              onValueChange={setSelectedTime}
              className="mt-2 grid grid-cols-2 gap-2"
            >
              {TIME_SLOTS.map((time) => (
                <div key={time} className="flex items-center space-x-2">
                  <RadioGroupItem value={time} id={`time-${time}`} />
                  <Label htmlFor={`time-${time}`} className="cursor-pointer">
                    {time}
                  </Label>
                </div>
              ))}
            </RadioGroup>
          </div>
          
          <div>
            <Label htmlFor="notes">Notes (Optional)</Label>
            <Textarea
              id="notes"
              placeholder="Briefly describe your legal issue"
              className="mt-2"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
            />
          </div>
        </div>
      </div>
      
      <div className="flex justify-end gap-2">
        <Button variant="outline" onClick={onCancel}>
          Cancel
        </Button>
        <Button 
          onClick={handleSubmit} 
          disabled={!selectedDate || !selectedTime || isSubmitting}
        >
          {isSubmitting ? "Scheduling..." : "Schedule Appointment"}
        </Button>
      </div>
    </div>
  );
};

export default AppointmentScheduler;
