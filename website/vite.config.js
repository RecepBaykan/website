import { defineConfig } from 'vite';

export default defineConfig({
  optimizeDeps: {
    // Bu, Vite'in ihtiyaç duyduğu modülleri önceden optimize etmesini sağlar
    include: ['quill', 'quill-image-resize-module-react'],
  },
  build: {
    rollupOptions: {
      // Eğer modüller hala uyumsuzsa, buraya Rollup ayarlarını ekleyebilirsiniz

    },
  },
});
