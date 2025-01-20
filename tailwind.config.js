/** @type {import('tailwindcss').Config} */
module.exports = {
    purge: ["./src/**/*.{js,jsx,ts,tsx}"],
    content: ["./src/**/*.{ts,tsx}"],
    theme: {
        container: {
            center: true,
            padding: "2rem",
            screens: {
                "2xl": "1400px",
            },
        },
        typography: {
            DEFAULT: {
                css: {
                    "*": {
                        lineHeight: "1.9",
                    },
                    h2: {
                        scrollMarginTop: "5rem",
                        fontSize: "1.675rem",
                        fontWeight: "600",
                    },
                    h3: {
                        scrollMarginTop: "5rem",
                        fontSize: "1.5rem",
                        fontWeight: "600",
                    },
                    h4: {
                        scrollMarginTop: "5rem",
                        fontSize: "1.175rem",
                        fontWeight: "600",
                    },
                    p: {
                        marginTop: "2rem",
                        marginBottom: "2rem",
                    },
                    ".callout-contents > p": {
                        margin: 0,
                    },

                    code: {
                        counterReset: "line",
                    },

                    ":not(pre) > code": {
                        fontWeight: "inherit",
                        position: "relative",
                        bottom: 1,
                        margin: "0 3px",
                        color: "#eb5757",
                        backgroundColor: "rgba(135,131,120,0.15)",
                        fontFamily: '"SFMono-Regular", Menlo, Consolas, "PT Mono", "Liberation Mono", Courier, monospace',
                        borderRadius: 3,
                        padding: "0.2em 0.4em",
                        overflowWrap: "break-word",
                    },

                    "code::before": {
                        content: "none",
                    },
                    "code::after": {
                        content: "none",
                    },

                    "code[data-line-numbers] > [data-line]::before": {
                        counterIncrement: "line",
                        content: "counter(line)",
                        display: "inline-block",
                        width: "1rem",
                        marginRight: "1.4rem",
                        textAlign: "right",
                        color: "lightgrey",
                        fontSize: "0.75rem",
                    },

                    'code[data-line-numbers-max-digits="2"] > [data-line]::before': {
                        width: "1rem",
                    },

                    'code[data-line-numbers-max-digits="3"] > [data-line]::before': {
                        width: "2rem",
                    },

                    pre: {
                        padding: "16px 0",
                        color: "var(--shiki-light)",
                        backgroundColor: "var(--white)",
                        border: "1px solid #e5e7eb",
                        borderRadius: "8px",
                        overflowX: "auto",
                        whiteSpace: "pre-wrap",
                        wordWrap: "break-word",
                    },

                    "pre > code > span": {
                        paddingLeft: "1.1rem",
                        paddingRight: "1rem",
                    },

                    "pre code span": {
                        color: "var(--shiki-light)",
                    },

                    "[data-highlighted-line]": {
                        backgroundColor: "rgba(253, 224, 71, 0.2)",
                    },

                    ".project img": {
                        marginTop: "0px !important",
                    },

                    ".project p,ul,li": {
                        fontSize: 15,
                    },

                    u: {
                        textUnderlineOffset: "4px",
                        textDecorationThickness: 1,
                        fontWeight: 600,
                    },

                    nav: {
                        margin: "4rem 0",
                    },
                    hr: {
                        margin: "2rem 0",
                    },
                },
            },
        },
    },
    plugins: [require("@tailwindcss/typography")],
};
