/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        void: '#050506',
        surface: '#0c0c0e',
        surface2: '#111114',
        line: 'rgba(255,255,255,0.08)',
        ivory: '#f3f2ee',
        mute: '#8b8c93',
        signal: '#aebdf2',
        signal2: '#7d8fd9',
      },
      fontFamily: {
        display: ['var(--font-grotesk)', 'sans-serif'],
        body: ['var(--font-inter)', 'sans-serif'],
        mono: ['var(--font-mono)', 'monospace'],
      },
      backgroundImage: {
        'radial-glow':
          'radial-gradient(circle at 50% 0%, rgba(174,189,242,0.14), transparent 60%)',
      },
      keyframes: {
        marquee: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        'marquee-reverse': {
          '0%': { transform: 'translateX(-50%)' },
          '100%': { transform: 'translateX(0)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-14px)' },
        },
        scan: {
          '0%': { transform: 'translateY(-100%)' },
          '100%': { transform: 'translateY(220%)' },
        },
        pulseDot: {
          '0%, 100%': { opacity: 0.4 },
          '50%': { opacity: 1 },
        },
      },
      animation: {
        marquee: 'marquee 38s linear infinite',
        'marquee-reverse': 'marquee-reverse 34s linear infinite',
        float: 'float 6s ease-in-out infinite',
        scan: 'scan 3.5s linear infinite',
        pulseDot: 'pulseDot 2.2s ease-in-out infinite',
      },
    },
  },
  plugins: [],
};
