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
      <DialogContent className="sm:max-w-[420px] font-body p-0 gap-0">
        <DialogHeader className="p-4 pb-3">
          <div className="flex items-center justify-between">
            <DialogTitle className="text-lg font-semibold font-body">Booking Details</DialogTitle>
            <Badge className={cn("font-medium text-xs", config.className)}>
              {config.label}
            </Badge>
          </div>
        </DialogHeader>

        <div className="px-4 pb-4 space-y-4">
          {/* Service Breakdown */}
          <div>
            <h3 className="text-sm text-muted-foreground mb-2 font-body">
              Service Breakdown
            </h3>
            <div className="border border-border rounded-lg overflow-hidden">
              <div className="flex justify-between items-center px-4 py-3 border-b border-border">
                <span className="text-sm font-body">{booking.serviceName}</span>
                <span className="text-sm font-body">{booking.price}</span>
              </div>
              <div className="flex justify-between items-center px-4 py-3 border-b border-border">
                <span className="text-sm text-muted-foreground font-body">Category</span>
                <span className="text-sm font-body">{booking.serviceCategory}</span>
              </div>
              <div className="flex justify-between items-center px-4 py-3 border-b border-border">
                <span className="text-sm text-muted-foreground font-body">Duration</span>
                <span className="text-sm font-body">{booking.duration}</span>
              </div>
              <div className="flex justify-between items-center px-4 py-3 bg-muted/30">
                <span className="text-sm font-medium font-body">Total</span>
                <span className="text-sm font-semibold text-foreground font-body">{booking.price}</span>
              </div>
            </div>
          </div>

          {/* Contact Details */}
          <div>
            <h3 className="text-sm text-muted-foreground mb-2 font-body">
              Contact Details
            </h3>
            <div className="border border-border rounded-lg p-4 space-y-4">
              <div className="flex gap-4">
                <div className="flex items-start gap-3 flex-1">
                  <div className="w-9 h-9 rounded-lg bg-muted flex items-center justify-center flex-shrink-0">
                    <User className="h-4 w-4 text-muted-foreground" />
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground font-body">Customer Name</p>
                    <p className="text-sm font-body">{booking.customerName}</p>
                  </div>
                </div>
              </div>
              
              <div className="flex gap-4">
                <div className="flex items-start gap-3 flex-1">
                  <div className="w-9 h-9 rounded-lg bg-muted flex items-center justify-center flex-shrink-0">
                    <Phone className="h-4 w-4 text-muted-foreground" />
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground font-body">Phone Number</p>
                    <p className="text-sm font-body">{booking.customerPhone}</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 flex-1">
                  <div className="w-9 h-9 rounded-lg bg-muted flex items-center justify-center flex-shrink-0">
                    <Mail className="h-4 w-4 text-muted-foreground" />
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground font-body">Email Address</p>
                    <p className="text-sm font-body truncate max-w-[120px]">{booking.customerEmail}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Appointment Details */}
          <div>
            <h3 className="text-sm text-muted-foreground mb-2 font-body">
              Appointment
            </h3>
            <div className="border border-border rounded-lg p-4">
              <div className="flex gap-4">
                <div className="flex items-start gap-3 flex-1">
                  <div className="w-9 h-9 rounded-lg bg-muted flex items-center justify-center flex-shrink-0">
                    <Calendar className="h-4 w-4 text-muted-foreground" />
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground font-body">Date</p>
                    <p className="text-sm font-body">{format(new Date(booking.bookingDate), 'EEE, MMM d, yyyy')}</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 flex-1">
                  <div className="w-9 h-9 rounded-lg bg-muted flex items-center justify-center flex-shrink-0">
                    <Clock className="h-4 w-4 text-muted-foreground" />
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground font-body">Time</p>
                    <p className="text-sm font-body">{booking.bookingTime}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {booking.notes && (
            <div>
              <h3 className="text-sm text-muted-foreground mb-2 font-body">
                Notes
              </h3>
              <div className="border border-border rounded-lg p-4">
                <p className="text-sm text-muted-foreground font-body">
                  {booking.notes}
                </p>
              </div>
            </div>
          )}

          {/* Actions */}
          {booking.status === 'pending' && (
            <div className="flex gap-2 pt-1">
              <Button size="sm" className="flex-1 gap-1.5 bg-emerald-600 hover:bg-emerald-700 text-white">
                <Check className="h-3.5 w-3.5" />
                Complete
              </Button>
              <Button size="sm" className="flex-1 gap-1.5" variant="destructive">
                <X className="h-3.5 w-3.5" />
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
