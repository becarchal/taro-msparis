import '@tarojs/async-await'
import Taro, { Component } from '@tarojs/taro'
import { Provider } from '@tarojs/redux'
import Home from './pages/home'
import dva from './utils/dva'
import models from './models'

import './styles/base.scss'

// ENV_TYPE.WEAPP 微信小程序环境
// ENV_TYPE.SWAN 百度小程序环境
// ENV_TYPE.ALIPAY 支付宝小程序环境
// ENV_TYPE.TT 字节跳动小程序环境
// ENV_TYPE.WEB WEB(H5)环境
// ENV_TYPE.RN ReactNative 环境

if (Taro.getEnv() === 'WEAPP') {
  require('taro-ui/dist/weapp/css/index.css')
} else if (Taro.getEnv() === 'WEB') {
  require('taro-ui/dist/h5/css/index.css')
}

const dvaApp = dva.createApp({
  initialState: {},
  models: models,
});
const store = dvaApp.getStore();

class App extends Component {
  // app全局配置
  config = {
    pages: [
      'pages/home/index',
      'pages/cart/index',
      'pages/user/index',
      'pages/detail/index',
      'pages/about/index',
      'pages/size/index',
      'pages/login/index',
      'pages/message/index',
      'pages/couponList/index',
      'pages/order/index'
    ],
    window: {
      backgroundTextStyle: 'dark',
      navigationBarBackgroundColor: '#fff',
      navigationBarTitleText: '时装衣橱',
      navigationBarTextStyle: 'black'
    },
    tabBar: {
      list: [{
        pagePath: 'pages/home/index',
        text: '首页',
        iconPath: './images/tab/home.png',
        selectedIconPath: './images/tab/home-active.png'
      }, {
        pagePath: 'pages/cart/index',
        text: '衣袋',
        iconPath: './images/tab/cart.png',
        selectedIconPath: './images/tab/cart-active.png'
      },{
        pagePath: 'pages/user/index',
        text: '我的',
        iconPath: './images/tab/user.png',
        selectedIconPath: './images/tab/user-active.png'
      }],
      color: '#333',
      selectedColor: '#333',
      backgroundColor: '#fff',
      borderStyle: '#ccc'
    }
  }

  componentDidMount() {

  }

  render() {
    return (<Provider store={store}>
      <Home />
    </Provider>);
  }
}

Taro.render(<App />, document.getElementById('app'))
