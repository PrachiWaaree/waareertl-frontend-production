"use client";

import { motion, AnimatePresence } from "framer-motion";

export const Collapse = ({
    show = true,
    duration = 0.2,
    className = "",
    children,
}) => {
    return (
        <AnimatePresence>
            {show && (
                <motion.div
                    initial={{ height: 50, opacity: 0 }}
                    animate={{
                        height: show ? "auto" : 0,
                        opacity: show ? 1 : 0,
                    }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: duration || 0.4 }}
                    className={className || ""}
                >
                    {children}
                </motion.div>
            )}
        </AnimatePresence>
    );
};
