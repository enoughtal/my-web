import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

export default defineConfig({
    plugins: [react()],
    build: {
        rollupOptions: {
            output: {
                format: 'es',
                manualChunks: (id) => {
                    if (id.includes('views/Tictactoe')
                        || id.includes('views/Todos')
                        || id.includes('views/Blog')
                        || id.includes('views/About')
                        || id.includes('views/Login')
                        || id.includes('tools/game')
                        || id.includes('tools/todos')
                    ) {
                        return 'a'
                    }
                },
                inlineDynamicImports: false
            },
        }
    }
})