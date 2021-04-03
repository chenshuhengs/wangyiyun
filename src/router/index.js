import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
    {
        path: '/',
        redirect: '/discover',
        component: () => import('@/views/layout'),
        children: [
            {
                path: '/discover',
                name: 'discoverComponent',
                component: () => import('@/views/discoverComponent/'),
                meta: {
                    id: 1,
                    show: true,
                    name: '发现音乐',
                },
            },
            {
                path: '/video',
                name: 'videoComponent',
                component: () => import('@/views/videoComponent/'),
                meta: { id: 2, show: true, name: '视频' },
            },
            {
                path: '/friend',
                name: 'friendComponent',
                component: () => import('@/views/friendComponent/'),
                meta: { id: 3, show: true, name: '朋友' },
            },
            {
                path: '/share',
                name: 'shareComponent',
                component: () => import('@/views/shareComponent/'),
                meta: { id: 4, show: true, name: '直播' },
            },
        ],
    },
]

const router = new VueRouter({
    routes,
})

export default router
