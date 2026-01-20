import { useState, useMemo } from 'react';
import { format, startOfWeek, addDays, isSameDay, addWeeks, subWeeks, startOfMonth, endOfMonth, addMonths, subMonths, getDay } from 'date-fns';
import { ChevronLeft, ChevronRight, Calendar as CalendarIcon, List, Filter, Settings, Check, X, Clock, ChevronUp } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { mockBookings, Booking, BookingStatus } from '@/data/mockBookings';
import BookingDetailsDialog from './BookingDetailsDialog';
import { useIsMobile } from '@/hooks/use-mobile';

const HOURS = Array.from({ length: 12 }, (_, i) => i + 8); // 8 AM to 7 PM
const WEEKDAYS = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];

const statusConfig: Record<BookingStatus, { label: string; bgClass: string; textClass: string; borderClass: string; icon: typeof Check }> = {
  completed: {
    label: 'Completed',
    bgClass: 'bg-emerald-50',
    textClass: 'text-emerald-700',
    borderClass: 'border-l-emerald-500',
    icon: Check,
  },
  pending: {
    label: 'Scheduled',
    bgClass: 'bg-fuchsia-50',
    textClass: 'text-fuchsia-700',
    borderClass: 'border-l-fuchsia-500',
    icon: Clock,
  },
  cancelled: {
    label: 'Cancelled',
    bgClass: 'bg-rose-50',
    textClass: 'text-rose-700',
    borderClass: 'border-l-rose-500',
    icon: X,
  },
};

