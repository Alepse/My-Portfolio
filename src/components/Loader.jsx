import { motion } from 'framer-motion';

const Loader = ({ darkMode }) => {
  return (
    <div className="flex flex-col items-center justify-center gap-4">
      <motion.div
        className={`w-16 h-16 border-4 rounded-full ${
          darkMode 
            ? 'border-gray-600 border-t-blue-400' 
            : 'border-gray-200 border-t-blue-600'
        }`}
        animate={{ rotate: 360 }}
        transition={{
          duration: 1,
          repeat: Infinity,
          ease: "linear"
        }}
      />
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className={`text-lg font-medium ${
          darkMode ? 'text-gray-300' : 'text-gray-700'
        }`}
      >
        Loading...
      </motion.div>
    </div>
  );
};

export default Loader; 