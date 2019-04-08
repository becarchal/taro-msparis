import Taro from '@tarojs/taro'
import { create } from 'dva-core';
import { createLogger } from 'redux-logger';
import createLoading from 'dva-loading';
import { persistEnhancer } from 'dva-model-persist';

let app;
let store;
let dispatch;

const storage = {
  get: Taro.getStorageSync,
  set: Taro.setStorageSync,
}
function createApp(opt) {
  // redux日志
  // opt.onAction = [createLogger()];
  // 1. Initialize
  app = create(opt);
  app.use(createLoading({}));
  app.use({
    // model持久化插件
    extraEnhancers: [
      persistEnhancer({
        // key: 'model', 默认model
        storage, // 默认session
        // blacklist: [ // 黑名单
        //   '@@dva',
        //   'routing'
        // ], // 默认值
        // whitelist: ['cdmGlobal'] // 白名单
        // keyPrefix: 'persist', // 默认值
      })
    ]
  });
  if (!global.registered) opt.models.forEach(model => app.model(model));
  global.registered = true;
  app.start();

  store = app._store;
  app.getStore = () => store;

  dispatch = store.dispatch;

  app.dispatch = dispatch;
  return app;
}

export default {
  createApp,
  getDispatch() {
    return app.dispatch;
  }
}
