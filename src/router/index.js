import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)
const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
    return originalPush.call(this, location).catch(err => err)
}
const routes = [
    {
        path: '/',
        redirect: '/discover',
        component: () => import('@/views/layout'),
        children: [
            {
                path: '/discover',
                name: 'discoverComponent',
                redirect: '/discover/personality',
                component: () => import('@/views/discoverComponent/'),
                meta: {
                    id: 1,
                    show: true,
                    name: '发现音乐',
                },
                children: [
                    {
                        path: '/discover/personality',
                        name: 'personalityComponent',
                        component: () => import('@/views/discoverComponent/personalityComponent'),
                        meta: {
                            id: 1,
                            show: false,
                            label: '个性推荐',
                            name: 'personality',
                        },
                    },
                    {
                        path: '/discover/songsheet',
                        name: 'songSheetComponent',
                        component: () => import('@/views/discoverComponent/songSheetComponent'),
                        meta: {
                            id: 1,
                            show: false,
                            name: 'songsheet',
                            label: '歌单',
                        },
                    },
                    {
                        path: '/discover/songsheet/boutique',
                        name: 'boutique',
                        component: () => import('@/views/discoverComponent/songSheetComponent/boutique'),
                        meta: {
                            id: 1,
                            show: false,
                            name: undefined,
                            label: undefined,
                        },
                    },
                    {
                        path: '/discover/anchor',
                        name: 'anchorComponent',
                        component: () => import('@/views/discoverComponent/anchorComponent'),
                        meta: {
                            id: 1,
                            show: false,
                            name: 'anchor',
                            label: '主播电台',
                        },
                    },
                    {
                        path: '/discover/ranking',
                        name: 'rankingComponent',
                        component: () => import('@/views/discoverComponent/rankingComponent'),
                        meta: {
                            id: 1,
                            show: false,
                            name: 'ranking',
                            label: '排行',
                        },
                    },
                    {
                        path: '/discover/singer',
                        name: 'singerComponent',
                        component: () => import('@/views/discoverComponent/singerComponent'),
                        meta: {
                            id: 1,
                            show: false,
                            name: 'singer',
                            label: '歌手',
                        },
                    },
                    {
                        path: '/discover/music',
                        name: 'musicComponent',
                        component: () => import('@/views/discoverComponent/musicComponent'),
                        meta: {
                            id: 1,
                            show: false,
                            name: 'music',
                            label: '最新音乐',
                        },
                    },
                ],
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
            {
                path: '/liketype/:type',
                name: 'likeTypeCom',
                component: () => import('@/views/router-link/anchorSubroute/likeTypeCom'),
                meta: { id: undefined, show: undefined, name: undefined },
            },
            {
                path: '/discover/ranking/:id',
                name: 'musicList',
                component: () => import('@/views/router-link/rankingSubroute/musicList'),
                meta: { id: undefined, show: undefined, name: undefined },
            },
            {
                path: '/discover/user/:key',
                name: 'userInit',
                component: () => import('@/views/router-link/user/userInit'),
                meta: { id: undefined, show: undefined, name: undefined },
            },
        ],
    },
]

const router = new VueRouter({
    routes,
})

export default router
