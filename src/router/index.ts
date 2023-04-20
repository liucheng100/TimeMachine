import { createRouter, createWebHashHistory } from "vue-router";
import { getToken, getAdmin, removeAdmin } from "@/utils/auth";
import { ElMessage } from "element-plus";

const routes = [
	{
		path: "/",
		component: () => import("@/views/home.vue"),
		redirect: '/homepage',
		meta: {
			title: "首页",
			requireAuth: true,
			isAdmin: false,
		},
		children: [
			{
				path: "/homepage",
				component: () => import("@/views/homepage/homepage.vue"),
				meta: {
					title: "首页",
					requireAuth: true,
					keepAlive: true,
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
			{
				path: "/workDetail",
				component: () => import("@/views/homepage/WorkDetail.vue"),
				meta: {
					title: "作品详情",
					requireAuth: true,
				},
			},
			{
				path: "/preCamps",
				component: () => import("@/views/PreCamps.vue"),
				meta: {
					title: "往届赛事",
					requireAuth: true,
				},
			},
			{
				path: "/myWork",
				component: () => import("@/views/myWork.vue"),
				meta: {
					title: "我的投稿",
					requireAuth: true,
				},
			},
		]
	},
	{
		path: "/admin",
		component: () => import("@/views/admin.vue"),
		redirect: '/admin/homepage',
		meta: {
			title: "管理端",
			requireAuth: true,
			isAdmin: true,
		},
		children: [
			{
				path: "/admin/homepage",
				component: () => import("@/views/admin/AdminHomepage.vue"),
				meta: {
					title: "首页",
					requireAuth: true
				}
			},
			{
				path: "/admin/management",
				component: () => import("@/views/admin/CompetitionManagement.vue"),
				meta: {
					title: "管理赛事",
					requireAuth: true
				}
			},
			{
				path: "/admin/new-competition",
				component: () => import("@/views/admin/new-competition.vue"),
				meta: {
					title: "新比赛",
					requireAuth: true
				}
			},
			{
				path: "/admin/score",
				component: () => import("@/views/admin/Score.vue"),
				meta: {
					title: "作品评分",
					requireAuth: true
				}
			},
			{
				path: "/admin/questionnaire",
				component: () => import("@/views/admin/Questionnaire.vue"),
				meta: {
					title: "问卷收集",
					requireAuth: true
				}
			},
			{
				path: "/admin/ReviewSubmissions",
				component: () => import("@/views/admin/ReviewSubmissions.vue"),
				meta: {
					title: "审核投稿",
					requireAuth: true
				}
			},
			{
				path: "/admin/RecycleBin",
				component: () => import("@/views/admin/RecycleBin.vue"),
				meta: {
					title: "回收站",
					requireAuth: true
				}
			},
			{
				path: "/admin/WorkDetail",
				component: () => import("@/views/admin/WorkDetail.vue"),
				meta: {
					title: "作品详情",
					requireAuth: true
				}
			},
			{
				path: "/admin/scoreDetail",
				component: () => import("@/views/admin/ScoreDetail.vue"),
				meta: {
					title: "作品详情",
					requireAuth: true
				}
			},
			{
				path: "admin/workDetail",
				component: () => import("@/views/homepage/WorkDetail.vue"),
				meta: {
					title: "作品详情",
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
	{
		path: "/loginA",
		component: () => import("@/views/loginA.vue"),
		meta: {
			title: "登录",
			requireAuth: false,
		},
	},
	{
		path: "/signup",
		component: () => import("@/views/signup.vue"),

		meta: {
			title: "注册",
			requireAuth: false,
		},
	},
	{
		path: "/resetPwd",
		component: () => import("@/views/resetPwd.vue"),
		meta: {
			title: "忘记密码",
			requireAuth: false,
		},
	},
	{
		path: "/PC",
		component: () => import("@/views/homepagePC.vue"),
		redirect: "/PC/homepage",
		meta: {
			title: "首页",
			requireAuth: false,
			isPC: true
		},
		children: [
			{
				path: "/PC/homepage",
				component: () => import("@/views/homepagePC/homepage.vue"),
				meta: {
					title: "首页",
					requireAuth: false,
					isPC: true
				}
			},
			{
				path: "/PC/submit",
				component: () => import("@/views/homepagePC/submit.vue"),
				meta: {
					title: "提交作品",
					requireAuth: true,
					isPC: true
				}
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
	let isAdmin = getAdmin();
	// 该部分权限管理重写
	// PC端判断
	let deviceWidth = window.innerWidth
	// alert(deviceWidth)
	if (deviceWidth > 768) {
		if (!to.meta.isPC) {
			next({
				path: "/PC"
			});
		}
		if (to.meta.requireAuth && !token) {
			next({
				path: "/PC/homepage",
			})
		}
		else {
			window.document.title =
				to.meta.title == undefined
					? "方寸流年"
					: `${to.meta.title} - 方寸流年`;
			next();
		}
	}
	else {
		if (to.meta.isPC) {
			// setTimeout(() => {
			// 	alert('当前正在用手机访问电脑页面,为不影响体验请更换为手机页面')
			// }, 1000);
			// 
			next({
				path: "/"
			});
			return
		}
		// 以下为手机端
		if (to.meta.requireAuth && !token) {
			removeAdmin();
			next({
				path: "/login",
				query: {
					from: to.path,
				},
			});
		} else {
			if (isAdmin == '1') {
				// 管理端
				// console.log(to.meta.isAdmin)
				if (!to.meta.isAdmin) {
					// 不是管理端页面
					// ElMessage.info('请不要访问非管理端端页面')
					next({
						path: "/admin"
					})
				} else {
					// 是管理端页面
					window.document.title =
						to.meta.title == undefined
							? "方寸流年"
							: `${to.meta.title} - 方寸流年管理端`;
					next();
				}
			} else {
				// 用户端
				if (to.meta.isAdmin) {
					// 不是用户端页面
					// ElMessage.warning('请不要访问非用户端页面')
					next({
						path: "/"
					})
				} else {
					// 是用户端页面
					window.document.title =
						to.meta.title == undefined
							? "方寸流年"
							: `${to.meta.title} - 方寸流年`;
					next();
				}
			}

		}
	}

});
export default router;
