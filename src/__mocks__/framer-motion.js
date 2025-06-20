import React from 'react';

export const motion = {
  div: ({ children, className, ...props }) => 
    React.createElement('div', { className, ...props }, children),
  button: ({ children, className, onClick, ...props }) => 
    React.createElement('button', { className, onClick, ...props }, children),
  section: ({ children, className, ...props }) => 
    React.createElement('section', { className, ...props }, children),
  form: ({ children, className, onSubmit, ...props }) => 
    React.createElement('form', { className, onSubmit, ...props }, children),
  input: ({ className, type, ...props }) => 
    React.createElement('input', { className, type, ...props }),
  textarea: ({ className, ...props }) => 
    React.createElement('textarea', { className, ...props }),
  select: ({ children, className, ...props }) => 
    React.createElement('select', { className, ...props }, children),
  tr: ({ children, className, ...props }) => 
    React.createElement('tr', { className, ...props }, children),
  td: ({ children, className, ...props }) => 
    React.createElement('td', { className, ...props }, children),
  span: ({ children, className, ...props }) => 
    React.createElement('span', { className, ...props }, children),
  p: ({ children, className, ...props }) => 
    React.createElement('p', { className, ...props }, children),
  h1: ({ children, className, ...props }) => 
    React.createElement('h1', { className, ...props }, children),
  h2: ({ children, className, ...props }) => 
    React.createElement('h2', { className, ...props }, children),
  h3: ({ children, className, ...props }) => 
    React.createElement('h3', { className, ...props }, children),
  a: ({ children, className, href, ...props }) => 
    React.createElement('a', { className, href, ...props }, children),
  ul: ({ children, className, ...props }) => 
    React.createElement('ul', { className, ...props }, children),
  li: ({ children, className, ...props }) => 
    React.createElement('li', { className, ...props }, children),
  img: ({ className, src, alt, ...props }) => 
    React.createElement('img', { className, src, alt, ...props }),
};

export const AnimatePresence = ({ children }) => children;

export const useAnimation = () => ({
  start: jest.fn(),
  stop: jest.fn(),
  set: jest.fn(),
});

export const useInView = () => [React.createRef(), true];

export const useMotionValue = (initialValue) => ({
  get: () => initialValue,
  set: jest.fn(),
  onChange: jest.fn(),
});

export const useTransform = () => ({
  get: () => 0,
  set: jest.fn(),
});

export const useSpring = (value) => value;

export default motion; 