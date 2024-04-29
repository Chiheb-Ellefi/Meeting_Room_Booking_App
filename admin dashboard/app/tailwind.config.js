/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["sans-serif", "Roboto"],
        custom: ["Rubik"],
      },
      backgroundImage: {
        ooredooBg:
          "url('./src/assets/flat-lay-work-space-with-coffee-cup-keyboard.jpg')",
        picture: "url('./src/assets/picture.png')",
        avatar: "url('./src/assets/userAvatar.png')",
      },
    },
  },
  plugins: [],
};
