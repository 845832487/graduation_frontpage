import { createRouter, createWebHistory } from 'vue-router'


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
        path: "/home",
        name: "home",
        component:()=>import('../views/Home')
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

export default router
