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

const originalreplace = Router.prototype.replace;;
Router.prototype.replace = function replace(location) {
  return originalreplace.call(this, location).catch(err => err)
}

const login = (resolve) => require(["@/page/login.vue"], resolve);
const routercontainer = (resolve) => require(["@/components/routercontainer"], resolve);
const container = (resolve) => require(["@/page/ApprLawItems/ApprLawItems-container"], resolve);
const analysis = (resolve) => require(["@/page/ApprLawItems/ApprLawItems-analysis"], resolve);
const editor = (resolve) => require(["@/page/ApprLawItems/ApprLawItems-container-editor"], resolve);
const roomPassword = (resolve) => require(["@/page/ApprLawItems/room-password"], resolve);


const router = new Router({
  routes: [
    { path: '/login',
      name: 'login', 
      component: login 
    },
    { path: '/',
      redirect: '/login'
    },
    {
      path: '/ApprLawItems-container',
      name: 'ApprLawItems',
      component: routercontainer,
      children: [
        { path: '/ApprLawItems-container', name: 'ApprLawItems-container', component: container },
        { path: '/ApprLawItems-analysis', name: 'ApprLawItems-analysis', component: analysis },
        { path: '/ApprLawItems-container-editor', name: 'editor-noshowNav', component: editor },
        { path: '/room-password', name: 'roomPassword', component: roomPassword }
        // 在父路由下面归为子路由，自动拼接到父路由下，会只渲染在第二个 router-view
      ]
    },

    // {
    //   path: '/Law', 
    //   name: 'Law',
    //   redirect: '/Law-library', 
    //   component: resolve => require(['@/components/routercontainer'], resolve),
    //   children: [
    //     { path: '/Law-library', name: 'Law-library', component: resolve => require(['@/page/Law/Law-library'], resolve) },
    //     { path: '/Law-library-result', name: 'Law-library-result', component: resolve => require(['@/page/Law/Law-library-result'], resolve) },
    //     { path: '/Law-container', name: 'Law-container', component: resolve => require(['@/page/Law/Law-container'], resolve) },
    //     { path: '/Law-container1', name: 'Law-container1', component: resolve => require(['@/page/Law/Law-container1'], resolve) },
    //     { path: '/Law-container2', name: 'Law-container2', component: resolve => require(['@/page/Law/Law-container2'], resolve) },
    //     { path: '/Law-container3', name: 'Law-container3', component: resolve => require(['@/page/Law/Law-container3'], resolve) }

    //     // 在父路由下面归为子路由，自动拼接到父路由下，会只渲染在第二个 router-view
    //   ]
    // },
    { path: '/Survey', name: 'Survey', component: resolve => require(['@/page/survey'], resolve) },
    
  ]
})



router.beforeEach((to, from, next) => {
  if (!sessionStorage.getItem("token") && to.name !== 'login' ) {
    Vue.prototype.$message({
      message: '请登录!',
      type: 'warning'
    });
    setTimeout(()=>{
      next({name:'login'})
    },1000)
  } else {
  }
  next();
});

export default router
