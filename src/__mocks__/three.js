export const Vector3 = jest.fn(() => ({
  set: jest.fn(),
  normalize: jest.fn(),
  multiplyScalar: jest.fn(),
}));

export const Scene = jest.fn(() => ({
  add: jest.fn(),
  remove: jest.fn(),
}));

export const PerspectiveCamera = jest.fn(() => ({
  position: { set: jest.fn() },
  lookAt: jest.fn(),
}));

export const WebGLRenderer = jest.fn(() => ({
  setSize: jest.fn(),
  render: jest.fn(),
  domElement: document.createElement('canvas'),
}));

export const Mesh = jest.fn(() => ({
  position: { set: jest.fn() },
  rotation: { set: jest.fn() },
}));

export const SphereGeometry = jest.fn();
export const MeshBasicMaterial = jest.fn();
export const TextureLoader = jest.fn(() => ({
  load: jest.fn(),
}));

export const Clock = jest.fn(() => ({
  getElapsedTime: jest.fn(() => 0),
}));

export const Group = jest.fn(() => ({
  add: jest.fn(),
  remove: jest.fn(),
}));

export default {
  Vector3,
  Scene,
  PerspectiveCamera,
  WebGLRenderer,
  Mesh,
  SphereGeometry,
  MeshBasicMaterial,
  TextureLoader,
  Clock,
  Group,
}; 