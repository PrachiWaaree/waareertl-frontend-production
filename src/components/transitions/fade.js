"use client";

import { motion, AnimatePresence } from "framer-motion";

export const Fade = ({
    show = true,
    duration = 0.4,
    className = "",
    children,
    unmountOnExit = false,
}) => {
    if (unmountOnExit) {
        return (
            <AnimatePresence>
                {!!show && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: duration || 0.4 }}
                        className={className || ""}
                    >
                        {children}
                    </motion.div>
                )}
            </AnimatePresence>
        );
    }

    return (
        <AnimatePresence>
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: duration || 0.4 }}
                className={className || ""}
            >
                {children}
            </motion.div>
        </AnimatePresence>
    );
};
