import { useState, useCallback } from "react";
import { motion } from "framer-motion";
import { CreditCard, Loader2, CheckCircle, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { usePaystackPayment } from "react-paystack";
import { env, PAYSTACK_FEE_RATE, PAYSTACK_PUBLIC_KEY } from "@/config/env";
import { api } from "@/integrations/backend/api";
import { toast } from "sonner";

interface PaymentStepProps {
  bookingId: string;
  email: string;
  amount: number; // Amount in the base currency unit (e.g. GHS)
  packageName: string;
  serviceCategoryName: string;
  onSuccess: () => void;
  onClose: () => void;
}

const PaymentStep = ({
  bookingId,
  email,
  amount,
  packageName,
  serviceCategoryName,
  onSuccess,
  onClose,
}: PaymentStepProps) => {
  const [isVerifying, setIsVerifying] = useState(false);
  const [paymentComplete, setPaymentComplete] = useState(false);

  const feeRate = Number(PAYSTACK_FEE_RATE);
  const netPrice = amount
  const grossPrice = netPrice / (1 - feeRate);
  const config = {
    email,
    amount: Math.round(grossPrice * 100), // Convert to pesewas
    publicKey: PAYSTACK_PUBLIC_KEY,
    currency: "GHS" as const,
  };

  const initializePayment = usePaystackPayment(config);

  const isDepositService = (() => {
    const category = serviceCategoryName.toLowerCase();
    return (
      category.includes("nail") ||
      category.includes("pedicure") ||
      category.includes("lash")
    );
  })();

  const handlePaystackSuccess = useCallback(
    async (response: { reference: string }) => {
      setIsVerifying(true);
      try {
        await api.verifyPayment(bookingId, response.reference);
        setPaymentComplete(true);
        toast.success("Payment successful!", {
          description: "Your booking has been confirmed.",
        });
        // Small delay so user sees the success state
        setTimeout(() => {
          onSuccess();
        }, 1500);
      } catch (error: any) {
        const errorMessage =
          error instanceof Error ? error.message : "Payment verification failed";
        toast.error("Payment verification failed", {
          description: errorMessage,
        });
      } finally {
        setIsVerifying(false);
      }
    },
    [bookingId, onSuccess]
  );

  const handlePaystackClose = useCallback(() => {
    toast.warning("Payment not completed", {
      description:
        "Your booking is pending. You can retry payment or it will be automatically cancelled.",
    });
    onClose();
  }, [onClose]);

  const handlePayNow = () => {
    initializePayment({
      onSuccess: handlePaystackSuccess,
      onClose: handlePaystackClose,
    });
  };

  if (paymentComplete) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="p-6 font-body"
      >
        <div className="max-w-md mx-auto">
          <div className="p-8 rounded-2xl bg-card border border-border/50 text-center">
            <div className="w-16 h-16 rounded-full bg-green-500/10 flex items-center justify-center mx-auto mb-4">
              <CheckCircle className="w-8 h-8 text-green-500" />
            </div>
            <h3 className="font-body text-2xl font-semibold text-foreground mb-2">
              Payment Confirmed
            </h3>
            <p className="text-muted-foreground">
              Your {packageName} booking has been confirmed.
            </p>
          </div>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 20 }}
      className="p-6 font-body"
    >
      <div className="max-w-md mx-auto">
        <div className="p-8 rounded-2xl bg-card border border-border/50">
          <div className="text-center mb-6">
            <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
              <CreditCard className="w-8 h-8 text-primary" />
            </div>
            <h3 className="font-body text-2xl font-semibold text-foreground mb-2">
              Complete Payment
            </h3>
            <p className="text-muted-foreground text-sm">
              Pay to confirm your {packageName} booking
            </p>
          </div>

          {/* Amount display */}
          <div className="bg-secondary/50 rounded-xl p-4 mb-4">
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Total Amount</span>
              <span className="text-base font-medium text-foreground">
                GH&#x20B5;{amount.toFixed(2)}
              </span>
            </div>
          </div>

          {isDepositService && (
            <p className="text-xs text-amber-500 mb-4">
              You are being charged GHS 100 as part of your total service charge to secure your booking. This amount will be deducted from your total service charge. Deposits are not refundable.
            </p>
          )}
            <p className="text-xs text-amber-500 mb-4">
              Paystack will charge you a service fee of {PAYSTACK_FEE_RATE * 100}% on top of the total amount.
            </p>

          {/* Pay button */}
          <Button
            variant="gold"
            size="lg"
            className="w-full font-body text-base"
            onClick={handlePayNow}
            disabled={isVerifying}
          >
            {isVerifying ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin mr-2" />
                Verifying payment...
              </>
            ) : (
              <>
                <ShieldCheck className="w-4 h-4 mr-2" />
                Pay GH&#x20B5;{amount.toFixed(2)}
              </>
            )}
          </Button>

          {/* Security note */}
          <p className="text-xs text-muted-foreground text-center mt-4">
            Secured by Paystack. Your payment information is encrypted and secure.
          </p>
        </div>
      </div>
    </motion.div>
  );
};

export default PaymentStep;
