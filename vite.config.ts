import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  base: '/Smart_Code_Generator_Frontend/',
  plugins: [
    react(),
    tailwindcss(),
  ],
});
