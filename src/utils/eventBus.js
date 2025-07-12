// src/utils/eventBus.js
const listeners = {};

export const subscribe = (event, callback) => {
  if (!listeners[event]) listeners[event] = [];
  listeners[event].push(callback);
  return () => {
    listeners[event] = listeners[event].filter(cb => cb !== callback);
  };
};

export const emit = (event, data) => {
  (listeners[event] || []).forEach(cb => cb(data));
};
