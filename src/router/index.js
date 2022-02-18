import {createRouter, createWebHistory} from 'vue-router'
import request from "../utils/request";


const routes = [
    {
        path: "/",
        name: "Layout",
        redirect: "/personalInfo",
        component: () => import('../layout/Layout'),
        children: [
            {
                path: "/personalInfo",
                name: "PersonalInfo",
                meta: {
                    role: ['student', 'worker', 'admin']
                },
                component: () => import('../views/management/PersonalInfo')
            },
            {
                path: "/studentDetail",
                name: "StudentDetail",
                meta: {
                    role: ['admin', 'worker']
                },
                component: () => import('../views/management/StudentDetail')
            },
            {
                path: "/workerDetail",
                name: "WorkerDetail",
                meta: {
                    role: ['admin']
                },
                component: () => import('../views/management/WorkerDetail')
            },
            {
                path: "/noPermission",
                name: "NoPermission",
                meta: {
                    role: ['student', 'worker', 'admin']
                },
                component: () => import('../views/error/noPermission')
            },
            {
                path: "/notApproved",
                name: "NotApproved",
                meta: {
                    role: ['student', 'worker', 'admin']
                },
                component: () => import('../views/approval/notApproved')
            },
            {
                path: "/Approved",
                name: "Approved",
                meta: {
                    role: ['student', 'worker', 'admin']
                },
                component: () => import('../views/approval/Approved')
            },
            {
                path: "/returnLate",
                name: "ReturnLate",
                meta: {
                    role: ['student', 'admin']
                },
                component: () => import('../views/function/returnLate')
            },
            {
                path: "/repair",
                name: "Repair",
                meta: {
                    role: ['student', 'worker', 'admin']
                },
                component: () => import('../views/function/repair')
            }

        ]
    },

    {
        path: "/login",
        name: "Login",
        meta: {
            role: ['student','worker','admin',null]
        },
        component: () => import('../views/Login')
    }
];

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes
})
router.beforeEach((to, from, next) => {

    if (to.name !== 'Login' && sessionStorage.getItem("auth") !== '1') {
        next({name: 'Login'})
    }else if (to.meta.role.includes(sessionStorage.getItem("role"))) {
        next()
    }else next({name:'NoPermission'})




})

export default router
