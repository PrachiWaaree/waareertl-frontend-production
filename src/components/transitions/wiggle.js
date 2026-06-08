"use client";

import { motion, AnimatePresence } from "framer-motion";

export const Wiggle = ({ in: show = true, duration = 0.4, children }) => {
    const wiggleVariants = {
        initial: { rotate: 0, opacity: 0 },
        animate: {
            rotate: [0, -10, 10, -5, 5, 0],
            opacity: 1,
            transition: { duration },
        },
        exit: { opacity: 0 },
    };

    return (
        <AnimatePresence>
            {show && (
                <motion.div
                    initial="initial"
                    animate="animate"
                    exit="exit"
                    variants={wiggleVariants}
                >
                    {children}
                </motion.div>
            )}
        </AnimatePresence>
    );
};
