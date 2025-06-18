import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

function FloatingPaths({ position }) {
  const paths = Array.from({ length: 42 }, (_, i) => ({
    id: i,
    d: `M-${380 - i * 4 * position} -${189 + i * 5}C-${
      380 - i * 4 * position
    } -${189 + i * 5} -${312 - i * 4 * position} ${216 - i * 5} ${
      152 - i * 4 * position
    } ${343 - i * 5}C${616 - i * 4 * position} ${470 - i * 5} ${
      684 - i * 4 * position
    } ${875 - i * 5} ${684 - i * 4 * position} ${875 - i * 5}`,
    width: 0.3 + i * 0.025,
  }));

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      <svg className="w-full h-full" viewBox="0 0 696 316" fill="none">
        <defs>
          <linearGradient id={`gradient-${position}`} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.1" />
            <stop offset="50%" stopColor="#8b5cf6" stopOpacity="0.15" />
            <stop offset="100%" stopColor="#06b6d4" stopOpacity="0.1" />
          </linearGradient>
        </defs>
        {paths.map((path, index) => (
          <motion.path
            key={path.id}
            d={path.d}
            stroke={`url(#gradient-${position})`}
            strokeWidth={path.width}
            fill="none"
            initial={{ 
              pathLength: 0, 
              opacity: 0,
              filter: "blur(2px)"
            }}
            animate={{
              pathLength: [0, 1, 0.8],
              opacity: [0, 0.6, 0.2],
              filter: ["blur(2px)", "blur(0px)", "blur(1px)"]
            }}
            transition={{
              duration: 12 + Math.random() * 8,
              repeat: Infinity,
              ease: "easeInOut",
              delay: index * 0.1,
            }}
          />
        ))}
      </svg>
    </div>
  );
}

function ParticleField() {
  const particles = Array.from({ length: 60 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 3 + 1,
  }));

  return (
    <div className="absolute inset-0 pointer-events-none">
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className="absolute w-1 h-1 bg-blue-400/20 rounded-full"
          style={{
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            width: `${particle.size}px`,
            height: `${particle.size}px`,
          }}
          animate={{
            y: [0, -30, 0],
            opacity: [0, 1, 0],
            scale: [0, 1, 0],
          }}
          transition={{
            duration: 4 + Math.random() * 4,
            repeat: Infinity,
            delay: Math.random() * 4,
          }}
        />
      ))}
    </div>
  );
}

