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

const pathSrc = path.resolve(__dirname, 'src');

export default defineConfig({
  resolve: {
    alias: {
      '@': pathSrc,
    },
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `@use "@/assets/css/element-variables.scss" as *;`,
      },
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
      eslint: {
        lintCommand: 'eslint "./src/**/*.{ts,tsx}"',
      },
    }),
  ],
});
