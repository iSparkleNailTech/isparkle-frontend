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

  const DetailRow = ({ icon: Icon, label, value }: { icon: typeof User; label: string; value: string }) => (
    <div className="flex items-start gap-3">
      <div className="p-2 rounded-lg bg-muted">
        <Icon className="h-4 w-4 text-muted-foreground" />
      </div>
      <div className="flex-1">
        <p className="text-sm text-muted-foreground">{label}</p>
        <p className="font-medium">{value}</p>
      </div>
    </div>
  );

  return (
    <Dialog open={!!booking} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[480px] font-body">
        <DialogHeader>
          <div className="flex items-center justify-between">
            <DialogTitle className="text-xl font-body">Booking Details</DialogTitle>
            <Badge className={cn("font-medium", config.className)}>
              {config.label}
            </Badge>
          </div>
        </DialogHeader>

        <div className="space-y-6 pt-4">
          {/* Customer Info */}
          <div>
            <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide mb-3">
              Customer Information
            </h3>
            <div className="space-y-3">
              <DetailRow icon={User} label="Name" value={booking.customerName} />
              <DetailRow icon={Mail} label="Email" value={booking.customerEmail} />
              <DetailRow icon={Phone} label="Phone" value={booking.customerPhone} />
            </div>
          </div>

          <Separator />

          {/* Service Info */}
          <div>
            <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide mb-3">
              Service Details
            </h3>
            <div className="space-y-3">
              <DetailRow icon={Tag} label="Category" value={booking.serviceCategory} />
              <DetailRow icon={FileText} label="Service" value={booking.serviceName} />
              <DetailRow icon={DollarSign} label="Price" value={booking.price} />
              <DetailRow icon={Clock} label="Duration" value={booking.duration} />
            </div>
          </div>

          <Separator />

          {/* Booking Info */}
          <div>
            <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide mb-3">
              Appointment
            </h3>
            <div className="space-y-3">
              <DetailRow 
                icon={Calendar} 
                label="Date" 
                value={format(new Date(booking.bookingDate), 'EEEE, MMMM d, yyyy')} 
              />
              <DetailRow icon={Clock} label="Time" value={booking.bookingTime} />
            </div>
          </div>

          {booking.notes && (
            <>
              <Separator />
              <div>
                <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide mb-3">
                  Notes
                </h3>
                <p className="text-sm text-muted-foreground bg-muted p-3 rounded-lg">
                  {booking.notes}
                </p>
              </div>
            </>
          )}

          {/* Actions */}
          {booking.status === 'pending' && (
            <div className="flex gap-3 pt-2">
              <Button className="flex-1 gap-2 bg-emerald-600 hover:bg-emerald-700 text-white">
                <Check className="h-4 w-4" />
                Mark Complete
              </Button>
              <Button className="flex-1 gap-2" variant="destructive">
                <X className="h-4 w-4" />
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
