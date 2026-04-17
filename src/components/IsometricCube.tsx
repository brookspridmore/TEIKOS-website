import { useState } from 'react';
import { motion } from 'framer-motion';

interface IsometricCubeProps {
  size?: number;
  className?: string;
}

export function IsometricCube({ size = 200, className = '' }: IsometricCubeProps) {
  const [isPaused, setIsPaused] = useState(false);
  
  const halfSize = size / 2;
  
  return (
    <div 
      className={`perspective-1000 ${className}`}
      style={{ width: size, height: size }}
    >
      <motion.div
        className="relative preserve-3d cursor-pointer"
        style={{ 
          width: size, 
          height: size,
          transformStyle: 'preserve-3d',
        }}
        animate={{
          rotateX: -15,
          rotateY: isPaused ? undefined : [0, 360],
        }}
        transition={{
          rotateY: {
            duration: 20,
            repeat: Infinity,
            ease: 'linear',
          },
        }}
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
        whileHover={{ scale: 1.1 }}
      >
        {/* Front Face - Yellow */}
        <div
          className="absolute border-[3px] border-dark flex items-center justify-center"
          style={{
            width: size,
            height: size,
            backgroundColor: '#FFF59D',
            backgroundImage: 'radial-gradient(circle, #1A1A1A 1px, transparent 1px)',
            backgroundSize: '8px 8px',
            transform: `translateZ(${halfSize}px)`,
          }}
        >
          <span className="font-heading font-bold text-2xl text-dark">T</span>
        </div>
        
        {/* Back Face - Yellow */}
        <div
          className="absolute border-[3px] border-dark"
          style={{
            width: size,
            height: size,
            backgroundColor: '#FFF59D',
            backgroundImage: 'radial-gradient(circle, #1A1A1A 1px, transparent 1px)',
            backgroundSize: '8px 8px',
            transform: `rotateY(180deg) translateZ(${halfSize}px)`,
          }}
        />
        
        {/* Right Face - Blue */}
        <div
          className="absolute border-[3px] border-dark"
          style={{
            width: size,
            height: size,
            backgroundColor: '#81D4FA',
            transform: `rotateY(90deg) translateZ(${halfSize}px)`,
          }}
        />
        
        {/* Left Face - Blue */}
        <div
          className="absolute border-[3px] border-dark"
          style={{
            width: size,
            height: size,
            backgroundColor: '#81D4FA',
            transform: `rotateY(-90deg) translateZ(${halfSize}px)`,
          }}
        />
        
        {/* Top Face - Coral */}
        <div
          className="absolute border-[3px] border-dark"
          style={{
            width: size,
            height: size,
            backgroundColor: '#FF8A80',
            transform: `rotateX(90deg) translateZ(${halfSize}px)`,
          }}
        />
        
        {/* Bottom Face - Coral */}
        <div
          className="absolute border-[3px] border-dark"
          style={{
            width: size,
            height: size,
            backgroundColor: '#FF8A80',
            transform: `rotateX(-90deg) translateZ(${halfSize}px)`,
          }}
        />
      </motion.div>
    </div>
  );
}
