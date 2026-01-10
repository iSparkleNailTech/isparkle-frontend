import { motion } from "framer-motion";
import { Award, Users, Heart, Clock } from "lucide-react";

const features = [
  {
    icon: Award,
    title: "10+ Years Experience",
    description: "Over a decade of excellence in the beauty industry",
  },
  {
    icon: Users,
    title: "Expert Team",
    description: "Skilled professionals dedicated to your beauty",
  },
  {
    icon: Heart,
    title: "Premium Care",
    description: "Every detail handled with sparkle and precision",
  },
  {
    icon: Clock,
    title: "Home Services",
    description: "Convenient beauty treatments at your doorstep",
  },
];

const AboutSection = () => {
  return (
    <section id="about" className="py-24 bg-background relative">
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent" />
      
      <div className="container px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <p className="text-primary font-body text-sm tracking-[0.3em] uppercase mb-3">
            Get To Know Us
          </p>
          <h2 className="font-heading text-4xl md:text-5xl font-semibold text-foreground mb-4">
            Welcome to iSparkle
          </h2>
          <p className="text-cream max-w-3xl mx-auto text-lg leading-relaxed">
            At iSparkle, beauty is more than a service—it is an experience. With over 10 years of excellence 
            in the beauty industry, we have grown into a trusted destination in Tema for premium nail care 
            and an expanding range of beauty and wellness services.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="text-center p-6 rounded-xl bg-card border border-border/50 hover:border-primary/50 transition-all duration-300"
            >
              <div className="w-16 h-16 rounded-full bg-gradient-gold flex items-center justify-center mx-auto mb-4">
                <feature.icon className="w-8 h-8 text-primary-foreground" />
              </div>
              <h3 className="font-heading text-xl font-semibold text-foreground mb-2">
                {feature.title}
              </h3>
              <p className="text-cream text-sm">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-16 text-center"
        >
          <p className="text-primary font-heading text-2xl italic">
            "Thank you for choosing iSparkle, where every detail is handled with sparkle."
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default AboutSection;