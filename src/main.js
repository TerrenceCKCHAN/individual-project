import Vue from 'vue';
import VueRouter from 'vue-router';
import './styles/main.less';
import home from './components/home.vue';
import logicCircuit from './components/logicCircuit.vue';
import signup from './components/signup.vue';
import login from './components/login.vue';
import deepLearning from './components/deepLearning.vue';
import userPage from './components/userPage.vue';
import addElement from './components/addElement.vue'
import manageBoard from './components/manageBoard.vue'

// initGlobalErrorHandler();

Vue.use(VueRouter);

const routes = [
  { path: '/deepLearning', component: deepLearning },
  { path: '/logicCircuit', component: logicCircuit },
  { path: '/login', component: login },
  { path: '/signup', component: signup },
  { path: '/userPage', component: userPage },
  { path: '/addElement', component: addElement },
  { path: '/manageBoard', component: manageBoard },
  { path: '*', component: logicCircuit }
  // { path: '*', component: home },
]

const router = new VueRouter({
  routes // short for `routes: routes`
})

const app = new Vue({
  router
}).$mount('#app')

// function initGlobalErrorHandler() {
//   window.onerror = function(msg, source, lineno, colno, error) {
//     var errorData = {
//       desc: msg,
//       url: source,
//       line: lineno,
//       col: colno,
//       stackTrace: error
//         ? JSON.stringify(error)
//         : ''
//     }
//     console.error(JSON.stringify(errorData));
//     return true;
//   }
// }
