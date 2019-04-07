const config = {
  projectName: 'taro-msparis',
  date: '2018-9-27',
  // 设计稿尺寸
  designWidth: 750,
  sourceRoot: 'src',
  outputRoot: 'dist',
  // 通用插件配置
  plugins: {
    babel: {
      sourceMap: true,
      presets: [
        'env'
      ],
      plugins: [
        'transform-class-properties',
        'transform-decorators-legacy',
        'transform-object-rest-spread'
      ]
    },
  },
  // 全局变量设置
  defineConstants: {},
  // 小程序端专用配置
  weapp: {
    module: {
      postcss: {
        // css modules 功能开关与相关配置
        // cssModules: {
        //   enable: true, // 默认为 false，如需使用 css modules 功能，则设为 true
        //   config: {
        //     namingPattern: 'module', // 转换模式，取值为 global/module，下文详细说明
        //     generateScopedName: '[name]__[local]___[hash:base64:5]'
        //   }
        // },
        autoprefixer: {
          enable: true
        },
        // 小程序端样式引用本地资源内联配置
        url: {
          enable: true,
          limit: 10240
        }
      }
    }
  },
  // H5 端专用配置
  h5: {
    publicPath: '/',
    staticDirectory: 'static',
    module: {
      postcss: {
        // css modules 功能开关与相关配置
        // cssModules: {
        //   enable: true, // 默认为 false，如需使用 css modules 功能，则设为 true
        //   config: {
        //     namingPattern: 'module', // 转换模式，取值为 global/module，下文详细说明
        //     generateScopedName: '[name]__[local]___[hash:base64:5]'
        //   }
        // },
        autoprefixer: {
          enable: true
        }
      }
    },
    esnextModules: ['taro-ui'], // 由于引用 node_modules 的模块，默认不会编译，所以需要额外给 H5 配置 esnextModules
  }
}

module.exports = function (merge) {
  if (process.env.NODE_ENV === 'development') {
    return merge({}, config, require('./dev'))
  }
  return merge({}, config, require('./prod'))
}
