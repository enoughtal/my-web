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
                        id.includes('node_modules/react/')
                        || id.includes('node_modules/react-dom/')
                        || id.includes('redux')
                        || id.includes('react-router')
                    ) {
                        return 'react'
                    }
                    else if (id.includes('antd')) {
                        return 'antd'
                    }
                },
                inlineDynamicImports: false
            },
        }
    }
})