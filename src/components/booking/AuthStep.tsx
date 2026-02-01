import { useState } from "react";
import { motion } from "framer-motion";
import { Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import type { BookingState } from "./BookingModal";

export const PENDING_BOOKING_KEY = "isparkle_pending_booking";

interface AuthStepProps {
  onSuccess: (name: string, email: string, phone: string) => void;
  pendingBooking: BookingState;
}

type AuthMode = "options" | "login" | "signup" | "phone";

const GoogleIcon = () => (
  <svg className="w-5 h-5" viewBox="0 0 24 24">
    <path
      fill="#4285F4"
      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
    />
    <path
      fill="#34A853"
      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
    />
    <path
      fill="#FBBC05"
      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
    />
    <path
      fill="#EA4335"
      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
    />
  </svg>
);

const AuthStep = ({ onSuccess, pendingBooking }: AuthStepProps) => {
  const [mode, setMode] = useState<AuthMode>("options");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleGoogleSignIn = async () => {
    console.log("initiating google sign in");
    setIsLoading(true);

    // Save pending booking to localStorage before OAuth redirect
    // Convert date to ISO string for JSON serialization
    const bookingToSave = {
      ...pendingBooking,
      date: pendingBooking.date?.toISOString() || null,
    };
    localStorage.setItem(PENDING_BOOKING_KEY, JSON.stringify(bookingToSave));

    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: window.location.origin,
      },
    });

    if (error) {
      toast.error(error.message);
      // Clear pending booking on error
      localStorage.removeItem(PENDING_BOOKING_KEY);
      setIsLoading(false);
    }
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      toast.error(error.message);
      setIsLoading(false);
      return;
    }

    // Get user's name from profile or use email
    const userName = data.user?.user_metadata?.full_name || email.split("@")[0];
    const userEmail = data.user?.email || email;

    // For login, we still need phone number - show a form to collect it
    if (!phone) {
      setMode("phone");
      setIsLoading(false);
      return;
    }

    // Update user metadata with phone if provided
    if (phone && data.user) {
      await supabase.auth.updateUser({
        data: { phone },
      });
    }

    toast.success("Logged in successfully!");
    onSuccess(userName, userEmail, phone);
  };

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!name || !email || !password || !phone) {
      toast.error("Please fill in all fields");
      return;
    }

    setIsLoading(true);

    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: { full_name: name, phone },
        emailRedirectTo: window.location.origin,
      },
    });

    if (error) {
      toast.error(error.message);
      setIsLoading(false);
      return;
    }

    toast.success("Account created successfully!");
    onSuccess(name, email, phone);
  };

  const handlePhoneSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!phone) {
      toast.error("Please enter your phone number");
      return;
    }
    // Get user info from session
    const { data: { session } } = await supabase.auth.getSession();
    if (session?.user) {
      // Update user metadata with phone
      await supabase.auth.updateUser({
        data: { phone },
      });

      const userName = session.user.user_metadata?.full_name || session.user.email?.split("@")[0] || "";
      const userEmail = session.user.email || "";
      onSuccess(userName, userEmail, phone);
    }
  };

  if (mode === "options") {
    return (
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: 20 }}
        className="p-6 font-body"
      >
        <div className="max-w-md mx-auto">
          <div className="p-8 rounded-2xl bg-card border border-border/50 text-center">
            <h3 className="font-body text-2xl font-semibold text-foreground mb-8">
              Login to book online
            </h3>

            {/* Google sign in button */}
            <button
              onClick={handleGoogleSignIn}
              disabled={isLoading}
              className="w-16 h-16 rounded-full border-2 border-border/50 flex items-center justify-center mx-auto hover:border-primary/50 transition-colors disabled:opacity-50"
            >
              {isLoading ? (
                <Loader2 className="w-5 h-5 animate-spin text-foreground" />
              ) : (
                <GoogleIcon />
              )}
            </button>
            <p className="text-sm text-muted-foreground mt-3">Sign in with Google</p>

            <div className="relative my-8">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-border/50" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="bg-card px-4 text-muted-foreground">or</span>
              </div>
            </div>

            <Button
              variant="gold"
              size="lg"
              className="w-full font-body"
              onClick={() => setMode("signup")}
            >
              Continue with email
            </Button>
          </div>
        </div>
      </motion.div>
    );
  }

  if (mode === "login") {
    return (
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: 20 }}
        className="p-6 font-body"
      >
        <div className="max-w-md mx-auto">
          <div className="p-8 rounded-2xl bg-card border border-border/50">
            <h3 className="font-body text-2xl font-semibold text-foreground mb-6 text-center">
              Welcome back
            </h3>

            <form onSubmit={handleLogin} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email" className="font-body">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="your@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="bg-card border-border font-body"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="password" className="font-body">Password</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="bg-card border-border font-body"
                />
              </div>

              <Button
                type="submit"
                variant="gold"
                size="lg"
                className="w-full font-body"
                disabled={isLoading}
              >
                {isLoading ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  "Login"
                )}
              </Button>
            </form>

            <p className="text-center text-sm text-muted-foreground mt-4 font-body">
              Don't have an account?{" "}
              <button
                onClick={() => setMode("signup")}
                className="text-primary hover:underline"
              >
                Sign up
              </button>
            </p>
          </div>
        </div>
      </motion.div>
    );
  }

  if (mode === "phone") {
    return (
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: 20 }}
        className="p-6 font-body"
      >
        <div className="max-w-md mx-auto">
          <div className="p-8 rounded-2xl bg-card border border-border/50">
            <h3 className="font-body text-2xl font-semibold text-foreground mb-6 text-center">
              Phone Number
            </h3>
            <p className="text-sm text-muted-foreground mb-6 text-center">
              We need your phone number to confirm your booking
            </p>
            <form onSubmit={handlePhoneSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="phone" className="font-body">Phone Number</Label>
                <Input
                  id="phone"
                  type="tel"
                  placeholder="+1234567890"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  required
                  className="bg-card border-border font-body"
                />
              </div>
              <Button
                type="submit"
                variant="gold"
                size="lg"
                className="w-full font-body"
                disabled={isLoading}
              >
                {isLoading ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  "Continue"
                )}
              </Button>
            </form>
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
          <h3 className="font-body text-2xl font-semibold text-foreground mb-6 text-center">
            Create your profile
          </h3>

          <form onSubmit={handleSignup} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name" className="font-body">Full Name</Label>
              <Input
                id="name"
                type="text"
                placeholder="Your name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="bg-card border-border font-body"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="signup-email" className="font-body">Email</Label>
              <Input
                id="signup-email"
                type="email"
                placeholder="your@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="bg-card border-border font-body"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="signup-password" className="font-body">Password</Label>
              <Input
                id="signup-password"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                minLength={6}
                className="bg-card border-border font-body"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="signup-phone" className="font-body">Phone Number</Label>
              <Input
                id="signup-phone"
                type="tel"
                placeholder="+1234567890"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                required
                className="bg-card border-border font-body"
              />
            </div>

            <Button
              type="submit"
              variant="gold"
              size="lg"
              className="w-full font-body"
              disabled={isLoading}
            >
              {isLoading ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                "Create profile"
              )}
            </Button>
          </form>

          <p className="text-center text-sm text-muted-foreground mt-4 font-body">
            Already have an account?{" "}
            <button
              onClick={() => setMode("login")}
              className="text-primary hover:underline"
            >
              Login
            </button>
          </p>
        </div>
      </div>
    </motion.div>
  );
};

export default AuthStep;
