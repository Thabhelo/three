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
            <div className="mb-4">
              <motion.h1 
                className="text-3xl sm:text-5xl md:text-8xl lg:text-[10rem] font-black tracking-tighter leading-none"
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
                className="mt-4"
              >
                <h2 className="text-lg md:text-3xl lg:text-4xl font-bold text-gray-700 tracking-wide">
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

            {/* CTA Button - Moved higher */}
            <motion.div
              initial={{ y: 50, opacity: 0, scale: 0.9 }}
              animate={{ y: 0, opacity: 1, scale: 1 }}
              transition={{ delay: 1.2, duration: 0.8, type: "spring" }}
              className="relative mb-8"
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
                  className="relative block px-8 md:px-12 py-4 md:py-6 bg-white rounded-xl border border-gray-200 overflow-hidden group-hover:border-blue-300 transition-all duration-300"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 via-purple-500/5 to-cyan-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  
                  <span className="relative text-base md:text-xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent group-hover:from-blue-600 group-hover:to-purple-600 transition-all duration-300">
                    Apply
                  </span>
                  
                  <motion.span
                    className="relative ml-3 inline-block"
                    animate={{ x: [0, 5, 0] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </motion.span>
                </a>
              </motion.div>
            </motion.div>

            {/* Description */}
            <motion.div
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 1.5, duration: 1 }}
              className="text-xs md:text-base lg:text-lg mb-16 text-gray-700 max-w-5xl mx-auto leading-relaxed font-medium space-y-4"
            >
              <p>
                Hey, I&apos;m organizing a 10-day deep work sprint and I&apos;m looking for up to 9 other highly motivated people to join. The goal is simple: come with one big project you&apos;ve been meaning to finish; whether it&apos;s a startup, a coding project, finish 300 leetcodes, a set of 50 videos, a book, a course, or something creative; and use this time to get it done. We&apos;ll rent one big Airbnb, stock it with food and everything we need, and work side-by-side every day with full focus. No one sleeps more than 2-4 hours a day, and there are no distractions. We&apos;ll start each day with a short check-in and end with progress updates or demos. Everyone is expected to contribute to the energy and momentum of the house.
              </p>
              <p>
                <strong>Tentative Dates:</strong> We&apos;re considering three possible time periods: <strong>August 1-11</strong>, <strong>Thanksgiving week</strong>, or <strong>December</strong>. During the application process, you&apos;ll be able to rank these periods by your preference. Don&apos;t worry if you can&apos;t make it in person - those who can&apos;t attend physically can <strong>join virtually</strong> and participate in all the check-ins, progress updates, and collaborative sessions.
              </p>
              <p>
                We may stream the experience live 24/7 if one of us is a content creator. We&apos;ll have fast Wi-Fi, a solid setup for creators or coders, and shared spaces for working or brainstorming. There will be daily challenges, spontaneous team-ups, and constant encouragement to push through. You&apos;ll have people around you who are just as serious about their goals. It&apos;s going to be intense, but also exciting and productive. We&apos;ll also contribute and have access to the $200/mo ChatGPT Pro and the $100/mo Claude Max models.
              </p>
              <p>
                If you&apos;re down, go ahead and fill in the form. We&apos;re looking for people who are ready to show up, lock in, and get real work done. Dates and place are not final, just tentative.
              </p>
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

      {/* Big Screen Recommendation Notice */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="bg-blue-50 border-b border-blue-100 px-4 py-3 text-center"
      >
        <p className="text-xs md:text-sm text-blue-700">
          * Big screen such as an iPad / Mac is recommended for best experience.
        </p>
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
            <h3 className="text-xl md:text-5xl font-bold text-gray-900 mb-8">
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
              <div className="space-y-6 text-sm md:text-base leading-relaxed text-gray-700">
                <p>
                  By the end of the sprint, you will have a tangible startup MVP ready to pitch to investors. 
                  Or you&apos;d have recorded and edited 75 pieces of content. Or finished a book. Or a DSA course. 
                  Or launched your YouTube channel. Or developed your first machine learning model. 
                  Or designed and launched your product&apos;s brand identity.
                </p>
                <p>
                  Ten days in Miami. One shared mission: transform your 
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
                    <span className="text-sm md:text-base font-semibold text-blue-500">10 Days of Pure Focus</span>
                  </div>
                  <div className="flex items-center space-x-4">
                    <div className="w-3 h-3 bg-purple-500 rounded-full" />
                    <span className="text-sm md:text-base font-semibold text-purple-500">About 10 Participants</span>
                   </div>
                   <div className="flex items-center space-x-4">
                     <div className="w-3 h-3 bg-cyan-500 rounded-full" />
                     <span className="text-sm md:text-base font-semibold text-cyan-500">Miami AirBnB</span>
                   </div>
                   <div className="flex items-center space-x-4">
                     <div className="w-3 h-3 bg-green-500 rounded-full" />
                     <span className="text-sm md:text-base font-semibold text-green-500">Aug 1-11 | Thanksgiving | December</span>
                  </div>
                  <div className="flex items-center space-x-4">
                     <div className="w-3 h-3 bg-orange-500 rounded-full" />
                     <span className="text-sm md:text-base font-semibold text-orange-500">Virtual Option Available</span>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-16">
        <div className="max-w-6xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h4 className="text-xl md:text-3xl font-bold mb-12">Ready to Make History?</h4>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-12 mb-12">
            {/* Contact Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <h5 className="text-lg md:text-xl font-bold mb-4 text-blue-400">Contact</h5>
              <div className="space-y-3 text-gray-300">
                <p className="font-semibold">Organizer: Thabhelo Duve</p>
                <p>thabheloduve@gmail.com</p>
                <p>+1 256 375 4207</p>
              </div>
            </motion.div>

            {/* Timeline Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <h5 className="text-lg md:text-xl font-bold mb-4 text-purple-400">Timeline</h5>
              <div className="space-y-3 text-gray-300">
                <p>Applications Due: July 15</p>
                <p>Decisions Sent: July 20</p>
                <p>Sprint Begins: August 1</p>
              </div>
            </motion.div>

            {/* What to Expect Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <h5 className="text-lg md:text-xl font-bold mb-4 text-cyan-400">What to Expect</h5>
              <div className="space-y-3 text-gray-300">
                <p>Intense Focus Sessions</p>
                <p>Daily Progress Reviews</p>
                <p>Breakthrough Results</p>
              </div>
            </motion.div>
          </div>

          {/* Description */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-center border-t border-gray-700 pt-8"
          >
            <p className="text-gray-300 leading-relaxed max-w-4xl mx-auto">
              DreamSprint is an intensive work experience designed for ambitious individuals ready to transform their visions into reality. This is not a casual event—it&apos;s a crucible for breakthrough achievement.
            </p>
          </motion.div>
        </div>
      </footer>
    </div>
  );
};

export default DreamSprintLanding;