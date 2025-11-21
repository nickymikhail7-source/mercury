/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                mercury: {
                    blue: '#1E40AF', // Deep Blue
                    green: '#10B981', // Emerald Green
                    dark: '#0F172A', // Slate 900 for backgrounds
                    light: '#F8FAFC', // Slate 50 for backgrounds
                }
            },
            fontFamily: {
                sans: ['Inter', 'sans-serif'],
            }
        },
    },
    plugins: [],
}
