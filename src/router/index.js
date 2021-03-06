import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/views/layout/Layout'

/* Router Modules */
/* import componentsRouter from './modules/components'
import chartsRouter from './modules/charts'
import tableRouter from './modules/table'
import treeTableRouter from './modules/tree-table'
import nestedRouter from './modules/nested'*/

/**
* hidden: true                   if `hidden:true` will not show in the sidebar(default is false)
* alwaysShow: true               if set true, will always show the root menu, whatever its child routes length
*                                if not set alwaysShow, only more than one route under the children
*                                it will becomes nested mode, otherwise not show the root menu
* redirect: noredirect           if `redirect:noredirect` will no redirect in the breadcrumb
* name:'router-name'             the name is used by <keep-alive> (must set!!!)
* meta : {
    roles: ['admin','editor']    will control the page roles (you can set multiple roles)
    title: 'title'               the name show in sub-menu and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar
    noCache: true                if true, the page will no be cached(default is false)
    breadcrumb: false            if false, the item will hidden in breadcrumb(default is true)
    affix: true                  if true, the tag will affix in the tags-view
  }
**/
export const constantRoutes = [
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },
  {
    path: '/404',
    component: () => import('@/views/errorPage/404'),
    hidden: true
  },
  {
    path: '/401',
    component: () => import('@/views/errorPage/401'),
    hidden: true
  }

]

export default new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})

export const asyncRoutes = [
  { path: '*', redirect: '/404', hidden: true },
  {
    path: '',
    component: Layout,
    redirect: 'dashboard',
    children: [
      {
        path: 'dashboard',
        component: () => import('@/views/dashboard/index'),
        name: 'Dashboard',
        meta: { title: 'dashboard', icon: 'dashboard', noCache: true, affix: true }
      }
    ]
  },
  {
    path: '/adminManage',
    component: Layout,
    meta: { title: 'adminManage', icon: 'user', roles: ['admin:manage'] },
    children: [{
      path: 'roleManage',
      component: () => import('@/views/admin/roleManage'),
      name: 'roleManage',
      meta: { title: 'roleManage', roles: ['role:manage', 'role:edit', 'role:del'] }
    }, {
      path: 'adminList',
      component: () => import('@/views/admin/adminList'),
      name: 'adminList',
      meta: { title: 'adminList', roles: ['admin:list', 'admin:edit', 'admin:del'] }
    }]
  },
  {
    path: '/workerManage',
    component: Layout,
    meta: { title: 'workerManage', icon: 'worker', roles: ['worker:manage'] },
    children: [
      {
        path: 'workerType',
        component: () => import('@/views/workerManage/workerType'),
        name: 'workerType',
        meta: { title: 'workerType', roles: ['depart:manage', 'depart:edit', 'depart:del', 'depart:add'] }
      },
      {
        path: 'workerRegister',
        component: () => import('@/views/workerManage/workerRegister'),
        name: 'workerRegister',
        meta: { title: 'workerRegister', noCache: false, roles: ['real:register', 'ocr'] }
      }, {
        path: 'workerEdit',
        component: () => import('@/views/workerManage/workerEdit'),
        name: 'workerEdit',
        meta: { title: 'workerEdit', roles: ['real:manage', 'real:edit', 'real:del'] }

      }

    ]
  },
  {
    path: '/capture',
    component: Layout,
    meta: { title: 'captureRecord', icon: 'workerRegister', roles: ['capture:record'] },
    children: [
      {
        path: '/workerRecord',
        component: () => import('@/views/capture/workerRecord'),
        name: 'workerRecord',
        meta: { title: 'workerRecord', roles: ['woker:record', 'record:del'] }
      },
      {
        path: '/stangerRecord',
        component: () => import('@/views/capture/strangerRecord'),
        name: 'stranger',
        meta: { title: 'stranger', roles: ['stranger:record', 'stranger:dl'] }
      }
    ]
  },
  {
    path: '/systemDevice',
    component: Layout,
    meta: { title: 'systemDevice', icon: 'system', roles: ['device:manage'] },
    children: [
      {
        path: '/deviceManage',
        component: () => import('@/views/device/device'),
        name: 'deviceManage',
        meta: { title: 'deviceManage', roles: ['device:manage', 'device:del'] }
      }
    ]
  }
]
