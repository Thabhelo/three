import React, { useState, useEffect } from 'react';
import { motion, Reorder, AnimatePresence } from 'framer-motion';

const DatePreferencesRanking = ({ value, onChange, required = false }) => {
  const [items, setItems] = useState([
    { id: 'aug1-11', period: 'August 1-11', description: 'Summer sprint in Miami', rank: 1 },
    { id: 'thanksgiving', period: 'Thanksgiving week', description: 'Late November focus session', rank: 2 },
    { id: 'december', period: 'December', description: 'End-of-year intensive', rank: 3 }
  ]);

  // Initialize from value if provided
  useEffect(() => {
    if (value && Array.isArray(value) && value.length > 0) {
      setItems(value);
    }
  }, []);

  // Update parent component when items change
  useEffect(() => {
    onChange(items);
  }, [items, onChange]);

  const handleReorder = (newOrder) => {
    // Update ranks based on new order
    const updatedItems = newOrder.map((item, index) => ({
      ...item,
      rank: index + 1
    }));
    setItems(updatedItems);
  };

  const getRankColor = (rank) => {
    switch (rank) {
      case 1: return 'from-green-500 to-emerald-600';
      case 2: return 'from-yellow-500 to-orange-600';
      case 3: return 'from-red-500 to-rose-600';
      default: return 'from-gray-500 to-gray-600';
    }
  };

  const getRankText = (rank) => {
    switch (rank) {
      case 1: return 'First Choice';
      case 2: return 'Second Choice';
      case 3: return 'Third Choice';
      default: return 'Unranked';
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="space-y-6"
    >
      <div className="text-center mb-8">
        <h3 className="text-2xl font-bold text-gray-800 mb-3">
          Rank Your Date Preferences
          {required && <span className="text-red-500 ml-2">*</span>}
        </h3>
        <p className="text-gray-600 text-lg">
          Drag and drop to rank the time periods from most preferred (top) to least preferred (bottom)
        </p>
      </div>

      <Reorder.Group 
        axis="y" 
        values={items} 
        onReorder={handleReorder}
        className="space-y-4"
      >
        <AnimatePresence>
          {items.map((item) => (
            <Reorder.Item 
              key={item.id} 
              value={item}
              className="relative"
              whileHover={{ scale: 1.02 }}
              whileDrag={{ scale: 1.05, rotate: 2 }}
            >
              <motion.div
                className="relative p-6 bg-white rounded-2xl border-2 border-gray-200 hover:border-gray-300 transition-all duration-300 cursor-grab active:cursor-grabbing shadow-sm hover:shadow-md"
                layout
                layoutId={item.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
              >
                {/* Rank Badge */}
                <div className="absolute -top-3 -left-3 z-10">
                  <motion.div
                    className={`w-12 h-12 rounded-full bg-gradient-to-br ${getRankColor(item.rank)} flex items-center justify-center text-white font-bold text-lg shadow-lg`}
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 500, delay: 0.1 }}
                  >
                    {item.rank}
                  </motion.div>
                </div>

                {/* Content */}
                <div className="ml-6">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h4 className="text-xl font-bold text-gray-900 mb-2">
                        {item.period}
                      </h4>
                      <p className="text-gray-600 text-base mb-3">
                        {item.description}
                      </p>
                      <div className="flex items-center">
                        <span className={`text-sm font-semibold px-3 py-1 rounded-full ${
                          item.rank === 1 ? 'bg-green-100 text-green-700' :
                          item.rank === 2 ? 'bg-yellow-100 text-yellow-700' :
                          'bg-red-100 text-red-700'
                        }`}>
                          {getRankText(item.rank)}
                        </span>
                      </div>
                    </div>

                    {/* Drag Handle */}
                    <motion.div 
                      className="flex flex-col space-y-1 text-gray-400 hover:text-gray-600 transition-colors ml-4"
                      whileHover={{ scale: 1.1 }}
                    >
                      <div className="w-1 h-1 bg-current rounded-full"></div>
                      <div className="w-1 h-1 bg-current rounded-full"></div>
                      <div className="w-1 h-1 bg-current rounded-full"></div>
                      <div className="w-1 h-1 bg-current rounded-full"></div>
                      <div className="w-1 h-1 bg-current rounded-full"></div>
                      <div className="w-1 h-1 bg-current rounded-full"></div>
                    </motion.div>
                  </div>
                </div>

                {/* Hover Effect Overlay */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-blue-500/5 to-purple-500/5 rounded-2xl opacity-0 hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                  whileHover={{ opacity: 1 }}
                />
              </motion.div>
            </Reorder.Item>
          ))}
        </AnimatePresence>
      </Reorder.Group>

      {/* Instructions */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="text-center mt-8 p-4 bg-blue-50 rounded-xl border border-blue-100"
      >
        <p className="text-blue-700 font-medium">
          Tip: Simply drag the cards up or down to change their ranking order
        </p>
      </motion.div>
    </motion.div>
  );
};

export default DatePreferencesRanking; 