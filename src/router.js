import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [{
      path: '/',
      redirect: '/dashboard'
    },
    {
      path: '/',
      component: () => import( /* webpackChunkName: "home" */ './views/Home.vue'),
      meta: {
        title: '自述文件'
      },
      children: [{
          path: '/dashboard',
          component: () => import( /* webpackChunkName: "dashboard" */ './views/Dashboard.vue'),
          meta: {
            title: '系统首页'
          }
        },
        {
          path: '/employee',
          component: () => import( /* webpackChunkName: "form" */ './views/Employee.vue'),
          meta: {
            title: '员工管理'
          }
        },
        {
          path: '/position',
          component: () => import( /* webpackChunkName: "form" */ './views/Position.vue'),
          meta: {
            title: '职位管理'
          }
        },
        {
          path: '/section',
          component: () => import( /* webpackChunkName: "form" */ './views/Section.vue'),
          meta: {
            title: '部门管理'
          }
        },
        {
          path: '/setting',
          component: () => import( /* webpackChunkName: "form" */ './views/Setting.vue'),
          meta: {
            title: '系统设置'
          }
        },
        {
          path: '/404',
          component: () => import(/* webpackChunkName: "404" */ './views/404.vue'),
          meta: { title: '404' }
      },
      ]
    },
    {
      path: '/login',
      component: () => import( /* webpackChunkName: "login" */ './views/Login.vue'),
      meta: {
        title: '登录'
      }
    },
    {
      path: '*',
      redirect: '/404'
    }
  ]
})