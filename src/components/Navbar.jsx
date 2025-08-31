import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import thabs from '../assets/thabs.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faTimes } from '@fortawesome/free-solid-svg-icons';
import { useTheme } from '../lib/theme.js';

import { styles } from '../styles';
import { navLinks } from '../constants';

const Navbar = () => {
  const [active, setActive] = useState("");
  const [toggle, setToggle] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const { resolvedTheme, toggleTheme } = useTheme();

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      if (scrollTop > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavLinkClick = (id) => {
    setActive(id);
    if (id.startsWith('#')) {
      const element = document.getElementById(id.substring(1));
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <nav
      className={`${
        styles.paddingX
      } w-full flex items-center py-5 fixed top-0 z-20 ${
        scrolled ? "bg-white/80 dark:bg-primary/80 backdrop-blur" : "bg-transparent"
      } transition-colors`}
    >
      <div className='w-full flex justify-between items-center max-w-7xl mx-auto'>
        <Link
          to='/'
          className='flex items-center gap-2'
          onClick={() => {
            setActive("");
            window.scrollTo(0, 0);
          }}
        >
          <img src={thabs} alt='thabhelos face' className='w-12 h-12 object-contain rounded-xl' />
          <p className='text-zinc-900 dark:text-white text-[18px] font-bold cursor-pointer flex '>
            Thabhelo&nbsp;
            <span className='sm:block hidden'> | 8x Hackathon Winner</span>
          </p>
        </Link>

        <ul className='list-none hidden sm:flex flex-row gap-8'>
          {navLinks.map((link) => (
            <li
              key={link.id}
              className={`${
                active === link.title || location.pathname === link.url
                  ? "text-zinc-900 dark:text-white"
                  : "text-zinc-500 dark:text-secondary"
              } hover:text-zinc-900 hover:dark:text-white text-[16px] font-medium cursor-pointer transition-colors`}
              onClick={() => handleNavLinkClick(link.id)}
            >
              {link.download ? (
                <a href={link.url} download>{link.title}</a>
              ) : link.url ? (
                <Link to={link.url}>{link.title}</Link>
              ) : (
                <a href={`#${link.id}`}>{link.title}</a>
              )}
            </li>
          ))}
          <li>
            <Link to="/blog" className='text-[16px] font-medium text-zinc-600 dark:text-zinc-300 hover:text-zinc-900 hover:dark:text-white'>Blog</Link>
          </li>
          <li>
            <button
              aria-label='Toggle dark mode'
              onClick={toggleTheme}
              className='text-[14px] font-medium text-zinc-600 dark:text-zinc-300 hover:text-zinc-900 hover:dark:text-white border border-zinc-200 dark:border-zinc-700 rounded-full px-3 py-1 transition-colors'
            >
              {resolvedTheme === 'dark' ? 'Dark' : 'Light'}
            </button>
          </li>
        </ul>

        <div className='sm:hidden flex flex-1 justify-end items-center'>
          <FontAwesomeIcon
            icon={toggle ? faTimes : faBars}
            className='w-[28px] h-[28px] text-zinc-900 dark:text-white cursor-pointer'
            onClick={() => setToggle(!toggle)}
          />

          <div
            className={`${
              !toggle ? "hidden" : "flex"
            } p-6 absolute top-20 right-0 mx-4 my-2 min-w-[160px] z-10 rounded-xl border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-black`}
          >
            <ul className='list-none flex justify-end items-start flex-1 flex-col gap-4'>
              {navLinks.map((link) => (
                <li
                  key={link.id}
                  className={`font-poppins font-medium cursor-pointer text-[16px] ${
                    active === link.title || location.pathname === link.url ? "text-zinc-900 dark:text-white" : "text-zinc-500 dark:text-secondary"
                  }`}
                  onClick={() => {
                    setToggle(!toggle);
                    handleNavLinkClick(link.id);
                  }}
                >
                  {link.download ? (
                    <a href={link.url} download>{link.title}</a>
                  ) : link.url ? (
                    <Link to={link.url}>{link.title}</Link>
                  ) : (
                    <a href={`#${link.id}`}>{link.title}</a>
                  )}
                </li>
              ))}
              <li className='pt-2 border-t border-zinc-200 dark:border-zinc-700 w-full'>
                <button
                  aria-label='Toggle dark mode'
                  onClick={() => {
                    toggleTheme();
                    setToggle(false);
                  }}
                  className='mt-2 text-[16px] font-medium text-zinc-600 dark:text-zinc-300 hover:text-zinc-900 hover:dark:text-white border border-zinc-200 dark:border-zinc-700 rounded-full px-3 py-1 w-full text-left'
                >
                  {resolvedTheme === 'dark' ? 'Dark' : 'Light'} mode
                </button>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;