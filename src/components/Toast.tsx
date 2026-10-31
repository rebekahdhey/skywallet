import { AnimatePresence, motion, useReducedMotion } from "motion/react";

interface ToastProps {
  message: string | null
}

function Toast({ message }: ToastProps) {

  const reduceMotion = useReducedMotion()

  return (
    <AnimatePresence>
      {message && (
        <motion.div
          key="toast"
          className="fixed inset-x-0 top-6 z-[60] mx-auto w-fit rounded-full bg-surface px-5 py-3 text-sm font-medium shadow-lg ring-1 ring-separator"
          initial={{ y: '100%' }}
          animate={{ y: 0 }}
          exit={{ y: '100%' }}
          transition={
            reduceMotion
              ? { duration: 0 }
              : { type: 'spring', stiffness: 380, damping: 36 }
          }
        >
          ✓ {message}
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default Toast