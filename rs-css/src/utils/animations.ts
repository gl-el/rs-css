export const animateActive = {
  animation: [
    { transform: 'skew(-10deg)' },
    { transform: 'skew(10deg)' },
    { transform: 'skew(-10deg)' },
  ],
  time: {
    duration: 1000,
    iterations: Infinity,
  },
};

export const animateWin = {
  animation: [
    { transform: 'translateY(-600px)' },
  ],
  time: {
    duration: 800,
    iterations: 1,
  },
};

export const animateWrong = {
  animation: [
    { transform: 'translateX(0)' },
    { transform: 'translateX(-5px)' },
    { transform: 'translateX(0)' },
    { transform: 'translateX(5px)' },
  ],
  time: {
    duration: 100,
    iterations: 5,
  },
};
