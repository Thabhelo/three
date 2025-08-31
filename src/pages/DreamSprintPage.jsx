import { motion } from 'framer-motion';
import DreamSprintForm from '../components/dreamsprint/DreamSprintForm';

const DreamSprintPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50/20">
      {/* Navigation Header */}
      <motion.nav
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative z-50 w-full py-4 md:py-6 px-4 bg-white/80 backdrop-blur-lg border-b border-gray-100"
      >
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <motion.a
            href="/dreamsprint"
            className="flex items-center space-x-2 md:space-x-3 text-lg md:text-2xl font-black text-gray-900 hover:text-blue-600 transition-colors group"
            whileHover={{ scale: 1.05, x: -5 }}
            whileTap={{ scale: 0.95 }}
          >
            <motion.span
              animate={{ x: [0, -5, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="inline-block"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </motion.span>
            <span>DreamSprint</span>
          </motion.a>
          <div className="text-xs md:text-sm text-gray-600 font-medium bg-gray-100 px-3 md:px-4 py-1.5 md:py-2 rounded-full">
            Application Portal
          </div>
        </div>
      </motion.nav>



      {/* Form Section */}
      <motion.section
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="relative"
      >
        <DreamSprintForm />
      </motion.section>

      {/* Footer */}
      <motion.footer
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.4 }}
        className="relative bg-gray-900 text-white"
      >
        <div className="absolute inset-0 bg-gradient-to-r from-gray-900 via-blue-900/20 to-gray-900" />
        
        <div className="relative z-10 max-w-6xl mx-auto px-4 py-12 md:py-16 text-center">
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            <h3 className="text-xl md:text-2xl lg:text-3xl font-bold mb-6 md:mb-8">
              Ready to Make History?
            </h3>
            
            <div className="grid md:grid-cols-3 gap-6 md:gap-8 mb-8 md:mb-12">
              <motion.div 
                className="space-y-2 md:space-y-3"
                whileHover={{ scale: 1.05, y: -5 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <h4 className="text-sm md:text-lg font-semibold text-blue-400">Contact</h4>
                <div className="space-y-1 md:space-y-2 text-gray-300 text-xs md:text-sm">
                  <p>Organizer: Thabhelo Duve</p>
                  <p>thabheloduve@gmail.com</p>
                  <p>+1 256 375 4207</p>
                </div>
              </motion.div>
              
              <motion.div 
                className="space-y-2 md:space-y-3"
                whileHover={{ scale: 1.05, y: -5 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <h4 className="text-sm md:text-lg font-semibold text-purple-400">Timeline</h4>
                <div className="space-y-1 md:space-y-2 text-gray-300 text-xs md:text-sm">
                  <p>Applications Due: July 15</p>
                  <p>Decisions Sent: July 20</p>
                  <p>Sprint Begins: August 1</p>
                </div>
              </motion.div>
              
              <motion.div 
                className="space-y-2 md:space-y-3"
                whileHover={{ scale: 1.05, y: -5 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <h4 className="text-sm md:text-lg font-semibold text-cyan-400">What to Expect</h4>
                <div className="space-y-1 md:space-y-2 text-gray-300 text-xs md:text-sm">
                  <p>Intense Focus Sessions</p>
                  <p>Daily Progress Reviews</p>
                  <p>Breakthrough Results</p>
                </div>
              </motion.div>
            </div>

            <motion.p
              className="text-gray-400 text-xs md:text-sm leading-relaxed max-w-3xl mx-auto"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
            >
              DreamSprint is an intensive work experience designed for ambitious individuals ready to 
              transform their visions into reality. This is not a casual event—it&apos;s a crucible for 
              breakthrough achievement.
            </motion.p>
          </motion.div>
        </div>
      </motion.footer>
    </div>
  );
};

export default DreamSprintPage;