import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

interface AuthStepProps {
  onSuccess: () => void;
}

type AuthMode = "options" | "login" | "signup";

const AuthStep = ({ onSuccess }: AuthStepProps) => {
  const [mode, setMode] = useState<AuthMode>("options");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      toast.error(error.message);
      setIsLoading(false);
      return;
    }

    toast.success("Logged in successfully!");
    onSuccess();
  };

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: { full_name: name },
        emailRedirectTo: window.location.origin,
      },
    });

    if (error) {
      toast.error(error.message);
      setIsLoading(false);
      return;
    }

    toast.success("Account created successfully!");
    onSuccess();
  };

  if (mode === "options") {
    return (
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: 20 }}
        className="p-6"
      >
        <div className="max-w-md mx-auto">
          <div className="p-8 rounded-2xl bg-secondary/30 border border-border/50 text-center">
            <h3 className="font-heading text-2xl font-semibold text-foreground mb-6">
              Login to book online
            </h3>

            {/* Email login button */}
            <button
              onClick={() => setMode("login")}
              className="w-16 h-16 rounded-full border-2 border-border/50 flex items-center justify-center mx-auto hover:border-primary/50 transition-colors"
            >
              <Mail className="w-6 h-6 text-foreground" />
            </button>

            <div className="relative my-8">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-border/50" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="bg-secondary/30 px-4 text-muted-foreground">or</span>
              </div>
            </div>

            <Button
              variant="secondary"
              size="lg"
              className="w-full"
              onClick={() => setMode("signup")}
            >
              Create profile
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
        className="p-6"
      >
        <div className="max-w-md mx-auto">
          <div className="p-8 rounded-2xl bg-secondary/30 border border-border/50">
            <h3 className="font-heading text-2xl font-semibold text-foreground mb-6 text-center">
              Welcome back
            </h3>

            <form onSubmit={handleLogin} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="your@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="bg-card border-border"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="bg-card border-border"
                />
              </div>

              <Button
                type="submit"
                variant="gold"
                size="lg"
                className="w-full"
                disabled={isLoading}
              >
                {isLoading ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  "Login"
                )}
              </Button>
            </form>

            <p className="text-center text-sm text-muted-foreground mt-4">
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

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 20 }}
      className="p-6"
    >
      <div className="max-w-md mx-auto">
        <div className="p-8 rounded-2xl bg-secondary/30 border border-border/50">
          <h3 className="font-heading text-2xl font-semibold text-foreground mb-6 text-center">
            Create your profile
          </h3>

          <form onSubmit={handleSignup} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Full Name</Label>
              <Input
                id="name"
                type="text"
                placeholder="Your name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="bg-card border-border"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="signup-email">Email</Label>
              <Input
                id="signup-email"
                type="email"
                placeholder="your@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="bg-card border-border"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="signup-password">Password</Label>
              <Input
                id="signup-password"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                minLength={6}
                className="bg-card border-border"
              />
            </div>

            <Button
              type="submit"
              variant="gold"
              size="lg"
              className="w-full"
              disabled={isLoading}
            >
              {isLoading ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                "Create profile"
              )}
            </Button>
          </form>

          <p className="text-center text-sm text-muted-foreground mt-4">
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
