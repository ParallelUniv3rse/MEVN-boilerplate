/**
 * Import Dependency
 */
import Vue from 'vue';
import VueI18n from 'vue-i18n';

/**
 * Import Language
 */
import en from './i18n/en_US.json';
import cn from './i18n/zh_CN.json';

/**
 * Config
 */
Vue.use(VueI18n);

/**
 * Export
 */
export default new VueI18n({
  locale: 'en',
  messages: {
    en: {
      lang: en,
    },
    cn: {
      lang: cn,
    },
  },
});
