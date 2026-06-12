/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                primary: {
                    DEFAULT: '#66BB6A', // Green from logo
                    light: '#81C784',
                    dark: '#4CAF50',
                },
                secondary: {
                    DEFAULT: '#1A1A1A', // Asphalt Black
                    light: '#333333',
                    dark: '#000000',
                },
                slate: {
                    50: '#F4F4F2', // Concrete Grey
                    100: '#EBEBE9',
                    200: '#DMDCDA',
                    300: '#C7C7C5',
                    400: '#A1A1A0',
                    500: '#7A7A79',
                    600: '#5C5C5B',
                    700: '#3D3D3C',
                    800: '#1F1F1E',
                    900: '#141413',
                }
            },
            fontFamily: {
                heading: ['Montserrat', 'sans-serif'],
                body: ['Poppins', 'sans-serif'],
            },
            backgroundImage: {
                'hero-pattern': "url('https://images.unsplash.com/photo-1541888946425-d81bb19240f5?q=80&w=2070&auto=format&fit=crop')", // Construction site background
            },
            animation: {
                marquee: 'marquee 25s linear infinite',
            },
            keyframes: {
                marquee: {
                    '0%': { transform: 'translateX(0%)' },
                    '100%': { transform: 'translateX(-50%)' },
                }
            }
        },
    },
    plugins: [],
}
