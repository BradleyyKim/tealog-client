import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { fabEntrance } from '@/lib/animations';

export default function FAB() {
  const navigate = useNavigate();

  return (
    <div className="fixed bottom-24 right-6 z-20">
      <motion.button
        onClick={() => navigate('/brew/new')}
        className="w-14 h-14 bg-primary rounded-full shadow-lg shadow-primary/40 flex items-center justify-center group"
        variants={fabEntrance}
        initial="initial"
        animate="animate"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        <motion.span
          className="material-icons text-white text-2xl"
          whileHover={{ rotate: 45 }}
          transition={{ duration: 0.2 }}
        >
          add
        </motion.span>
      </motion.button>
    </div>
  );
}
