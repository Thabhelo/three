import '@testing-library/jest-dom';

// Mock environment variables
process.env.VITE_SUPABASE_URL = 'https://test.supabase.co';
process.env.VITE_SUPABASE_ANON_KEY = 'test-anon-key';

// Mock framer-motion to avoid animation issues in tests
jest.mock('framer-motion', () => ({
  motion: {
    div: ({ children, ...props }) => <div {...props}>{children}</div>,
    form: ({ children, ...props }) => <form {...props}>{children}</form>,
    input: ({ children, ...props }) => <input {...props}>{children}</input>,
    button: ({ children, ...props }) => <button {...props}>{children}</button>,
    select: ({ children, ...props }) => <select {...props}>{children}</select>,
    textarea: ({ children, ...props }) => <textarea {...props}>{children}</textarea>,
    span: ({ children, ...props }) => <span {...props}>{children}</span>,
    p: ({ children, ...props }) => <p {...props}>{children}</p>,
    h1: ({ children, ...props }) => <h1 {...props}>{children}</h1>,
    h2: ({ children, ...props }) => <h2 {...props}>{children}</h2>,
    h3: ({ children, ...props }) => <h3 {...props}>{children}</h3>,
    tr: ({ children, ...props }) => <tr {...props}>{children}</tr>,
    td: ({ children, ...props }) => <td {...props}>{children}</td>,
  },
  AnimatePresence: ({ children }) => children,
  Reorder: {
    Group: ({ children, ...props }) => <div {...props}>{children}</div>,
    Item: ({ children, ...props }) => <div {...props}>{children}</div>,
  }
}));

// Mock Three.js components
jest.mock('./components/canvas', () => ({
  EarthCanvas: () => <div data-testid="earth-canvas">Earth Canvas</div>,
  StarsCanvas: () => <div data-testid="stars-canvas">Stars Canvas</div>,
  ComputersCanvas: () => <div data-testid="computers-canvas">Computers Canvas</div>,
  BallCanvas: () => <div data-testid="ball-canvas">Ball Canvas</div>,
}));

// Global test utilities
global.fetch = jest.fn();

// Mock window.alert
global.alert = jest.fn(); 