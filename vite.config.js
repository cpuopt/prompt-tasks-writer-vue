import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import monkey, { cdn } from 'vite-plugin-monkey';

import AutoImport from 'unplugin-auto-import/vite';
import Components from 'unplugin-vue-components/vite';
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers';
import obfuscator from 'rollup-plugin-obfuscator';

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [
        vue(),
        AutoImport({
            resolvers: [ElementPlusResolver()]
        }),
        Components({
            resolvers: [ElementPlusResolver()]
        }),

        monkey({
            entry: 'src/main.js',
            userscript: {
                icon: 'https://www.google.com/s2/favicons?sz=64&domain=novelai.net',
                namespace: 'https://www.cpufan.top/index.php/2024/03/18/novelai-prompts-task-writer/',
                version: '0.0.1.240510',
                match: ['https://novelai.net/image'],
                author: 'cpuopt',
                description: {
                    '': 'Novel AI 绘图 提示词任务队列编辑器'
                }
            },
            build: {
                externalGlobals: {
                    vue: cdn.jsdelivr('Vue', 'dist/vue.global.prod.js')
                }
            }
        })
    ]
});
