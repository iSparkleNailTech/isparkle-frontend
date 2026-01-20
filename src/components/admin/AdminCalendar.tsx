import { useState, useMemo } from 'react';
import { format, startOfWeek, startOfMonth, endOfMonth, addDays, isSameDay, isSameMonth, addMonths, subMonths, eachWeekOfInterval, setMonth, setYear, getMonth, getYear } from 'date-fns';
import { ChevronLeft, ChevronRight, Calendar as CalendarIcon, List, Filter, Settings, Check, X, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { mockBookings, Booking, BookingStatus } from '@/data/mockBookings';
import BookingDetailsDialog from './BookingDetailsDialog';
import { useIsMobile } from '@/hooks/use-mobile';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

const HOURS = Array.from({ length: 12 }, (_, i) => i + 8); // 8 AM to 7 PM

const MONTHS = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'
];

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
  const [monthPickerOpen, setMonthPickerOpen] = useState(false);
  const isMobile = useIsMobile();

  const weekStart = startOfWeek(currentDate, { weekStartsOn: 1 });
  const weekDays = Array.from({ length: 7 }, (_, i) => addDays(weekStart, i)); // Full week for mobile
  const desktopDays = Array.from({ length: 5 }, (_, i) => addDays(weekStart, i)); // Mon - Fri for desktop

  // Get all weeks in the current month for mobile
  const weeksInMonth = useMemo(() => {
    const monthStart = startOfMonth(currentDate);
    const monthEnd = endOfMonth(currentDate);
    return eachWeekOfInterval({ start: monthStart, end: monthEnd }, { weekStartsOn: 1 });
  }, [currentDate]);

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

  const navigateMonth = (direction: 'prev' | 'next') => {
    setCurrentDate(prev => direction === 'prev' ? subMonths(prev, 1) : addMonths(prev, 1));
  };

  const navigateWeek = (direction: 'prev' | 'next') => {
    setCurrentDate(prev => direction === 'prev' ? addDays(prev, -7) : addDays(prev, 7));
  };

  const selectMonth = (monthIndex: number) => {
    setCurrentDate(prev => setMonth(prev, monthIndex));
    setMonthPickerOpen(false);
  };

  const goToToday = () => {
    const today = new Date();
    setCurrentDate(today);
    setSelectedDay(today);
  };

  const isToday = (date: Date) => isSameDay(date, new Date());
  const isSelected = (date: Date) => isSameDay(date, selectedDay);
  const isCurrentMonth = (date: Date) => isSameMonth(date, currentDate);

  // Get two days for mobile view (selected day + next day)
  const mobileDays = [selectedDay, addDays(selectedDay, 1)];

  if (isMobile) {
    return (
      <div className="h-screen bg-background flex flex-col overflow-hidden">
        {/* Mobile Header */}
        <div className="bg-background px-3 py-2 border-b flex-shrink-0">
          <div className="flex items-center justify-between mb-2">
            <Popover open={monthPickerOpen} onOpenChange={setMonthPickerOpen}>
              <PopoverTrigger asChild>
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="rounded-full gap-1"
                >
                  {format(currentDate, 'MMMM yyyy')}
                  <ChevronRight className={cn("h-4 w-4 transition-transform", monthPickerOpen && "rotate-90")} />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-64 p-3" align="start">
                <div className="flex items-center justify-between mb-3">
                  <Button variant="ghost" size="icon" onClick={() => setCurrentDate(prev => setYear(prev, getYear(prev) - 1))}>
                    <ChevronLeft className="h-4 w-4" />
                  </Button>
                  <span className="font-semibold">{getYear(currentDate)}</span>
                  <Button variant="ghost" size="icon" onClick={() => setCurrentDate(prev => setYear(prev, getYear(prev) + 1))}>
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </div>
                <div className="grid grid-cols-3 gap-2">
                  {MONTHS.map((month, idx) => (
                    <Button
                      key={month}
                      variant={getMonth(currentDate) === idx ? "default" : "ghost"}
                      size="sm"
                      className="text-xs"
                      onClick={() => selectMonth(idx)}
                    >
                      {month.slice(0, 3)}
                    </Button>
                  ))}
                </div>
              </PopoverContent>
            </Popover>
            <div className="flex items-center gap-2">
              <Button 
                variant="outline" 
                size="sm" 
                className="rounded-full"
                onClick={goToToday}
              >
                Today
              </Button>
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <Filter className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <Settings className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* All Weeks in Month Selector - No Scroll */}
          <div className="space-y-1">
            {weeksInMonth.map((weekStart, weekIdx) => {
              const days = Array.from({ length: 7 }, (_, i) => addDays(weekStart, i));
              return (
                <div key={weekIdx} className="flex justify-between">
                  {days.map((day, idx) => {
                    const dayOfWeek = format(day, 'EEEEE');
                    const dayNum = format(day, 'd');
                    const inMonth = isCurrentMonth(day);
                    return (
                      <button
                        key={idx}
                        onClick={() => setSelectedDay(day)}
                        className={cn(
                          "flex flex-col items-center py-0.5 px-1.5 rounded-full transition-all min-w-[32px]",
                          isSelected(day) && "bg-foreground text-background",
                          isToday(day) && !isSelected(day) && "text-rose-500 font-bold",
                          !inMonth && "opacity-40"
                        )}
                      >
                        <span className="text-[9px] font-medium leading-tight">{dayOfWeek}</span>
                        <span className={cn(
                          "text-xs font-semibold leading-tight",
                          isToday(day) && !isSelected(day) && "text-rose-500"
                        )}>
                          {dayNum}
                        </span>
                      </button>
                    );
                  })}
                </div>
              );
            })}
          </div>
        </div>

        {/* Mobile Calendar Grid - 2 Day View */}
        <div className="flex-1 overflow-hidden flex flex-col min-h-0">
          {/* Day Headers */}
          <div className="grid grid-cols-[50px_1fr_1fr] border-b bg-muted/30 flex-shrink-0">
            <div className="p-2 text-xs text-muted-foreground"></div>
            {mobileDays.map((day, idx) => (
              <div key={idx} className="p-3 text-center border-l">
                <div className="text-sm font-medium">
                  {format(day, 'EEE')} – {format(day, 'd MMM')}
                </div>
              </div>
            ))}
          </div>

          {/* Time Grid - Scrollable */}
          <div className="flex-1 overflow-y-auto min-h-0">
            {HOURS.map(hour => {
              const bookingsDay1 = getBookingsForDayAndHour(mobileDays[0], hour);
              const bookingsDay2 = getBookingsForDayAndHour(mobileDays[1], hour);

              return (
                <div key={hour} className="grid grid-cols-[50px_1fr_1fr] min-h-[48px]">
                  <div className="p-2 text-xs text-muted-foreground font-medium border-b flex items-start justify-end pr-2 pt-1">
                    {format(new Date().setHours(hour, 0), 'HH:mm')}
                  </div>
                  {mobileDays.map((day, dayIdx) => {
                    const bookings = dayIdx === 0 ? bookingsDay1 : bookingsDay2;
                    return (
                      <div
                        key={dayIdx}
                        className={cn(
                          "border-l border-b p-1 relative",
                          isToday(day) && "bg-muted/30"
                        )}
                      >
                        {bookings.map(booking => {
                          const config = statusConfig[booking.status];
                          return (
                            <div
                              key={booking.id}
                              onClick={() => setSelectedBooking(booking)}
                              className={cn(
                                "rounded p-1 cursor-pointer border-l-4 transition-all h-full min-h-[40px]",
                                config.bgClass,
                                config.borderClass
                              )}
                            >
                              <div className={cn("font-semibold text-sm mb-1", config.textClass)}>
                                {booking.serviceName}
                              </div>
                              <div className="flex items-center gap-1 text-xs text-muted-foreground">
                                <Clock className="h-3 w-3" />
                                {booking.bookingTime} - {formatEndTime(booking.bookingTime, booking.duration)}
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    );
                  })}
                </div>
              );
            })}
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