const AdminCalendar = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null);
  const [viewMode, setViewMode] = useState<'calendar' | 'list'>('calendar');
  const [selectedDay, setSelectedDay] = useState(new Date());
  const isMobile = useIsMobile();

  const weekStart = startOfWeek(currentDate, { weekStartsOn: 1 });
  const weekDays = Array.from({ length: 7 }, (_, i) => addDays(weekStart, i)); // Full week for mobile
  const desktopDays = Array.from({ length: 5 }, (_, i) => addDays(weekStart, i)); // Mon - Fri for desktop

  const todayBookingsCount = useMemo(() => {
    const today = new Date();
    return mockBookings.filter(b => isSameDay(new Date(b.bookingDate), today)).length;
  }, []);

  const getBookingsForDayAndHour = (day: Date, hour: number): Booking[] => {
    return mockBookings.filter(booking => {
      const bookingDate = new Date(booking.bookingDate);
      const bookingHour = parseInt(booking.bookingTime.split(':')[0], 10);
      return isSameDay(bookingDate, day) && bookingHour === hour;
    });
  };

  const getBookingsForDay = (day: Date): Booking[] => {
    return mockBookings.filter(booking => {
      const bookingDate = new Date(booking.bookingDate);
      return isSameDay(bookingDate, day);
    }).sort((a, b) => a.bookingTime.localeCompare(b.bookingTime));
  };

  const parseTimeToMinutes = (time: string): number => {
    const [hours, minutes] = time.split(':').map(Number);
    return hours * 60 + minutes;
  };

  const parseDurationToMinutes = (duration: string): number => {
    let total = 0;
    const hrMatch = duration.match(/(\d+)\s*hr/);
    const minMatch = duration.match(/(\d+)\s*min/);
    if (hrMatch) total += parseInt(hrMatch[1], 10) * 60;
    if (minMatch) total += parseInt(minMatch[1], 10);
    return total || 60;
  };

  const formatEndTime = (startTime: string, duration: string): string => {
    const startMinutes = parseTimeToMinutes(startTime);
    const durationMinutes = parseDurationToMinutes(duration);
    const endMinutes = startMinutes + durationMinutes;
    const endHours = Math.floor(endMinutes / 60);
    const endMins = endMinutes % 60;
    return `${endHours.toString().padStart(2, '0')}:${endMins.toString().padStart(2, '0')}`;
  };

  const navigateWeek = (direction: 'prev' | 'next') => {
    setCurrentDate(prev => direction === 'prev' ? subWeeks(prev, 1) : addWeeks(prev, 1));
  };

  const goToToday = () => {
    const today = new Date();
    setCurrentDate(today);
    setSelectedDay(today);
  };

  const isToday = (date: Date) => isSameDay(date, new Date());
  const isSelected = (date: Date) => isSameDay(date, selectedDay);

  // Get two days for mobile view (selected day + next day)
  const mobileDays = [selectedDay, addDays(selectedDay, 1)];

  // Mobile month calendar helpers
  const monthStart = startOfMonth(currentDate);
  const monthEnd = endOfMonth(currentDate);
  const startDayOfWeek = getDay(monthStart); // 0 = Sunday
  
  const calendarDays = useMemo(() => {
    const days: (Date | null)[] = [];
    // Add empty slots for days before month starts
    for (let i = 0; i < startDayOfWeek; i++) {
      days.push(null);
    }
    // Add all days of the month
    let current = monthStart;
    while (current <= monthEnd) {
      days.push(current);
      current = addDays(current, 1);
    }
    return days;
  }, [currentDate, monthStart, monthEnd, startDayOfWeek]);

  const navigateMonth = (direction: 'prev' | 'next') => {
    setCurrentDate(prev => direction === 'prev' ? subMonths(prev, 1) : addMonths(prev, 1));
  };

  const hasBookingsOnDay = (day: Date): { pending: boolean; completed: boolean; cancelled: boolean } => {
    const dayBookings = getBookingsForDay(day);
    return {
      pending: dayBookings.some(b => b.status === 'pending'),
      completed: dayBookings.some(b => b.status === 'completed'),
      cancelled: dayBookings.some(b => b.status === 'cancelled'),
    };
  };

  const selectedDayBookings = getBookingsForDay(selectedDay);

  if (isMobile) {
    return (
      <div className="min-h-screen bg-background flex flex-col">
        {/* Month Calendar Header */}
        <div className="bg-primary/90 text-primary-foreground p-4 rounded-b-3xl">
          {/* Month Navigation */}
          <div className="flex items-center justify-between mb-4">
            <Button 
              variant="ghost" 
              size="icon"
              className="text-primary-foreground hover:bg-primary-foreground/20"
              onClick={() => navigateMonth('prev')}
            >
              <ChevronLeft className="h-5 w-5" />
            </Button>
            <button className="flex items-center gap-1 text-lg font-semibold font-body">
              {format(currentDate, 'MMMM')}
              <ChevronUp className="h-4 w-4" />
            </button>
            <Button 
              variant="ghost" 
              size="icon"
              className="text-primary-foreground hover:bg-primary-foreground/20"
              onClick={() => navigateMonth('next')}
            >
              <ChevronRight className="h-5 w-5" />
            </Button>
          </div>

          {/* Weekday Headers */}
          <div className="grid grid-cols-7 mb-2">
            {WEEKDAYS.map((day, idx) => (
              <div key={idx} className="text-center text-sm font-medium text-primary-foreground/70">
                {day}
              </div>
            ))}
          </div>

          {/* Calendar Grid */}
          <div className="grid grid-cols-7 gap-1">
            {calendarDays.map((day, idx) => {
              if (!day) {
                return <div key={idx} className="aspect-square" />;
              }
              const indicators = hasBookingsOnDay(day);
              const isCurrentMonth = day.getMonth() === currentDate.getMonth();
              
              return (
                <button
                  key={idx}
                  onClick={() => setSelectedDay(day)}
                  className={cn(
                    "aspect-square flex flex-col items-center justify-center rounded-full transition-all relative",
                    isSelected(day) && "bg-sky-400 text-white",
                    !isSelected(day) && isToday(day) && "ring-2 ring-sky-400",
                    !isCurrentMonth && "text-primary-foreground/40"
                  )}
                >
                  <span className="text-sm font-medium">{format(day, 'd')}</span>
                  {/* Booking indicators */}
                  {(indicators.pending || indicators.completed || indicators.cancelled) && !isSelected(day) && (
                    <div className="flex gap-0.5 mt-0.5 absolute bottom-1">
                      {indicators.pending && <div className="w-1 h-1 rounded-full bg-amber-400" />}
                      {indicators.completed && <div className="w-1 h-1 rounded-full bg-emerald-400" />}
                      {indicators.cancelled && <div className="w-1 h-1 rounded-full bg-rose-400" />}
                    </div>
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Selected Day Header */}
        <div className="px-4 py-3 border-b">
          <h2 className="text-sm font-medium text-muted-foreground uppercase tracking-wide font-body">
            {format(selectedDay, 'EEE, MMM d')}
          </h2>
        </div>

        {/* Appointments List */}
        <div className="flex-1 overflow-y-auto">
          {selectedDayBookings.length === 0 ? (
            <div className="p-6 text-center text-muted-foreground">
              No appointments scheduled for this day
            </div>
          ) : (
            <div className="divide-y">
              {selectedDayBookings.map(booking => {
                const config = statusConfig[booking.status];
                return (
                  <div
                    key={booking.id}
                    onClick={() => setSelectedBooking(booking)}
                    className={cn(
                      "flex items-stretch cursor-pointer hover:bg-muted/50 transition-colors"
                    )}
                  >
                    {/* Left color bar */}
                    <div className={cn("w-1", config.borderClass.replace('border-l-', 'bg-'))} />
                    
                    {/* Time column */}
                    <div className="py-3 px-3 min-w-[80px]">
                      <div className="text-sm font-medium">{booking.bookingTime}</div>
                      <div className="text-xs text-muted-foreground">
                        {formatEndTime(booking.bookingTime, booking.duration)}
                      </div>
                      <div className={cn("text-xs mt-1", config.textClass)}>
                        {config.label}
                      </div>
                    </div>

                    {/* Booking details */}
                    <div className="flex-1 py-3 pr-4">
                      <div className="font-semibold font-body">{booking.customerName}</div>
                      <div className="text-sm text-muted-foreground">{booking.serviceName}</div>
                      <div className="text-xs text-muted-foreground mt-1">
                        {booking.duration} • ${booking.price}
                      </div>
                    </div>

                    {/* Arrow */}
                    <div className="flex items-center pr-3">
                      <ChevronRight className="h-4 w-4 text-muted-foreground" />
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Mobile Bottom Bar */}
        <div className="bg-background border-t p-3 flex items-center justify-between">
          <Button 
            variant="outline" 
            size="sm" 
            className="rounded-full"
            onClick={goToToday}
          >
            Today
          </Button>
          <div className="flex items-center gap-2">
            <Button 
              variant={viewMode === 'calendar' ? 'secondary' : 'ghost'} 
              size="icon" 
              className="h-10 w-10"
              onClick={() => setViewMode('calendar')}
            >
              <CalendarIcon className="h-5 w-5" />
            </Button>
            <Button 
              variant={viewMode === 'list' ? 'secondary' : 'ghost'} 
              size="icon" 
              className="h-10 w-10"
              onClick={() => setViewMode('list')}
            >
              <List className="h-5 w-5" />
            </Button>
          </div>
        </div>

        <BookingDetailsDialog
          booking={selectedBooking}
          onClose={() => setSelectedBooking(null)}
        />
      </div>
    );
  }

  // Desktop View (existing)
  return (
    <div className="min-h-screen bg-muted/30">
      <div className="max-w-[1400px] mx-auto p-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2 bg-background rounded-full p-1 border">
            <Button
              variant={viewMode === 'list' ? 'secondary' : 'ghost'}
              size="sm"
              className="rounded-full gap-2"
              onClick={() => setViewMode('list')}
            >
              <List className="h-4 w-4" />
              List
            </Button>
            <Button
              variant={viewMode === 'calendar' ? 'secondary' : 'ghost'}
              size="sm"
              className="rounded-full gap-2"
              onClick={() => setViewMode('calendar')}
            >
              <CalendarIcon className="h-4 w-4" />
              Calendar
            </Button>
          </div>

          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <Button variant="outline" size="icon" className="rounded-lg" onClick={() => navigateWeek('prev')}>
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="sm" className="rounded-lg gap-2">
                <CalendarIcon className="h-4 w-4" />
                {format(weekStart, 'MMMM d, yyyy')}
              </Button>
              <Button variant="outline" size="icon" className="rounded-lg" onClick={() => navigateWeek('next')}>
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>

            <div className="text-lg font-medium">
              <span className="text-3xl font-bold">{todayBookingsCount}</span>
              <span className="text-muted-foreground ml-2">appointments today</span>
            </div>

            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" className="gap-2">
                <Filter className="h-4 w-4" />
                Filter
              </Button>
              <Button variant="outline" size="icon">
                <Settings className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>

        {/* Calendar Grid */}
        <div className="bg-background rounded-xl border overflow-hidden">
          {/* Header Row */}
          <div className="grid grid-cols-[80px_repeat(5,1fr)] border-b">
            <div className="p-4 text-sm text-muted-foreground font-medium">
              GMT+0
            </div>
            {desktopDays.map((day, idx) => (
              <div
                key={idx}
                className={cn(
                  "p-4 text-center border-l",
                  isToday(day) && "bg-primary/5"
                )}
              >
                <div className={cn(
                  "text-sm font-medium uppercase",
                  isToday(day) ? "text-primary" : "text-muted-foreground"
                )}>
                  {format(day, 'EEE d')}
                </div>
              </div>
            ))}
          </div>

          {/* Time Rows */}
          <div className="max-h-[calc(100vh-280px)] overflow-y-auto">
            {HOURS.map(hour => (
              <div key={hour} className="grid grid-cols-[80px_repeat(5,1fr)] min-h-[100px]">
                <div className="p-4 text-sm text-muted-foreground font-medium border-b flex items-start justify-end pr-4">
                  {format(new Date().setHours(hour, 0), 'HH:mm')}
                </div>
                {desktopDays.map((day, dayIdx) => {
                  const bookings = getBookingsForDayAndHour(day, hour);
                  return (
                    <div
                      key={dayIdx}
                      className={cn(
                        "border-l border-b p-1 relative",
                        isToday(day) && "bg-primary/5"
                      )}
                    >
                      {bookings.map(booking => {
                        const config = statusConfig[booking.status];
                        const StatusIcon = config.icon;
                        return (
                          <div
                            key={booking.id}
                            onClick={() => setSelectedBooking(booking)}
                            className={cn(
                              "rounded-lg p-3 mb-1 cursor-pointer border-l-4 transition-all hover:shadow-md",
                              config.bgClass,
                              config.borderClass
                            )}
                          >
                            <div className="text-xs text-muted-foreground mb-1">
                              {booking.bookingTime} - {formatEndTime(booking.bookingTime, booking.duration)}
                            </div>
                            <div className="font-medium text-sm text-foreground mb-0.5">
                              {booking.customerName}
                            </div>
                            <div className="text-xs text-muted-foreground mb-2">
                              {booking.serviceName}
                            </div>
                            <div className={cn(
                              "inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium",
                              config.bgClass,
                              config.textClass
                            )}>
                              <StatusIcon className="h-3 w-3" />
                              {config.label}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  );
                })}
              </div>
            ))}
          </div>
        </div>
      </div>

      <BookingDetailsDialog
        booking={selectedBooking}
        onClose={() => setSelectedBooking(null)}
      />
    </div>
  );
};

export default AdminCalendar;
