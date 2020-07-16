// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
/*
    入口文件：创建Vue实例
 */

import Vue from 'vue'
import App from './App'

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  components: { App:App},//将组件APP(后一个)映射名为APP（前一个）
  template: '<App/>'
});
