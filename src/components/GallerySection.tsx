import { motion } from "framer-motion";
import { Sparkles, Tag } from "lucide-react";

const GallerySection = () => {
  return (
    <section id="gallery" className="py-24 bg-background relative">
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
            Our Work
          </p>
          <h2 className="font-heading text-4xl md:text-5xl font-semibold text-foreground mb-4">
            Gallery & Promotions
          </h2>
          <p className="text-cream max-w-2xl mx-auto">
            Explore our stunning transformations and current special offers
          </p>
        </motion.div>

        {/* Placeholder gallery grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-12">
          {[1, 2, 3, 4, 5, 6, 7, 8].map((item) => (
            <motion.div
              key={item}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: item * 0.05 }}
              className="aspect-square rounded-xl bg-card border border-border/50 overflow-hidden flex items-center justify-center group hover:border-primary/50 transition-all duration-300"
            >
              <div className="text-center p-4">
                <Sparkles className="w-8 h-8 text-primary/50 mx-auto mb-2 group-hover:text-primary transition-colors" />
                <p className="text-muted-foreground text-sm">Coming Soon</p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Promotions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="p-8 rounded-2xl bg-gradient-gold text-primary-foreground text-center"
        >
          <Tag className="w-12 h-12 mx-auto mb-4" />
          <h3 className="font-heading text-2xl md:text-3xl font-semibold mb-3">
            Special Promotions Coming Soon!
          </h3>
          <p className="max-w-xl mx-auto">
            Follow us on social media to stay updated on our latest offers and promotions. 
            New clients receive special welcome packages!
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default GallerySection;