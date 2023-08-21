export const variantsForPages = {
  variants: {
    hidden: { opacity: 0, y: 20 },
    opened: { opacity: 1, y: 0 },
    exit: {
      opacity: 0,
      y: 20,
      transition: {
        duration: 0.2,
      },
    },
  },

  initial: "hidden",
  animate: "opened",
  exit: "exit",

  transition: {
    duration: 0.5,
    ease: "easeOut",
  },
};

export const variantsForModals = {
  variants: {
    hidden: { marginTop: 20, opacity: 0 },
    opened: {
      marginTop: 0,
      opacity: 1,
      transition: { duration: 0.1, ease: "easeIn" },
    },
    exit: {
      marginTop: -20,
      opacity: 0,
    },
  },

  initial: "hidden",
  animate: "opened",
  exit: "exit",

  transition: {
    duration: 0.2,
    ease: "easeIn",
  },
};

export const staggerAnimation = {
  container: {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        ease: "easeInOut",
      },
    },
    exit: {
      opacity: 0,
      transition: {
        duration: 2,
      },
    },
  },

  item: {
    hidden: { opacity: 0, y: 10 },
    show: {
      opacity: 1,
      y: 0,
      transtion: {
        ease: "easeIn",
        duration: 0.5,
      },
    },
    exit: {
      opacity: 0,
      y: 10,
    },
  },
};

// export const variantsStagger = {

// }
