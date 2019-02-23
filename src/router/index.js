import Vue from 'vue'
import Router from 'vue-router'
import store from '@/store'
import Login from '@/components/login'
import Register from '@/components/register'
import ForgetPassword from '@/components/forget-password'
import Home from '@/components/home'
import AccountDetails from '@/views/account-details'
import Personal from '@/views/personal'
import ModifyName from '@/views/modify-name'
import ModifyMobile from '@/views/modify-mobile'
import ModifyPassword from '@/views/modify-password'
import HistoricalQuiz from '@/views/historical-quiz'
import Message from '@/views/message'
import { getToken, setToken } from '@/libs/utils'
import Withraw from '@/components/withraw'
Vue.use(Router)
const LOGIN_PAGE_NAME = 'login'

const router = new Router({
  routes: [
    {
      path: '/',
      name: 'index',
      component: Home,
      redirect: { name: 'home' },
      children: [
        {
          path: '/home',
          name: 'home',
          component: Home,

        },
      ],
    },
    {
      path: '/login',
      component: Login,
      name: 'login',
    },
    {
      path: '/register',
      name: 'register',
      component: Register
    },
    {
      path: '/forget-password',
      name: 'forget-password',
      component: ForgetPassword
    },
    {
      path: '/account-details',
      name: 'account-details',
      component: AccountDetails
    },
    {
      path: '/personal',
      name: 'personal',
      component: Personal
    },
    {
      path: '/modify-name',
      name: 'modify-name',
      component: ModifyName
    },
    {
      path: '/modify-password',
      name: 'modify-password',
      component: ModifyPassword
    },
    {
      path: '/modify-mobile',
      name: 'modify-mobile',
      component: ModifyMobile
    },
    {
      path: '/modify-password',
      name: 'modify-password',
      component: ModifyPassword
    },
    {
      path: '/historical-quiz',
      name: 'historical-quiz',
      component: HistoricalQuiz
    },
    {
      path: '/message',
      name: 'message',
      component: Message
    },
    {
      path: '/withraw',
      name: 'withraw',
      component: Withraw
    },
  ]
})

export default router
