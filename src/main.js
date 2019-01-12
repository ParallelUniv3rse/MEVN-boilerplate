import '@babel/polyfill';

/**
 * Import Dependency
 */
import Vue from 'vue';
import router from './router/index';
import store from './store/index';
import i18n from './locales/index';

/**
 * Import Component (.vue)
 */
import App from './App.vue';

/**
 * Global Config
 */
Vue.config.productionTip = false;
const EventBus = new Vue();
Object.defineProperties(Vue.prototype, {
  $bus: {
    get() {
      return EventBus;
    },
  },
});

const lang = store.state.language;
if (lang) {
  i18n.locale = lang;
}

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  i18n,
  render: h => h(App),
});
