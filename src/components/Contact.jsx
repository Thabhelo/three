import React, { useRef, useState } from "react";
import { motion } from "framer-motion";
import emailjs from "@emailjs/browser";

import { styles } from "../styles";
import { EarthCanvas } from "./canvas";
import { SectionWrapper } from "../hoc";
import { slideIn } from "../utils/motion";

const Contact = () => {
  const formRef = useRef();
  const [form, setForm] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { target } = e;
    const { name, value } = target;

    setForm({
      ...form,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    // Get EmailJS configuration from environment variables
    const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID;
    const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
    const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;
    const recipientEmail = import.meta.env.VITE_EMAILJS_RECIPIENT_EMAIL;

    // Validate environment variables
    if (!serviceId || !templateId || !publicKey || !recipientEmail) {
      setLoading(false);
      alert("Email configuration is missing. Please contact the administrator.");
      console.error("Missing EmailJS environment variables");
      return;
    }

    emailjs
      .send(
        serviceId,
        templateId,
        {
          from_name: form.name,
          to_name: "Thabhelo",
          from_email: form.email,
          to_email: recipientEmail,
          message: form.message,
        },
        publicKey
      )
      .then(
        () => {
          setLoading(false);
          alert("Thank you. I will get back to you as soon as possible.");

          setForm({
            name: "",
            email: "",
            message: "",
          });
        },
        (error) => {
          setLoading(false);
          console.error(error);

          alert("Ah, something went wrong. Please try again.");
        }
      );
  };

  return (
    <div
      className={`xl:mt-12 flex xl:flex-row flex-col-reverse gap-10 overflow-hidden`}
    >
      <motion.div
        variants={slideIn("left", "tween", 0.1, 0.55)}
        className='flex-[0.75] bg-white dark:bg-black-100 border border-zinc-200 dark:border-zinc-700 p-8 rounded-2xl transition-colors'
      >
        <p className={styles.sectionSubText}>Get in touch</p>
        <h3 className={styles.sectionHeadText}>Contact</h3>

        <form
          ref={formRef}
          onSubmit={handleSubmit}
          className='mt-8 flex flex-col gap-6'
        >
          <label className='flex flex-col'>
            <span className='text-zinc-900 dark:text-white font-medium mb-2'>Your Name</span>
            <input
              type='text'
              name='name'
              value={form.name}
              onChange={handleChange}
              placeholder="What's your preferred name?"
              className='bg-white dark:bg-tertiary py-3 px-4 placeholder:text-zinc-400 dark:placeholder:text-secondary text-zinc-900 dark:text-white rounded-lg outline-none border border-zinc-200 dark:border-zinc-700 font-medium transition-colors'
            />
          </label>
          <label className='flex flex-col'>
            <span className='text-zinc-900 dark:text-white font-medium mb-2'>Your email</span>
            <input
              type='email'
              name='email'
              value={form.email}
              onChange={handleChange}
              placeholder="What's your email address?"
              className='bg-white dark:bg-tertiary py-3 px-4 placeholder:text-zinc-400 dark:placeholder:text-secondary text-zinc-900 dark:text-white rounded-lg outline-none border border-zinc-200 dark:border-zinc-700 font-medium transition-colors'
            />
          </label>
          <label className='flex flex-col'>
            <span className='text-zinc-900 dark:text-white font-medium mb-2'>Your Message</span>
            <textarea
              rows={7}
              name='message'
              value={form.message}
              onChange={handleChange}
              placeholder="Let's talk!"
              className='bg-white dark:bg-tertiary py-3 px-4 placeholder:text-zinc-400 dark:placeholder:text-secondary text-zinc-900 dark:text-white rounded-lg outline-none border border-zinc-200 dark:border-zinc-700 font-medium transition-colors'
            />
          </label>

          <button
            type='submit'
            className='bg-zinc-900 dark:bg-tertiary py-3 px-6 rounded-lg outline-none w-fit text-white font-medium hover:opacity-90 transition-opacity'
          >
            {loading ? "Sending..." : "Send"}
          </button>
        </form>
      </motion.div>

      <motion.div
        variants={slideIn("right", "tween", 0.2, 1)}
        className='xl:flex-1 xl:h-auto md:h-[550px] h-[350px]'
      >
        <EarthCanvas />
      </motion.div>
    </div>
  );
};

export default SectionWrapper(Contact, "contact");