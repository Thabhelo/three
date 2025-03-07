import React from "react";
import Tilt from "react-parallax-tilt";
import { motion } from "framer-motion";

import { styles } from "../styles";
import { services } from "../constants";
import { SectionWrapper } from "../hoc";
import { fadeIn, textVariant } from "../utils/motion";

const ServiceCard = ({ index, title, icon }) => (
  <Tilt className='xs:w-[250px] w-full'>
    <motion.div
      variants={fadeIn("right", "spring", index * 0.5, 0.75)}
      className='w-full green-pink-gradient p-[1px] rounded-[20px] shadow-card'
    >
      <div
        options={{
          max: 45,
          scale: 1,
          speed: 450,
        }}
        className='bg-tertiary rounded-[20px] py-5 px-12 min-h-[280px] flex justify-evenly items-center flex-col'
      >
        <img
          src={icon}
          alt='web-development'
          className='w-16 h-16 object-contain'
        />

        <h3 className='text-white text-[20px] font-bold text-center'>
          {title}
        </h3>
      </div>
    </motion.div>
  </Tilt>
);

const About = () => {
  return (
    <>
      <motion.div variants={textVariant()}>
        <p className={styles.sectionSubText}>Introduction</p>
        <h2 className={styles.sectionHeadText}>Overview</h2>
      </motion.div>

      {/* Container for text & Spotify Embed */}
      <div className="mt-4 flex flex-col lg:flex-row items-start gap-8">
        {/* Text Section */}
        <motion.p
          variants={fadeIn("", "", 0.1, 1)}
          className='text-secondary text-[17px] leading-[30px] max-w-3xl lg:border-r border-gray-600 pr-8'
        >
          I have a strong foundation in Computer Science and Mathematics, I'm an 8x hackathon winner, and I'm a Software Engineering Intern at Amazon.
          I'm a growing Full Stack Software Engineer, with a keen interest in web and VR/AR development. I'm also very passionate in Data Science, Machine Learning and Cloud Engineering.
          I spend most time working with Java, Python, JavaScript, TypeScript and Swift.
          <br /><br />
          I'm a quick learner and collaborate closely with teams to create efficient, scalable, and user-friendly solutions that solve real-world problems. 
          I'm also a huge fan of open-source and I'm always looking for ways to give back to the community - whether it’s fixing bugs, writing documentation, or just adding a README that doesn’t leave people questioning their career choices :-)
        </motion.p>

        {/* Spotify Embed Section */}
        <div className="w-full lg:w-[300px] flex justify-center">
          <iframe
            style={{ borderRadius: "12px" }}
            src="https://open.spotify.com/embed/playlist/37i9dQZF1FoHDGRLHOQqKh?utm_source=generator&theme=0"
            width="100%"
            height="352"
            frameBorder="0"
            allowFullScreen={false}
            allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
            loading="lazy"
            className="rounded-lg shadow-lg"
          ></iframe>
        </div>
      </div>

      {/* Services Section */}
      <div className='mt-20 flex flex-wrap gap-10'>
        {services.map((service, index) => (
          <ServiceCard key={service.title} index={index} {...service} />
        ))}
      </div>
    </>
  );
};

export default SectionWrapper(About, "about");
