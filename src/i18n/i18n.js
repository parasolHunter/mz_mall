import Vue from 'vue'
import VueI18n from 'vue-i18n'
import messages from './langs'
Vue.use(VueI18n)

console.log(messages);
//从localStorage中拿到用户的语言选择，如果没有，那默认中文。
const i18n = new VueI18n({
    locale: localStorage.lang || 'cn',
    messages: messages,
})

export default i18n
