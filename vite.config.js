import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

export default defineConfig({
    plugins: [react()],
    build: {
        rollupOptions: {
            output: {
                format: 'es',
                manualChunks: (id) => {
                    if (
                        id.includes('views/Tictactoe')
                        || id.includes('tools/game')
                    ) {
                        return 'a'
                    }
                    else if (
                        id.includes('views/Blog')
                        || id.includes('views/About')
                        || id.includes('views/Login')
                        || id.includes('views/Todos')
                        || id.includes('tools/todos')
                    ) {
                        return 'b'
                    }
                },
                inlineDynamicImports: false
            },
        }
    }
})