import React from "react";
import { motion } from "framer-motion";

import { styles } from "../styles";
import { SectionWrapper } from "../hoc";
import { fadeIn, textVariant } from "../utils/motion";
import { testimonials } from "../constants";

const FeedbackCard = ({
  index,
  testimonial,
  name,
  designation,
  company,
  image,
}) => (
  <motion.div
    variants={fadeIn("", "tween", index * 0.15, 0.45)}
    className='bg-white dark:bg-black-200 border border-zinc-200 dark:border-zinc-700 p-8 rounded-2xl xs:w-[320px] w-full transition-colors'
  >
    <p className='text-zinc-900 dark:text-white font-black text-[20px]'>"</p>

    <div className='mt-1'>
      <p className='text-zinc-700 dark:text-white tracking-wider text-[16px]'>{testimonial}</p>

      <div className='mt-7 flex justify-between items-center gap-1'>
        <div className='flex-1 flex flex-col'>
          <p className='text-zinc-900 dark:text-white font-medium text-[15px]'>
            @{name}
          </p>
          <p className='mt-1 text-zinc-600 dark:text-secondary text-[12px]'>
            {designation} at {company}
          </p>
          
        </div>

        <img
          src={image}
          alt={`feedback_by-${name}`}
          className='w-10 h-10 rounded-full object-cover'
        />
      </div>
    </div>
  </motion.div>
);

const Feedbacks = () => {
  return (
    <div className={`mt-12`}>
      <div
        className={`bg-white dark:bg-tertiary rounded-2xl border border-zinc-200 dark:border-zinc-700 ${styles.padding} min-h-[260px] transition-colors`}
      >
        <motion.div variants={textVariant()}>
          <p className={styles.sectionSubText}>What others said about me</p>
          <h2 className={styles.sectionHeadText}>Testimonials.</h2>
        </motion.div>
      </div>
      <div className={`-mt-14 pb-12 ${styles.paddingX} grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6`}>
        {testimonials.map((testimonial, index) => (
          <FeedbackCard key={testimonial.name} index={index} {...testimonial} />
        ))}
      </div>
    </div>
  );
};

export default SectionWrapper(Feedbacks, "");