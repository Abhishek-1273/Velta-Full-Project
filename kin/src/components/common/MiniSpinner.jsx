import { motion } from 'framer-motion';

export default function MiniSpinner() {
  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center" style={{ background: '#071A2F' }}>
      <motion.div
        className="w-10 h-10 rounded-full"
        style={{
          border: '2.5px solid rgba(184,134,11,0.15)',
          borderTopColor: '#C9940A',
          borderRightColor: 'rgba(201,148,10,0.4)',
        }}
        animate={{ rotate: 360 }}
        transition={{ duration: 0.9, repeat: Infinity, ease: 'linear' }}
      />
    </div>
  );
}
