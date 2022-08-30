import path from 'path';
import { defineConfig } from 'vite';
import Vue from '@vitejs/plugin-vue';
import VueJsx from '@vitejs/plugin-vue-jsx';
import Checker from 'vite-plugin-checker';
import Icons from 'unplugin-icons/vite';
import IconsResolver from 'unplugin-icons/resolver';
import AutoImport from 'unplugin-auto-import/vite';
import Components from 'unplugin-vue-components/vite';
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers';

export default defineConfig({
  // 打包静态文件配置
  build: {
    rollupOptions: {
      preserveEntrySignatures: 'allow-extension',
      input: 'src/main.ts',
      output: {
        chunkFileNames: 'js/[name]-[hash].js',
        entryFileNames: 'js/main.js',
        assetFileNames: '[ext]/[name]-[hash].[ext]',
        format: 'systemjs',
      },
    },
  },
  // 本地开发环境跨域处理
  server: { headers: { 'Access-Control-Allow-Origin': '*' } },
  resolve: { alias: { '@': path.resolve(__dirname, 'src') } },
  css: {
    preprocessorOptions: {
      scss: { additionalData: '@use "@/assets/css/element-variables.scss" as *;' },
    },
  },
  plugins: [
    Vue(),
    AutoImport({
      // 自动导入 Vue 相关函数，如：ref, reactive, toRef 等
      imports: ['vue'],
      resolvers: [
        // 自动导入 Element Plus 相关函数，如：ElMessage, ElMessageBox... (带样式)
        ElementPlusResolver(),
        // 自动导入图标组件
        IconsResolver({ prefix: 'Icon' }),
      ],
      dts: 'auto-imports.d.ts',
    }),
    Components({
      resolvers: [
        // 自动注册图标组件
        IconsResolver({ enabledCollections: ['ep'] }),
        // 自动导入 Element Plus 组件
        ElementPlusResolver({ importStyle: 'sass' }),
      ],
      dts: 'components.d.ts',
    }),
    Icons({ autoInstall: true }),
    VueJsx(),
    Checker({
      typescript: true,
      eslint: { lintCommand: 'eslint "./src/**/*.{ts,tsx}"' },
    }),
  ],
});
