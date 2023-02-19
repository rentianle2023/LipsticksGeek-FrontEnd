module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        'hero': "url('../public/images/hero.png')"
      },
      colors: {
        "deep-blue": "#520b22",
        blue: "#3c3e5e",
        red: "#e31a0b",
        yellow: "#FDCC49",
        grey: "#ededed",
        "dark-grey": "#757575",
        "opaque-black": "rgba(0,0,0,0.35)",
      },
      content: {
        brush: "url('../public/images/hero.png')",
        recommendation: "url('../public/images/recommand.png')",
        wiki: "url('../public/images/hero.png')",
        community: "url('../public/images/hero.png')",
      },
    },
  },
  plugins: [],
}