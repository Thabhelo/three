import {
    mobile,
    backend,
    creator,
    web,
    javascript,
    typescript,
    html,
    css,
    reactjs,
    redux,
    tailwind,
    nodejs,
    mongodb,
    git,
    figma,
    docker,
    telone,
    ewc,
    carrent,
    jobit,
    tripguide,
    threejs,
    degamate,
  } from "../assets";
  
  export const navLinks = [
    {
      id: "about",
      title: "About",
    },
    {
      id: "work",
      title: "Work",
    },
    {
      id: "contact",
      title: "Contact",
    },
    {
      id: "resume",
      title: "Resume",
      url: "../src/assets/Thabhelo-DUve-Resume.pdf",
      download: true,
    },
  ];
  
  const services = [
    {
      title: "Software Engineer",
      icon: web,
    },
    {
      title: "Data Analyst",
      icon: mobile,
    },
    {
      title: "Frontend Developer",
      icon: backend,
    },
    {
      title: "Content Creator",
      icon: creator,
    },
  ];
  
  const technologies = [
    {
      name: "HTML 5",
      icon: html,
    },
    {
      name: "CSS 3",
      icon: css,
    },
    {
      name: "JavaScript",
      icon: javascript,
    },
    {
      name: "TypeScript",
      icon: typescript,
    },
    {
      name: "React JS",
      icon: reactjs,
    },
    {
      name: "Redux Toolkit",
      icon: redux,
    },
    {
      name: "Tailwind CSS",
      icon: tailwind,
    },
    {
      name: "Node JS",
      icon: nodejs,
    },
    {
      name: "MongoDB",
      icon: mongodb,
    },
    {
      name: "Three JS",
      icon: threejs,
    },
    {
      name: "git",
      icon: git,
    },
    {
      name: "figma",
      icon: figma,
    },
    {
      name: "docker",
      icon: docker,
    },
  ];
  
  const experiences = [
    {
      title: "Data Analyst",
      company_name: "Telone",
      location: "Bulawayo, Zimbabwe",
      iconBg: "#E6DEDD",
      icon: telone,
      date: "Sep 2021 - Aug 2022",
      points: [
        "Developed automated data collection processes using Excel and PowerBI, reducing manual effort by 50%, and ensuring consistent and accurate data retrieval.",
        "Achieved a 23% surge in FTTH recovery rate during the initial 2 quarters of 2021.",
        "Created interactive dashboards using Tableau and streamlined management's data-driven decisions, enhancing visual data interpretation and reducing analysis time by 30%.",
        "Automated generation of monthly performance reports using Excel macros, saving 20 hours of manual effort per month and improving report accuracy.",
        "Implemented data cleaning and validation procedures with OpenRefine, resulting in a 30% increase in KYC data accuracy."
      ],
    },
    {
      title: "Teaching Assistant",
      company_name: "Emzini We Code",
      location: "Hybrid",
      iconBg: "#383E56",
      icon: ewc,
      date: "Feb 2023 - Aug 2023",
      points: [
        "Conducted weekly office hours, providing comprehensive support to an average of 30 students, resulting in a 75% increase in the comprehension of complex Python programming concepts.",
        "Monitored and optimized the course website 3 times every week, ensuring that course materials and announcements were up-to-date, on time, and easily accessible to students.",
        "Graded student labs, tests, and projects on Gradescope, facilitated discussions on Piazza, and gave feedback within 36 hours, boosting student engagement by 50%.",
        "Mentored 300+ students on complex programming topics, resulting in a 35% increase in labs performance and proficiency in real-world problem-solving among students."
      ],
    }
  ];
  
  
  const testimonials = [
    {
      testimonial:
        "Great progress man! I am proud of the work you have been doing and your zeal to learn new languages and technologies over the past couple of years! Proud mentor.",
      name: "Andile Mbele",
      designation: "Co-Founder",
      company: "Qu Stack | Co-founder of  Rooibos Radar",
      image: "https://assets.reactbricks.com/7RGlvboX1CS42u-/images/src_set/snSZpakDutuywOF-800/andilejadenmbele.webp",
    },
    {
      testimonial:
        "Your dedication and awesome work ethic has a great impact and progressive effect to the Emzini we Code community. Thank you for your continued willingness to support.",
      name: "Eric Khumalo",
      designation: "Data Scientist & Privacy Engineer",
      company: "Good Research | Founder & Head Instructor at Emzini we Code",
      image: "https://assets.reactbricks.com/7RGlvboX1CS42u-/images/src_set/dfHtNR0PAMYu6Sk-123/eric-1x.webp",
    },
    {
      testimonial:
        "I am impressed by the brilliant work you are doing in such a short period of time since you arrived, I am optimistic that we will cover a lot of ground and be ahead of our goals for this year's quarter 1 and 2.",
      name: "Temba Ngwenya",
      designation: "Client Relations Associate",
      company: "TelOne",
      image: "https://assets.reactbricks.com/7RGlvboX1CS42u-/images/src_set/XCBivarIyrKVIIK-225/temba.webp",
    },
  ];
  
  const projects = [
    {
      name: "DegaMate",
      description:
        "Your ultimate companion for navigating around College campus with ease and confidence. Explore our detailed 3D interactive map, take virtual tours, get real-time navigation, and learn about campus locations including facilities, operating hours, and special features.",
      tags: [
        {
          name: "Swift",
          color: "orange-text-gradient"
        },
        {
          name: "Xcode",
          color: "purple-text-gradient"
        },
        
      ],
      image: degamate,
      source_code_link: "https://github.com/Thabhelo/DegaMate",
    },
    {
      name: "Ta' Chat",
      description:
        "A realtime web chat application built using Django, Django Channels, WebSocket technology, and styled with TailwindCSS.",
      tags: [
        {
          name: "django",
          color: "green-text-gradient",
        },
        {
          name: "mongodb",
          color: "green-text-gradient",
        },
        {
          name: "tailwind",
          color: "pink-text-gradient",
        },
      ],
      image: carrent,
      source_code_link: "https://github.com/Thabhelo/web-chatapp",
    },
    {
      name: "AAFlight Tracker",
      description:
        "A web app for tracking flights and provide real-time updates to parents about the whereabouts of their unaccompanied minor children. The app utilizes the OpenSky API to retrieve flight data in JSON, Pandas for data manipulation and Bokeh for visualization.",
      tags: [
        {
          name: "react",
          color: "blue-text-gradient",
        },
        {
          name: "restapi",
          color: "green-text-gradient",
        },
        {
          name: "pandas",
          color: "pink-text-gradient",
        },
      ],
      image: jobit,
      source_code_link: "https://github.com/Thabhelo/talladega-besmart/",
    },
    {
      name: "GravitySim",
      description:
        "A simple yet captivating Unity 3D simulations of the mesmerizing effects of gravity on spheres and cubes falling, colliding, and interacting in a controlled environment.",
      tags: [
        {
          name: "C#",
          color: "blue-text-gradient",
        },
        {
          name: "Unity",
          color: "green-text-gradient",
        },
        {
          name: "OpenGL",
          color: "pink-text-gradient",
        },
      ],
      image: tripguide,
      source_code_link: "https://github.com/Thabhelo/GravitySim",
    },
    
  ];
  
  export { services, technologies, experiences, testimonials, projects };