const Icons = require('unplugin-icons/webpack');
const IconsResolver = require('unplugin-icons/resolver');
const AutoImport = require('unplugin-auto-import/webpack');
const Components = require('unplugin-vue-components/webpack');
const { ElementPlusResolver } = require('unplugin-vue-components/resolvers');
const CompressionWebpackPlugin = require('compression-webpack-plugin');
const GzipExtensions = ['js', 'html', 'css', 'svg', 'png'];

module.exports = {
  filenameHashing: false,
  css: {
    loaderOptions: {
      scss: { additionalData: `@use 'src/assets/css/element-variables.scss' as *;` },
    },
  },
  configureWebpack: (config) => {
    // 按需加载 ElementPlus 组件和样式
    config.plugins.push(
      AutoImport({
        // 自动导入 Vue 相关函数，如：ref, reactive, toRef 等
        imports: ['vue'],
        resolvers: [
          // 自动导入 Element Plus 相关函数，如：ElMessage, ElMessageBox... (带样式)
          ElementPlusResolver(),
          // 自动导入图标组件
          IconsResolver({ prefix: 'Icon' })
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
    );
    if (process.env.NODE_ENV === 'production') {
      // 生产环境开启 gzip 压缩
      config.plugins.push(
        new CompressionWebpackPlugin({
          algorithm: 'gzip', // 压缩协议
          test: new RegExp(`\\.(${GzipExtensions.join('|')})$`), // 匹配文件后缀
          threshold: 10240, // 对超过 10k 的数据进行压缩
          minRatio: 0.8, // 压缩率
          deleteOriginalAssets: false, // 是否删除原文件
        }),
      );
    }
  },
  chainWebpack: (config) => {
    config.optimization.delete("splitChunks");
    // 非入口文件名添加 hash 值
    config.output.chunkFilename('js/[name].[chunkhash].js').end();
    // 清空生产环境控制台日志 (保留 console.error)
    if (process.env.NODE_ENV === 'production') {
      config.optimization.minimizer('terser').tap((args) => {
        args[0].terserOptions.compress.drop_debugger = true;
        args[0].terserOptions.compress.pure_funcs = ['console.log', 'console.warn', 'console.info'];
        args[0].terserOptions.output = { comments: false };
        return args;
      });
    }
  },
};
