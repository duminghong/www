import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { defineConfig } from "vite";

import UnoCSS from "unocss/vite";
import autoprefixer from "autoprefixer";
import postcssNested from "postcss-nested";
import postcssCustomMedia from "postcss-custom-media";
import cssnano from "cssnano";
import { createHtmlPlugin } from "vite-plugin-html";

const __dirname = dirname(fileURLToPath(import.meta.url));

export default defineConfig({
  // 插件配置
  plugins: [
    UnoCSS(), // 集成UnoCSS
    // HTML压缩插件
    createHtmlPlugin({
      minify: {
        collapseWhitespace: true,
        removeComments: true,
        removeRedundantAttributes: true,
        removeScriptTypeAttributes: true,
        removeStyleLinkTypeAttributes: true,
        useShortDoctype: true,
        minifyCSS: true,
        minifyJS: true,
      },
    }),
  ],

  // 路径别名配置
  resolve: {
    alias: {
      // @ 指向 src 目录
      "@": resolve(__dirname, "src"),
      // @assets 指向 src/assets 目录
      "@assets": resolve(__dirname, "src/assets"),
      "@css": resolve(__dirname, "src/assets/css"),
      "@js": resolve(__dirname, "src/assets/js"),
      // @utils 指向 src/utils 目录
      "@utils": resolve(__dirname, "src/utils"),
    },
  },

  // 公共静态资源目录
  publicDir: "public",

  // 多页面应用配置
  build: {
    outDir: "dist", // 输出目录
    assetsDir: "assets", // 静态资源目录
    sourcemap: true, // 生成sourcemap
    minify: "terser", // 压缩方式
    terserOptions: {
      compress: {
        drop_console: true, // 生产环境移除console
        drop_debugger: true, // 生产环境移除debugger
      },
    },
    rollupOptions: {
      input: {
        // 主页
        main: resolve(__dirname, "index.html"),
        // 404页面
        404: resolve(__dirname, "src/404.html"),
        // 1024页面
        1024: resolve(__dirname, "src/pages/1024/index.html"),
        // love页面
        love: resolve(__dirname, "src/pages/love/index.html"),
        // filter页面
        filter: resolve(__dirname, "src/pages/filter/index.html"),
      },
    },
  },

  // 开发服务器配置
  server: {
    port: 3000,
    open: true, // 自动打开浏览器
    // 配置历史模式路由回退
    historyApiFallback: true,
  },

  // CSS配置
  css: {
    preprocessorOptions: {
      less: {
        javascriptEnabled: true,
        // 全局变量
        modifyVars: {
          // 在这里可以定义全局Less变量
          "primary-color": "#e70217",
          "secondary-color": "#00E6F6",
          "background-color": "#181818",
          "text-color": "#ffffff",
        },
      },
    },
    // PostCSS配置
    postcss: {
      plugins: [
        // 自动添加浏览器前缀
        autoprefixer(),
        // 支持嵌套语法
        postcssNested(),
        // 支持自定义媒体查询
        postcssCustomMedia(),
        // 仅在生产环境压缩CSS
        ...(process.env.NODE_ENV === "production"
          ? [
              cssnano({
                preset: "default",
              }),
            ]
          : []),
      ],
    },
    // 开发环境启用CSS source maps
    devSourcemap: true,
  },

  // 静态资源处理
  assetsInclude: [
    "**/*.svg",
    "**/*.png",
    "**/*.jpg",
    "**/*.jpeg",
    "**/*.gif",
    "**/*.webp",
  ],
});
