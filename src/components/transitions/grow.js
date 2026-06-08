"use client";

import { motion, AnimatePresence } from "framer-motion";

export const Grow = ({ show = true, duration = 0.225, children }) => {
    return (
        <AnimatePresence>
            {show && (
                <motion.div
                    initial={{ scale: 0.6, opacity: 0 }}
                    animate={{
                        opacity: [0, 0, 1],
                        scale: [0.6, 1],
                    }}
                    transition={{
                        duration: duration || 0.225,
                        ease: "easeOut",
                        times: [0, 0.4, 1],
                    }}
                >
                    {children}
                </motion.div>
            )}
        </AnimatePresence>
    );
};
