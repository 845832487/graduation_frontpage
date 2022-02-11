import { createRouter, createWebHistory } from 'vue-router'
import request from "../utils/request";


const routes = [
  {
    path: "/",
    name: "Layout",
    redirect:"/personalInfo",
    component: ()=>import('../layout/Layout'),
    children:[
      {
        path: "/personalInfo",
        name: "PersonalInfo",
        component: ()=>import('../views/PersonalInfo')
      },
      {
        path: "/studentDetail",
        name: "StudentDetail",
        component:()=>import('../views/StudentDetail')
      }
    ]
  },

  {
    path: "/login",
    name: "login",
    component: ()=>import('../views/Login')
  }
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})
router.beforeEach((to, from, next) => {
  if (to.name !== 'login' && sessionStorage.getItem("auth")!=='1') next({ name: 'login' })
  else next()
})

export default router
