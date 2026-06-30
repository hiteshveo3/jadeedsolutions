import React from "react";
import { AnimatePresence, motion } from "framer-motion";

export function MediaPane({ feature }) {
  return (
    <aside className="sticky-media-pane" aria-label={`Image frame for ${feature.title}`}>
      <div className={`sticky-media-frame is-${feature.accent}`}>
        <AnimatePresence mode="wait">
          <motion.div
            key={feature.title}
            className="sticky-image-placeholder"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.32, ease: [0.4, 0, 0.2, 1] }}
          >
            <span>Image frame</span>
            <small>{feature.title}</small>
          </motion.div>
        </AnimatePresence>
      </div>
    </aside>
  );
}
