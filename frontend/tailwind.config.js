/** @type {import('tailwindcss').Config} */
export default {
    content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
    theme: {
        extend: {
            colors: {
                "primary-color": "var(--primary-color)",
                "secondary-color": "var(--secondary-color)",
                "third-color": "var(--third-color)",
                "fourth-color": "var(--fourth-color)",
                "text-color": "var(--text-color)",
                "test-color": "var(--test-color)",
            },
            animation: {
                slideInFromLeft: "slideInFromLeft 1s ease",
            },
            keyframes: {
                slideInFromLeft: {
                    "0%": {
                        transform: " translateY(20%)",
                        opacity: "0",
                    },

                    "100%": {
                        transform: "translateY(0)",
                        opacity: "1",
                    },
                },
            },
            fontSize: {
                sm: "0.750rem",
                base: "1rem",
                xl: "1.333rem",
                "2xl": "1.777rem",
                "3xl": "2.369rem",
                "4xl": "3.158rem",
                "5xl": "4.210rem",
            },
            fontFamily: {
                heading: "Poppins",
                body: "Poppins",
            },
            fontWeight: {
                normal: "400",
                bold: "700",
            },
        },
    },
    plugins: [],
};
