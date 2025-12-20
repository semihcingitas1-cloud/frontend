/** @type {import('tailwindcss').Config} */

module.exports = {

  content: [

    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {

    extend: {

      animation: {

        'spinner': 'spin 1s linear infinite',
      },
      keyframes: {

        spin: {

          '0%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(360deg)' },
        }
      },
      backgroundImage: { 

        'instagram': 'radial-gradient(circle at 30% 107%, #fdf497 0%, #fdf497 5%, #fd5949 45%, #d6249f 60%, #285AEB 90%)',
      },
      colors: {

        'facebook': '#1877F2',
        'twitter': '#14171A',
        'pinterest': '#E60023',
        'reddit': '#FF4500',
        'snapchat': '#FFFC00',
        'linkedin': '#0077B5',
        'whatssapp': '#25D366'
      },
    },
  },
  plugins: [],
}