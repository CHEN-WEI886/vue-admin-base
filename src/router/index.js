/*
 * @Descripttion: 
 * @version: 
 * @Author: sueRimn
 * @Date: 2021-06-18 08:50:05
 * @LastEditors: sueRimn
 * @LastEditTime: 2021-06-22 14:07:50
 */
import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const router = new Router({
  routes: [
    {
      path: '/',
      name: 'ApprLawItems',
      keepAlive:true,
      redirect: '/ApprLawItems-container',
      component: resolve => require(['@/components/routercontainer'], resolve),
      children: [
        { path: '/ApprLawItems-container', name: 'ApprLawItems-container', component: resolve => require(['@/page/ApprLawItems/ApprLawItems-container'], resolve) },
        { path: '/ApprLawItems-container1', name: 'ApprLawItems-container1', component: resolve => require(['@/page/ApprLawItems/ApprLawItems-container1'], resolve) },
        { path: '/ApprLawItems-container2', name: 'ApprLawItems-container2', component: resolve => require(['@/page/ApprLawItems/ApprLawItems-container2'], resolve) },
        { path: '/ApprLawItems-analysis', name: 'ApprLawItems-analysis', component: resolve => require(['@/page/ApprLawItems/ApprLawItems-analysis'], resolve) },
        { path: '/ApprLawItems-container-editor', name: 'editor-noshowNav', component: resolve => require(['@/page/ApprLawItems/ApprLawItems-container-editor'], resolve) }
        // 在父路由下面归为子路由，自动拼接到父路由下，会只渲染在第二个 router-view
      ]
    },
    {
      path: '/ApprLawItems',
      name: '',
      redirect: '/ApprLawItems-container',
    },

    {
      path: '/Law', 
      name: 'Law',
      redirect: '/Law-library', 
      component: resolve => require(['@/components/routercontainer'], resolve),
      children: [
        { path: '/Law-library', name: 'Law-library', component: resolve => require(['@/page/Law/Law-library'], resolve) },
        { path: '/Law-library-result', name: 'Law-library-result', component: resolve => require(['@/page/Law/Law-library-result'], resolve) },
        { path: '/Law-container', name: 'Law-container', component: resolve => require(['@/page/Law/Law-container'], resolve) },
        { path: '/Law-container1', name: 'Law-container1', component: resolve => require(['@/page/Law/Law-container1'], resolve) },
        { path: '/Law-container2', name: 'Law-container2', component: resolve => require(['@/page/Law/Law-container2'], resolve) },
        { path: '/Law-container3', name: 'Law-container3', component: resolve => require(['@/page/Law/Law-container3'], resolve) }

        // 在父路由下面归为子路由，自动拼接到父路由下，会只渲染在第二个 router-view
      ]
    },
    { path: '/Survey', name: 'Survey', component: resolve => require(['@/page/survey'], resolve) },
    { path: '/login', name: 'login', component: resolve => require(['@/page/login'], resolve) },
    
  ]
})
// router.beforeEach(function(to, from, next) {
//   switch (true) {
//     case (to.name == 'ApprLawItems-container'):
//       sessionStorage.setItem("headerActive",0)
//       break;

//     case (to.name == 'Law-library'):
//       sessionStorage.setItem("headerActive",1)
//     default:
//       break;
//   }
//   // console.log("to=>",to)
//   // console.log("from=>",from)
//   next()
// })

export default router
