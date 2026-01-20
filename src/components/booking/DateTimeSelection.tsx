import { useState } from "react";
import { motion } from "framer-motion";
import { format, isBefore, startOfDay } from "date-fns";
import { Calendar } from "@/components/ui/calendar";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { api } from "@/integrations/backend/api";
import { cn } from "@/lib/utils";

interface DateTimeSelectionProps {
  serviceCategoryId: string;
  packageId: string;
  packageName: string;
  onSelectDateTime: (date: Date, timeSlot: string) => void;
}

const DateTimeSelection = ({
  serviceCategoryId,
  packageId,
  packageName,
  onSelectDateTime,
}: DateTimeSelectionProps) => {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);

  const today = startOfDay(new Date());

  // Fetch availability when date is selected
  const dateString = selectedDate ? format(selectedDate, "yyyy-MM-dd") : null;
  const { data: availabilityData, isLoading: isLoadingAvailability } = useQuery({
    queryKey: ["availability", serviceCategoryId, packageId, dateString],
    queryFn: () => {
      if (!dateString) throw new Error("Date is required");
      return api.getAvailability(serviceCategoryId, packageId, dateString);
    },
    enabled: !!dateString && !!selectedDate,
  });

  const handleDateSelect = (date: Date | undefined) => {
    setSelectedDate(date);
    setSelectedTime(null);
  };

  const handleTimeSelect = (time: string) => {
    setSelectedTime(time);
  };

  const handleContinue = () => {
    if (selectedDate && selectedTime) {
      onSelectDateTime(selectedDate, selectedTime);
    }
  };

  // Format time slots from ISO strings to HH:mm
  const formatTimeSlot = (isoString: string): string => {
    const date = new Date(isoString);
    return format(date, "HH:mm");
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 20 }}
      className="p-6"
    >
      {/* Service Info */}
      <div className="mb-6 p-4 rounded-lg bg-card border border-border/50">
        <h3 className="font-body font-semibold text-foreground text-lg">{packageName}</h3>
      </div>

      {/* Calendar and Time Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Calendar */}
        <div>
          <Calendar
            mode="single"
            selected={selectedDate}
            onSelect={handleDateSelect}
            disabled={(date) => isBefore(date, today)}
            className={cn("rounded-lg border border-border/50 p-3 pointer-events-auto")}
          />
        </div>

        {/* Time Slots */}
        <div>
          {selectedDate ? (
            <>
              <h4 className="font-medium text-foreground mb-4">
                {format(selectedDate, "EEEE d MMMM")}
              </h4>
              {isLoadingAvailability ? (
                <div className="flex items-center justify-center py-8">
                  <Loader2 className="w-6 h-6 animate-spin text-primary" />
                </div>
              ) : availabilityData?.slots && availabilityData.slots.length > 0 ? (
                <div className="grid grid-cols-2 gap-2">
                  {availabilityData.slots.map((slot) => {
                    const time = formatTimeSlot(slot.startTime);
                    return (
                      <button
                        key={slot.startTime}
                        onClick={() => handleTimeSelect(time)}
                        className={cn(
                          "py-3 px-4 rounded-lg border transition-all text-center font-medium",
                          selectedTime === time
                            ? "border-primary bg-primary/10 text-primary"
                            : "border-border/50 bg-card text-foreground hover:border-primary/50"
                        )}
                      >
                        {time}
                      </button>
                    );
                  })}
                </div>
              ) : (
                <div className="text-center py-8 text-muted-foreground">
                  <p>No available time slots for this date.</p>
                  <p className="text-sm mt-2">Please select another date.</p>
                </div>
              )}
            </>
          ) : (
            <div className="flex items-center justify-center h-full text-muted-foreground">
              Select a date to see available times
            </div>
          )}
        </div>
      </div>

      {/* Continue Button */}
      {selectedDate && selectedTime && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-6 pt-4 border-t border-border/50"
        >
          <Button
            variant="gold"
            size="lg"
            className="w-full"
            onClick={handleContinue}
          >
            Continue
          </Button>
        </motion.div>
      )}
    </motion.div>
  );
};

export default DateTimeSelection;
