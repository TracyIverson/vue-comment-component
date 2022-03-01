import XtcComment from './index.vue'

XtcComment.install = function (Vue) {
  Vue.component(XtcComment.name, XtcComment)
}

if (typeof window !== 'undefined' && window.Vue) {
  XtcComment.install(window.Vue)
}

export default XtcComment
