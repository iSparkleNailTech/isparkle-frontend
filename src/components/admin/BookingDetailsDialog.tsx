import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { User, Mail, Phone, Clock, Calendar, DollarSign, Tag, FileText, Check, X, AlertCircle } from 'lucide-react';
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

  const DetailItem = ({ icon: Icon, label, value }: { icon: typeof User; label: string; value: string }) => (
    <div className="flex items-center gap-2">
      <Icon className="h-4 w-4 text-muted-foreground flex-shrink-0" />
      <span className="text-sm text-muted-foreground">{label}:</span>
      <span className="text-sm font-medium">{value}</span>
    </div>
  );

  return (
    <Dialog open={!!booking} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[420px] font-body">
        <DialogHeader>
          <div className="flex items-center justify-between">
            <DialogTitle className="text-lg font-body">Booking Details</DialogTitle>
            <Badge className={cn("font-medium text-xs", config.className)}>
              {config.label}
            </Badge>
          </div>
        </DialogHeader>

        <div className="space-y-4 pt-2">
          {/* Customer Info */}
          <div>
            <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-2 font-body">
              Customer
            </h3>
            <div className="space-y-1.5">
              <DetailItem icon={User} label="Name" value={booking.customerName} />
              <div className="flex flex-wrap gap-x-4 gap-y-1.5">
                <DetailItem icon={Mail} label="Email" value={booking.customerEmail} />
                <DetailItem icon={Phone} label="Phone" value={booking.customerPhone} />
              </div>
            </div>
          </div>

          <Separator />

          {/* Service Info */}
          <div>
            <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-2 font-body">
              Service
            </h3>
            <div className="space-y-1.5">
              <DetailItem icon={FileText} label="Service" value={booking.serviceName} />
              <div className="flex flex-wrap gap-x-4 gap-y-1.5">
                <DetailItem icon={Tag} label="Category" value={booking.serviceCategory} />
                <DetailItem icon={DollarSign} label="Price" value={booking.price} />
                <DetailItem icon={Clock} label="Duration" value={booking.duration} />
              </div>
            </div>
          </div>

          <Separator />

          {/* Booking Info */}
          <div>
            <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-2 font-body">
              Appointment
            </h3>
            <div className="flex flex-wrap gap-x-4 gap-y-1.5">
              <DetailItem 
                icon={Calendar} 
                label="Date" 
                value={format(new Date(booking.bookingDate), 'EEE, MMM d, yyyy')} 
              />
              <DetailItem icon={Clock} label="Time" value={booking.bookingTime} />
            </div>
          </div>

          {booking.notes && (
            <>
              <Separator />
              <div>
                <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-2 font-body">
                  Notes
                </h3>
                <p className="text-sm text-muted-foreground bg-muted p-2 rounded-lg">
                  {booking.notes}
                </p>
              </div>
            </>
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
