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
		path: "/login",
		component: () => import("@/views/login.vue"),
		meta: {
			title: "登录",
			requireAuth: false,
		},
	},
];

const router = createRouter({
	history: createWebHashHistory(),
	routes: routes,
	scrollBehavior: () => ({ top: 0 }),
});
router.beforeEach(async (to, from, next) => {
	let token = getToken();
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
