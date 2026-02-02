/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Colores ExtraEDUC para Estudiantes (Azul)
        'primary-blue': '#003d7a',
        'hover-blue': '#004a94',
        'border-blue': '#004a94',
        
        // Colores ExtraEDUC para Profesores (Naranja)
        'primary-orange': '#d97706',  
        'hover-orange': '#ea580c',    
        'border-orange': '#ea580c',
        
        'extraeduc': {
          50: '#e6f0ff',
          100: '#cce0ff',
          200: '#99c2ff',
          300: '#66a3ff',
          400: '#3385ff',
          500: '#0066ff',
          600: '#0055aa',
          700: '#004a94',
          800: '#003d7a',
          900: '#002244',
        },
        
        // Escala de naranjas para profesor
        'profesor-orange': {
          50: '#fff7ed',
          100: '#ffedd5',
          200: '#fed7aa',
          300: '#fdba74',
          400: '#fb923c',
          500: '#f97316',
          600: '#ea580c',
          700: '#d97706',  
          800: '#b45309',
          900: '#92400e',
        }
      },
      fontFamily: {
        sans: ['-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', 'sans-serif'],
      },
      backgroundImage: {
        'active-gradient': 'linear-gradient(90deg, #fb923c 0%, #f97316 50%, #fbbf24 100%)',
        'active-gradient-blue': 'linear-gradient(90deg, #3b82f6 0%, #2563eb 50%, #1d4ed8 100%)',
      }
    },
  },
  plugins: [],
  safelist: [
    // Colores estudiante (azul)
    'bg-[#003d7a]',
    'bg-[#004a94]',
    'border-[#004a94]',
    'from-orange-400',
    'via-orange-500',
    'to-yellow-500',
    
    // Colores profesor (naranja)
    'bg-[#d97706]',
    'bg-[#ea580c]',
    'border-[#ea580c]',
    'from-blue-500',
    'via-blue-600',
    'to-blue-700',
  ]
}