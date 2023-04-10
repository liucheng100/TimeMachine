import { createRouter, createWebHashHistory } from "vue-router";
import { getToken } from "@/utils/auth";

const routes = [
	{
		path: "/",
		component: () => import("@/views/home.vue"),
		redirect: '/homepage',
		meta: {
			title: "首页",
			requireAuth: true,
		},
		children:[
			{
				path: "/homepage",
				component: () => import("@/views/homepage/homepage.vue"),
				meta: {
					title: "首页",
					requireAuth: true,
				},
			},
			{
				path: "/submit",
				component: () => import("@/views/homepage/submit.vue"),
				meta: {
					title: "投稿",
					requireAuth: true,
				},
			},
		]
	},
	{
		path:"/admin",
		component: () => import("@/views/admin.vue"),
		redirect: '/admin/homepage',
		meta: {
			title: "管理端",
			requireAuth: true
		},
		children:[
			{
				path:"/admin/homepage",
				component: () => import("@/views/admin/AdminHomepage.vue"),
				meta: {
					title: "首页",
					requireAuth: true
				}
			},
			{
				path:"/admin/management",
				component: () => import("@/views/admin/CompetitionManagement.vue"),
				meta: {
					title: "管理赛事",
					requireAuth: true
				}
			},
			{
				path:"/admin/new-competition",
				component: () => import("@/views/admin/new-competition.vue"),
				meta: {
					title: "新比赛",
					requireAuth: true
				}
			},
			{
				path:"/admin/all",
				component: () => import("@/views/admin/AllWork.vue"),
				meta: {
					title: "所有作品",
					requireAuth: true
				}
			},
			{
				path:"/admin/recycled",
				component: () => import("@/views/admin/RecycleBin.vue"),
				meta: {
					title: "回收站",
					requireAuth: true
				}
			},
		]
	},
	{
		path: "/login",
		component: () => import("@/views/login.vue"),
		meta: {
			title: "登录",
			requireAuth: false,
		},
	},
	{
		path:"/PC",
		component:() => import("@/views/homepagePC.vue"),
		meta: {
			title:"首页",
			requireAuth:true
		},
		children:[
			{
				path:"/PC/homepage",
				component:() => import("@/views/homepagePC/homepage.vue")
			}
		]
	}
];

const router = createRouter({
	history: createWebHashHistory(),
	routes: routes,
	scrollBehavior: () => ({ top: 0 }),
});
router.beforeEach(async (to, from, next) => {
	let token = getToken();
	// 该部分权限管理重写
	if (to.meta.requireAuth && !token) {
		next({
			path: "/login",
			query: {
				from: to.path,
			},
		});
	} else {
		window.document.title =
			to.meta.title == undefined
				? "方寸流年"
				: `${to.meta.title} - 方寸流年`;
		next();
	}
});
export default router;
