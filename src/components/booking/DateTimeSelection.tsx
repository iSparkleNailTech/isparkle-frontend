import { useState } from "react";
import { motion } from "framer-motion";
import { format, addDays, isBefore, startOfDay } from "date-fns";
import { Calendar } from "@/components/ui/calendar";
import { Button } from "@/components/ui/button";
import { ServiceItem } from "@/data/services";
import { cn } from "@/lib/utils";

interface DateTimeSelectionProps {
  service: ServiceItem;
  onSelectDateTime: (date: Date, timeSlot: string) => void;
}

const timeSlots = [
  "09:00",
  "10:00",
  "11:00",
  "12:00",
  "14:00",
  "15:00",
  "16:00",
  "17:00",
];

const DateTimeSelection = ({ service, onSelectDateTime }: DateTimeSelectionProps) => {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);

  const today = startOfDay(new Date());

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

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 20 }}
      className="p-6"
    >
      {/* Service Info */}
      <div className="mb-6 p-4 rounded-lg bg-secondary/50 border border-border/50">
        <h3 className="font-semibold text-foreground text-lg">{service.name}</h3>
        <p className="text-sm text-muted-foreground mt-1">
          {service.duration} · {service.price}
        </p>
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
              <div className="grid grid-cols-2 gap-2">
                {timeSlots.map((time) => (
                  <button
                    key={time}
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
                ))}
              </div>
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
