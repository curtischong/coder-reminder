/** @type {import("tailwindcss").Config} */
module.exports = {
    content: ["./dist/*.{js,jsx,ts,tsx,html}"], // template files go here
    variants: {
        extend: {},
    },
    plugins: [],
    corePlugins: {
        // tailwind's @base has opinionated styles. It changes all the links on google for example.
        // setting preflight to false removes these opinionated styles
        // https://stackoverflow.com/questions/72654538/tailwind-css-breaking-existing-styles
        preflight: true,
    },
    theme: {
        colors: {
            // color names found via this website: https://www.color-name.com/hex/ff947d
            "light-salmon": "#FF947D",
            "maya-blue": "#66CCFF",
        },
    },
};
