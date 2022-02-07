import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import PersonalInfo from '../views/PersonalInfo'
const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/personalInfo",
    name: "PersonalInfo",
    component: PersonalInfo
  }
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
