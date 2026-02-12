import { motion } from "framer-motion";
import { Star, Quote } from "lucide-react";

const testimonials = [
  {
    name: "Ama K.",
    rating: 5,
    text: "Absolutely love iSparkle! The attention to detail is amazing. My nails have never looked better.",
  },
  {
    name: "Grace O.",
    rating: 5,
    text: "The Hydra Facial was incredible. My skin feels so refreshed and glowing. Highly recommend!",
  },
  {
    name: "Akosua M.",
    rating: 5,
    text: "Best massage I've ever had. The hot stone massage melted all my stress away. Will definitely be back!",
  },
];

const ReviewsSection = () => {
  return (
    <section id="reviews" className="py-24 bg-black-light relative">
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
            Testimonials
          </p>
          <h2 className="font-heading text-4xl md:text-5xl font-semibold text-foreground mb-4">
            Reviews & Ratings
          </h2>
          <p className="text-cream max-w-2xl mx-auto">
            See what our valued clients have to say about their iSparkle experience
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="p-8 rounded-xl bg-card border border-border/50 hover:border-primary/50 transition-all duration-300"
            >
              <Quote className="w-10 h-10 text-primary/30 mb-4" />
              
              {/* Stars */}
              <div className="flex gap-1 mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-primary text-primary" />
                ))}
              </div>
              
              <p className="text-cream mb-6 leading-relaxed italic">
                "{testimonial.text}"
              </p>
              
              <p className="font-heading text-lg font-semibold text-foreground">
                — {testimonial.name}
              </p>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-12 text-center"
        >
          <p className="text-cream">
            Want to share your experience? Leave us a review on{" "}
            <a 
              href="https://instagram.com/isparklesolutions" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-primary hover:underline"
            >
              Instagram
            </a>
            {/* {" "}or{" "} */}
            {/* <a 
              href="https://facebook.com/ISparkle" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-primary hover:underline"
            >
              Facebook
            </a> */}
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default ReviewsSection;