import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { User, Mail, Phone, Clock, Calendar, Check, X } from 'lucide-react';
import { Booking, BookingStatus } from '@/data/mockBookings';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';

interface BookingDetailsDialogProps {
  booking: Booking | null;
  onClose: () => void;
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

const BookingDetailsDialog = ({ booking, onClose }: BookingDetailsDialogProps) => {
  if (!booking) return null;

  const config = statusConfig[booking.status];

  return (
    <Dialog open={!!booking} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[360px] font-body p-0 gap-0">
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
                <span className="text-xs font-body">{booking.serviceName}</span>
                <span className="text-xs font-body">{booking.price}</span>
              </div>
              <div className="flex justify-between items-center px-3 py-2 border-b border-border">
                <span className="text-xs text-muted-foreground font-body">Category</span>
                <span className="text-xs font-body">{booking.serviceCategory}</span>
              </div>
              <div className="flex justify-between items-center px-3 py-2 border-b border-border">
                <span className="text-xs text-muted-foreground font-body">Duration</span>
                <span className="text-xs font-body">{booking.duration}</span>
              </div>
              <div className="flex justify-between items-center px-3 py-2 bg-muted/30">
                <span className="text-xs font-medium font-body">Total</span>
                <span className="text-xs font-semibold text-foreground font-body">{booking.price}</span>
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
                  <p className="text-xs font-body">{booking.customerName}</p>
                </div>
              </div>
              
              <div className="flex gap-3">
                <div className="flex items-center gap-2.5 flex-1">
                  <div className="w-7 h-7 rounded-md bg-muted flex items-center justify-center flex-shrink-0">
                    <Phone className="h-3 w-3 text-muted-foreground" />
                  </div>
                  <div>
                    <p className="text-[10px] text-muted-foreground font-body">Phone</p>
                    <p className="text-xs font-body">{booking.customerPhone}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2.5 flex-1">
                  <div className="w-7 h-7 rounded-md bg-muted flex items-center justify-center flex-shrink-0">
                    <Mail className="h-3 w-3 text-muted-foreground" />
                  </div>
                  <div>
                    <p className="text-[10px] text-muted-foreground font-body">Email</p>
                    <p className="text-xs font-body truncate max-w-[100px]">{booking.customerEmail}</p>
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
                    <p className="text-xs font-body">{format(new Date(booking.bookingDate), 'EEE, MMM d, yyyy')}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2.5 flex-1">
                  <div className="w-7 h-7 rounded-md bg-muted flex items-center justify-center flex-shrink-0">
                    <Clock className="h-3 w-3 text-muted-foreground" />
                  </div>
                  <div>
                    <p className="text-[10px] text-muted-foreground font-body">Time</p>
                    <p className="text-xs font-body">{booking.bookingTime}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {booking.notes && (
            <div>
              <h3 className="text-xs text-muted-foreground mb-1.5 font-body">
                Notes
              </h3>
              <div className="border border-border rounded-md p-3">
                <p className="text-xs text-muted-foreground font-body">
                  {booking.notes}
                </p>
              </div>
            </div>
          )}

          {/* Actions */}
          {booking.status === 'pending' && (
            <div className="flex gap-2">
              <Button size="sm" className="flex-1 gap-1 text-xs h-8 bg-emerald-600 hover:bg-emerald-700 text-white">
                <Check className="h-3 w-3" />
                Complete
              </Button>
              <Button size="sm" className="flex-1 gap-1 text-xs h-8" variant="destructive">
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
