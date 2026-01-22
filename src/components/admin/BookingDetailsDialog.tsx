import { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { User, Mail, Phone, Clock, Calendar, Check, X } from 'lucide-react';
import { Booking, BookingStatus } from '@/data/mockBookings';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';
import { api } from '@/integrations/backend/api';
import { useToast } from '@/hooks/use-toast';

interface BookingDetailsDialogProps {
  booking: Booking | null;
  onClose: () => void;
  onStatusUpdate?: () => void;
}

const statusConfig: Record<BookingStatus, { label: string; variant: 'default' | 'secondary' | 'destructive' | 'outline'; className: string }> = {
  completed: {
    label: 'Completed',
    variant: 'default',
    className: 'bg-emerald-100 text-emerald-700 hover:bg-emerald-100',
  },
  pending: {
    label: 'Pending',
    variant: 'secondary',
    className: 'bg-sky-100 text-sky-700 hover:bg-sky-100',
  },
  cancelled: {
    label: 'Cancelled',
    variant: 'destructive',
    className: 'bg-rose-100 text-rose-700 hover:bg-rose-100',
  },
};

const BookingDetailsDialog = ({ booking, onClose, onStatusUpdate }: BookingDetailsDialogProps) => {
  const [currentBooking, setCurrentBooking] = useState<Booking | null>(booking);
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  // Update current booking when prop changes
  useEffect(() => {
    setCurrentBooking(booking);
  }, [booking]);

  if (!currentBooking) return null;

  const config = statusConfig[currentBooking.status];

  const handleStatusUpdate = async (status: 'completed' | 'cancelled') => {
    if (!currentBooking) return;

    setLoading(true);
    try {
      const response = await api.updateBookingStatus(currentBooking.id, status);
      setCurrentBooking(response.booking);
      toast({
        title: 'Success',
        description: `Booking ${status === 'completed' ? 'completed' : 'cancelled'} successfully`,
      });
      if (onStatusUpdate) {
        onStatusUpdate();
      }
    } catch (error: any) {
      console.error('Failed to update booking status:', error);
      toast({
        title: 'Error',
        description: error instanceof Error ? error.message : 'Failed to update booking status',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={!!currentBooking} onOpenChange={onClose}>
      <DialogContent className="max-w-[360px] md:max-w-[420px] font-body p-0 gap-0">
        <DialogHeader className="p-3 pb-2 pr-10">
          <div className="flex items-center justify-between">
            <DialogTitle className="text-sm font-semibold font-body">Booking Details</DialogTitle>
            <Badge className={cn("font-medium text-[10px] px-1.5 py-0.5", config.className)}>
              {config.label}
            </Badge>
          </div>
        </DialogHeader>

        <div className="px-3 pb-3 space-y-3">
          {/* Service Breakdown */}
          <div>
            <h3 className="text-xs text-muted-foreground mb-1.5 font-body">
              Service Breakdown
            </h3>
            <div className="border border-border rounded-md overflow-hidden">
              <div className="flex justify-between items-center px-3 py-2 border-b border-border">
              <span className="text-xs text-muted-foreground font-body">Package</span>
                <span className="text-xs font-body">{currentBooking.serviceCategory}</span>
              </div>
              <div className="flex justify-between items-center px-3 py-2 border-b border-border">
                <span className="text-xs text-muted-foreground font-body">Service</span>
                <span className="text-xs font-body">{currentBooking.serviceName}</span>
              </div>
              <div className="flex justify-between items-center px-3 py-2 border-b border-border">
                <span className="text-xs text-muted-foreground font-body">Duration</span>
                <span className="text-xs font-body">{currentBooking.duration}</span>
              </div>
              <div className="flex justify-between items-center px-3 py-2 bg-muted/30">
                <span className="text-xs font-medium font-body">Price</span>
                <span className="text-xs font-semibold text-foreground font-body">{currentBooking.price}</span>
              </div>
            </div>
          </div>

          {/* Contact Details */}
          <div>
            <h3 className="text-xs text-muted-foreground mb-1.5 font-body">
              Contact Details
            </h3>
            <div className="border border-border rounded-md p-3 space-y-2.5">
              <div className="flex items-center gap-2.5">
                <div className="w-7 h-7 rounded-md bg-muted flex items-center justify-center flex-shrink-0">
                  <User className="h-3 w-3 text-muted-foreground" />
                </div>
                <div>
                  <p className="text-[10px] text-muted-foreground font-body">Customer</p>
                  <p className="text-xs font-body">{currentBooking.customerName}</p>
                </div>
              </div>

              <div className="flex gap-3">
                <div className="flex items-center gap-2.5 flex-1">
                  <div className="w-7 h-7 rounded-md bg-muted flex items-center justify-center flex-shrink-0">
                    <Phone className="h-3 w-3 text-muted-foreground" />
                  </div>
                  <div>
                    <p className="text-[10px] text-muted-foreground font-body">Phone</p>
                    <p className="text-xs font-body">{currentBooking.customerPhone}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2.5 flex-1">
                  <div className="w-7 h-7 rounded-md bg-muted flex items-center justify-center flex-shrink-0">
                    <Mail className="h-3 w-3 text-muted-foreground" />
                  </div>
                  <div>
                    <p className="text-[10px] text-muted-foreground font-body">Email</p>
                    <p className="text-xs font-body truncate max-w-[100px]">{currentBooking.customerEmail}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Appointment Details */}
          <div>
            <h3 className="text-xs text-muted-foreground mb-1.5 font-body">
              Appointment
            </h3>
            <div className="border border-border rounded-md p-3">
              <div className="flex gap-3">
                <div className="flex items-center gap-2.5 flex-1">
                  <div className="w-7 h-7 rounded-md bg-muted flex items-center justify-center flex-shrink-0">
                    <Calendar className="h-3 w-3 text-muted-foreground" />
                  </div>
                  <div>
                    <p className="text-[10px] text-muted-foreground font-body">Date</p>
                    <p className="text-xs font-body">{format(new Date(currentBooking.bookingDate), 'EEE, MMM d, yyyy')}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2.5 flex-1">
                  <div className="w-7 h-7 rounded-md bg-muted flex items-center justify-center flex-shrink-0">
                    <Clock className="h-3 w-3 text-muted-foreground" />
                  </div>
                  <div>
                    <p className="text-[10px] text-muted-foreground font-body">Time</p>
                    <p className="text-xs font-body">{currentBooking.bookingTime}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {currentBooking.notes && (
            <div>
              <h3 className="text-xs text-muted-foreground mb-1.5 font-body">
                Notes
              </h3>
              <div className="border border-border rounded-md p-3">
                <p className="text-xs text-muted-foreground font-body">
                  {currentBooking.notes}
                </p>
              </div>
            </div>
          )}

          {/* Actions */}
          {currentBooking.status === 'pending' && (
            <div className="flex gap-2">
              <Button 
                size="sm" 
                className="flex-1 gap-1 text-xs h-8 bg-emerald-600 hover:bg-emerald-700 text-white"
                onClick={() => handleStatusUpdate('completed')}
                disabled={loading}
              >
                <Check className="h-3 w-3" />
                Complete
              </Button>
              <Button 
                size="sm" 
                className="flex-1 gap-1 text-xs h-8" 
                variant="destructive"
                onClick={() => handleStatusUpdate('cancelled')}
                disabled={loading}
              >
                <X className="h-3 w-3" />
                Cancel
              </Button>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default BookingDetailsDialog;