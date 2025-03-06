/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
      "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
      "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
      "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
      extend: {
        backgroundImage: {
          "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
          "gradient-conic":
            "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
        },
        boxShadow: {
          'sm': '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
          'md': '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
          'lg': '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
          'card': '0 2px 5px 0 rgba(0, 0, 0, 0.05)',
          'card-hover': '0 8px 15px 0 rgba(0, 0, 0, 0.07)',
        },
        borderRadius: {
          'xl': '1rem',
        },
        minWidth: {
          '8': '2rem',
        },
        transitionDuration: {
          '200': '200ms',
        },
      },
    },
    plugins: [],
    safelist: [
      'bg-black',
      'text-white',
      'hover:bg-gray-50',
      'hover:shadow-md',
      'hover:-translate-y-1',
      'min-w-5',
      'min-w-8',
      'line-clamp-2',
      'scrollbar-thin',
      'scrollbar-thumb-gray-300',
      'scrollbar-track-transparent',
      'bg-blue-50',
      'text-blue-600',
    ]
  };