const DreamSprintLanding = () => {
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 1], [0, -50]);
  const opacity = useTransform(scrollYProgress, [0, 0.3], [1, 0]);

  const title = "DreamSprint";
  const subtitle = "Transform Vision Into Reality";

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-white via-gray-50 to-blue-50/30">
      {/* Hero Section */}
      <motion.div 
        className="relative min-h-screen flex items-center justify-center overflow-hidden"
        style={{ y, opacity }}
      >
        {/* Animated Background Layers */}
        <div className="absolute inset-0">
          <FloatingPaths position={1} />
          <FloatingPaths position={-0.7} />
          <ParticleField />
        </div>

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-white/80 via-transparent to-white/40" />

        {/* Hero Content */}
        <div className="relative z-20 container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.5 }}
            className="max-w-6xl mx-auto"
          >
            {/* Main Title */}
            <div className="mb-6">
                             <motion.h1 
                 className="text-5xl sm:text-7xl md:text-8xl lg:text-[10rem] font-black tracking-tighter leading-none"
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 1.2, ease: "easeOut" }}
              >
                {title.split("").map((letter, index) => (
                  <motion.span
                    key={index}
                    className="inline-block bg-gradient-to-br from-gray-900 via-blue-800 to-purple-900 bg-clip-text text-transparent"
                    initial={{ y: 100, rotateX: 90, opacity: 0 }}
                    animate={{ y: 0, rotateX: 0, opacity: 1 }}
                    transition={{
                      delay: index * 0.08,
                      type: "spring",
                      stiffness: 200,
                      damping: 20,
                    }}
                    whileHover={{ 
                      scale: 1.05,
                      rotateY: 10,
                      transition: { duration: 0.2 }
                    }}
                  >
                    {letter}
                  </motion.span>
                ))}
              </motion.h1>

              {/* Subtitle */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8, duration: 0.8 }}
                className="mt-6"
              >
                                 <h2 className="text-xl md:text-3xl lg:text-4xl font-bold text-gray-700 tracking-wide">
                  {subtitle.split(" ").map((word, index) => (
                    <motion.span
                      key={index}
                      className="inline-block mr-4"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 1 + index * 0.2 }}
                    >
                      {word}
                    </motion.span>
                  ))}
                </h2>
              </motion.div>
            </div>

            {/* Description */}
            <motion.p
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 1.5, duration: 1 }}
                             className="text-lg md:text-xl lg:text-2xl mb-16 text-gray-700 max-w-5xl mx-auto leading-relaxed font-medium"
            >
              Join an intensive 10-day deep work sprint where ambitious minds converge, 
              distractions disappear, and breakthrough results emerge from relentless focus.
            </motion.p>

            {/* CTA Button */}
            <motion.div
              initial={{ y: 50, opacity: 0, scale: 0.9 }}
              animate={{ y: 0, opacity: 1, scale: 1 }}
              transition={{ delay: 2, duration: 0.8, type: "spring" }}
              className="relative"
            >
              <motion.div
                className="relative group"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                {/* Button Glow Effect */}
                <div className="absolute -inset-1 bg-gradient-to-r from-blue-500 via-purple-500 to-cyan-500 rounded-2xl blur opacity-30 group-hover:opacity-60 transition duration-500" />
                
                <a
                  href="/dreamsprint/apply"
                  className="relative block px-12 py-6 bg-white rounded-xl border border-gray-200 overflow-hidden group-hover:border-blue-300 transition-all duration-300"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 via-purple-500/5 to-cyan-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  
                                     <span className="relative text-lg md:text-xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent group-hover:from-blue-600 group-hover:to-purple-600 transition-all duration-300">
                    Begin Your Sprint
                  </span>
                  
                  <motion.span
                                         className="relative ml-3 text-lg md:text-xl"
                    animate={{ x: [0, 5, 0] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    →
                  </motion.span>
                </a>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <div className="w-6 h-10 border-2 border-gray-400 rounded-full flex justify-center">
            <motion.div
              className="w-1 h-3 bg-gray-600 rounded-full mt-2"
              animate={{ opacity: [1, 0, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
          </div>
        </motion.div>
      </motion.div>

      {/* Content Section */}
      <motion.section
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1 }}
        className="relative bg-white py-32"
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-20"
          >
                         <h3 className="text-3xl md:text-5xl font-bold text-gray-900 mb-8">
              The Sprint Manifesto
            </h3>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ x: -50, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="space-y-8"
            >
                             <div className="space-y-6 text-base leading-relaxed text-gray-700">
                <p>
                  You're a founder grinding through your MVP. A student pushing boundaries. 
                  An engineer with a bold side project. A creator with an ambitious backlog. 
                  Or simply someone chasing an extraordinary dream.
                </p>
                <p>
                  This isn't a retreat or vacation—it's an intensive crucible where focus 
                  meets execution. Ten days in Miami. One shared mission: transform your 
                  vision into tangible reality.
                </p>
                <p>
                  We'll eliminate distractions, optimize for deep work, and surround you 
                  with equally driven individuals. Daily check-ins, progress demos, and 
                  relentless momentum toward your breakthrough.
                </p>
              </div>
            </motion.div>

            <motion.div
              initial={{ x: 50, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative"
            >
              <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-3xl p-8 border border-blue-100">
                <div className="space-y-6">
                  <div className="flex items-center space-x-4">
                    <div className="w-3 h-3 bg-blue-500 rounded-full" />
                                         <span className="text-base font-semibold">10 Days of Pure Focus</span>
                  </div>
                  <div className="flex items-center space-x-4">
                    <div className="w-3 h-3 bg-purple-500 rounded-full" />
                                         <span className="text-base font-semibold">Maximum 10 Participants</span>
                   </div>
                   <div className="flex items-center space-x-4">
                     <div className="w-3 h-3 bg-cyan-500 rounded-full" />
                     <span className="text-base font-semibold">Miami Location</span>
                   </div>
                   <div className="flex items-center space-x-4">
                     <div className="w-3 h-3 bg-green-500 rounded-full" />
                     <span className="text-base font-semibold">August 1-11, 2025</span>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-16">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
                         <h4 className="text-xl font-bold mb-6">Ready to Transform Your Vision?</h4>
             <div className="space-y-3 text-gray-300">
               <p className="text-base">Organizer: Thabhelo Duve</p>
               <p className="text-base">Email: thabheloduve@gmail.com</p>
               <p className="text-base">Phone: +1 256 375 4207</p>
            </div>
          </motion.div>
        </div>
      </footer>
    </div>
  );
};

export default DreamSprintLanding;