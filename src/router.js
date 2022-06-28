import {createRouter, createWebHistory} from "vue-router";
import store from "./store";

const Index = () => import("./components/Index.vue")
const Login = () => import("./components/Login.vue");
const Patient = () => import("./components/Patient.vue")
const Setting = () => import("./components/Setting.vue")
const NoFound = () => import("./common/NotFound.vue")



const routes = [
    {
        path: '/',
        name: 'index',
        component: Index,
        meta: {
            isLogin: false,
            title: "首页"
        },
        children: [
            {
                path: 'patient',
                component: Patient,
                meta: {
                    isLogin: true,
                    title: '病例管理'
                },
                props: true
            },
            {
                path: 'setting',
                component: Setting,
                meta: {
                    isLogin: true,
                    title: '设置'
                },
                props: true
            }
        ]
    },
    {
        path: "/login",
        component: Login,
        meta: {
            isLogin: false,
            title: '登录'
        }
    },
    {
        path: "/404",
        component: NoFound,
        meta: {
            isScan: false
        }
    },
    {
        path: "/*",
        redirect: "/404",
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

router.beforeEach((to, from) => {
    console.log(to.path)
    if (to.meta.isLogin) {
        if (!store.state.isLogin) {
            return '/login'
        }
    }
    // if(to.path === '/'){
    //     return '/patient'
    // }
})

export default router