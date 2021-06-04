export default {
  up(point) {
    const breakPoints = {
      xs: "575.98px",
      sm: "767.98px",
      md: "991.98px",
      lg: "1199.98px",
      xl: "1439.98px",
    };
    return `@media (min-width: ${breakPoints[point]})`;
  },

  down(point) {
    const breakPoints = {
      xxs: "400px",
      xs: "575.98px",
      sm: "767.98px",
      md: "991.98px",
      lg: "1199.98px",
      xl: "1439.98px",
    };

    return `@media (max-width: ${breakPoints[point]})`;
  },
};
