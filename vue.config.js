const { defineConfig } = require('@vue/cli-service');

const AutoImport = require('unplugin-auto-import/webpack');
const AutoComponent = require('unplugin-vue-components/webpack');
const Icons = require('unplugin-icons/webpack');
const IconsResolver = require('unplugin-icons/resolver');
const { FileSystemIconLoader } = require('unplugin-icons/loaders');

const { ElementPlusResolver } = require('unplugin-vue-components/resolvers');

const VueMacros = require('unplugin-vue-macros/webpack');
const { resolve } = require('path');

module.exports = defineConfig({
  transpileDependencies: true,
  productionSourceMap: process.env.NODE_ENV !== 'production',
  publicPath: '/',
  configureWebpack: {
    plugins: [
      VueMacros({}),
      AutoImport({
        // dts: './typing/auto.import.d.ts',
        dts: false,
        imports: [
          'vue',
          'vue-router',
          'pinia',
          '@vueuse/core',
          {
            from: 'vue-router',
            imports: ['RouteRecordRaw'],
            type: true,
          },
        ],
        eslintrc: {
          enabled: false,
          filepath: './.eslintrc-auto-import.json',
        },
        resolvers: [ElementPlusResolver()],
      }),
      AutoComponent({
        dts: './typing/auto.components.d.ts',
        // dts: false,
        resolvers: [
          IconsResolver({
            componentPrefix: 'icon',
            enabledCollections: ['ep'],
            customCollections: ['sy'],
          }),
          ElementPlusResolver(),
        ],
      }),
      Icons({
        compiler: 'vue3',
        autoInstall: true,
        customCollections: {
          sy: FileSystemIconLoader('src/assets/svgs', (svg) => {
            return svg.replace(/^<svg /, '<svg fill="currentColor" ');
          }),
        },
      }),
    ],
  },
  css: {
    loaderOptions: {
      scss: {
        additionalData: `@use "@/styles/mixins.scss" as *;`,
      },
    },
  },
  chainWebpack: (config) => {
    config.resolve.alias.set('@', resolve('src'));
    config.module.rule('svg').exclude.add(resolve('src/assets/svgs')).end();
    config.module
      .rule('icons')
      .test(/\.svg$/)
      .include.add(resolve('src/assets/svgs'))
      .end()
      .use('svg-sprite-loader')
      .loader('svg-sprite-loader')
      .options({
        symbolId: 'icon-[name]',
      })
      .end();
  },
  devServer: {
    proxy: {
      '/api': {
        target: 'http://localhost:8080',
        changeOrigin: true,
        pathRewrite: {
          '^/api': '',
        },
      },
    },
  },
});
