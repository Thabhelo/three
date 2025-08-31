import { motion } from 'framer-motion';
import { styles } from '../styles';
import { ComputersCanvas } from './canvas'


const Hero = () => {
  return (
    <section className="relative w-full h-screen mx-auto pt-[80px]">
      <div className={`${styles.paddingX} absolute inset-0 top-[120px] max-w-7xl mx-auto flex flex-row items-start gap-5`}>
        <div className="flex flex-col justify-center items-center mt-5">
          <div className="w-2.5 h-2.5 rounded-full bg-zinc-900 dark:bg-[#3bc9c9]"/>
          <div className="w-px sm:h-80 h-40 bg-zinc-300 dark:turquoise-gradient"/>
        </div>

        <div>
          <h1 className={`${styles.heroHeadText}`} > Hi, I'm <span className="text-zinc-900 dark:text-[#3bc9c9]">Thabhelo</span></h1>
          <p className={`${styles.heroSubText} mt-2`}>
            I code, I write, I think, <br className="sm:block hidden"/> I sing, I travel and repeat.
          </p>
        </div>
      </div>

      <ComputersCanvas />

      <div className='absolute xs:bottom-10 bottom-32 w-full flex justify-center items-center'>
        <a href="#about">
          <div className='w-[35px] h-[64px] rounded-3xl border-2 border-zinc-300 dark:border-secondary flex justify-center items-start p-2'>
            <motion.div
                animate={{
                  y: [0, 24, 0],
                }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  repeatType: "loop",
                }}
                className='w-2 h-2 rounded-full bg-zinc-500 dark:bg-secondary mb-1'
              />
          </div>

        </a>

      </div>
    </section>
  )
}

export default Hero;