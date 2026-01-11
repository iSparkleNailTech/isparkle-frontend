import { motion } from "framer-motion";
import { Tag } from "lucide-react";

import nails1 from "@/assets/gallery/nails-1.jpg";
import nails2 from "@/assets/gallery/nails-2.jpg";
import nails3 from "@/assets/gallery/nails-3.jpg";
import nails4 from "@/assets/gallery/nails-4.jpg";
import nails5 from "@/assets/gallery/nails-5.jpg";

const galleryImages = [
  { src: nails1, alt: "Gold glitter almond nails" },
  { src: nails2, alt: "Classic French tip square nails" },
  { src: nails3, alt: "White French tip nails" },
  { src: nails4, alt: "Pink and red glitter almond nails" },
  { src: nails5, alt: "Nude with white and gold tips" },
];

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

        {/* Gallery grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 mb-12">
          {galleryImages.map((image, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.05 }}
              className="aspect-square rounded-xl overflow-hidden group hover:shadow-xl transition-all duration-300"
            >
              <img
                src={image.src}
                alt={image.alt}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
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
