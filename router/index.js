import Vue from 'vue'
import Router from 'vue-router'
import JobList from '@/components/JobList'
import JobDetail from '@/components/JobDetail'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      redirect: '/joblist'
    },
    {
      path: '/joblist',
      name: 'JobList',
      component: JobList,
    },
    {
      path: '/jobdetail/:id',
      name: 'JobDetail',
      component: JobDetail
    },
  ]
})
