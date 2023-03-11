import { createRouter, createWebHashHistory } from "vue-router";
import { getToken } from "@/utils/auth";

const routes = [
	{
		path: "/",
		component: () => import("@/views/home.vue"),
		meta: {
			title: "主页",
			requireAuth: true,
		},
		redirect: "/examinationAndClass",
		children: [
			{
				path: "/message",
				meta: {
					title: "站内信",
					requireAuth: true,
				},
				redirect: "/message/get",
				children: [
					{
						path: "/message/get",
						component: () => import("@/views/message/get.vue"),
						meta: {
							title: "收件箱",
						},
					},

					{
						path: "/message/post",
						component: () => import("@/views/message/post.vue"),
						meta: {
							title: "发件箱",
						},
					},
				],
			},
			{
				path: "/resource",
				meta: {
					title: "资源库",
					requireAuth: true,
				},
				redirect: "/resource/columnList",
				children: [
					{
						path: "/resource/columnList",
						component: () => import("@/views/resource/columnList.vue"),
						meta: {
							title: "栏目列表",
						},
					},

					{
						path: "/resource/fileList",
						component: () => import("@/views/resource/fileList.vue"),
						meta: {
							title: "文件列表",
						},
					},
				],
			},
			{
				path: "/examinationAndClass",
				meta: {
					title: "考试与选课",
					requireAuth: true,
				},
				redirect: "/examinationAndClass/trainingSummary",
				component: () => import("@/views/examinationAndClass/examTable.vue"),
				children: [
					{
						path: "/examinationAndClass/trainingSummary",
						component: () =>
							import("@/views/examinationAndClass/trainingSummary.vue"),
						meta: {
							title: "培训总表",
						},
					},
					{
						path: "/examinationAndClass/applicantsTraining",
						component: () =>
							import("@/views/examinationAndClass/applicantsTraining.vue"),
						meta: {
							title: "入党申请人培训",
						},
					},
					{
						path: "/examinationAndClass/applicantsTraining/:id",
						component: () =>
							import(
								"@/views/examinationAndClass/applicantsTraining_detail.vue"
							),
						meta: {
							title: "入党申请人培训 - 详情",
						},
					},
					{
						path: "/examinationAndClass/applicantsTraining/:id/grades",
						component: () =>
							import(
								"@/views/examinationAndClass/applicantsTraining_grades.vue"
							),
						meta: {
							title: "入党申请人培训 - 成绩录入",
						},
					},
					{
						path: "/examinationAndClass/activistsTraining",
						component: () =>
							import("@/views/examinationAndClass/activistsTraining.vue"),
						meta: {
							title: "积极分子培训",
						},
					},
					{
						path: "/examinationAndClass/activistsTraining/:id",
						component: () =>
							import(
								"@/views/examinationAndClass/activistsTraining_detail.vue"
							),
						meta: {
							title: "积极分子培训 - 详情",
						},
					},
					{
						path: "/examinationAndClass/activistsTraining/:id/grades",
						component: () =>
							import(
								"@/views/examinationAndClass/activistsTraining_grades.vue"
							),
						meta: {
							title: "积极分子培训 - 成绩录入",
						},
					},
					{
						path: "/examinationAndClass/preparativeMembersTraining",
						component: () =>
							import(
								"@/views/examinationAndClass/preparativeMembersTraining.vue"
							),
						meta: {
							title: "预备党员培训",
						},
					},
					{
						path: "/examinationAndClass/preparativeMembersTraining/:id",
						component: () =>
							import(
								"@/views/examinationAndClass/preparativeMembersTraining_detail.vue"
							),
						meta: {
							title: "预备党员培训 - 详情",
						},
					},
					{
						path: "/examinationAndClass/preparativeMembersTraining/:id/grades",
						component: () =>
							import(
								"@/views/examinationAndClass/preparativeMembersTraining_grades.vue"
							),
						meta: {
							title: "预备党员培训 - 成绩录入",
						},
					},
					{
						path: "/examinationAndClass/gradesManagement",
						component: () =>
							import("@/views/examinationAndClass/gradesManagement.vue"),
						meta: {
							title: "成绩管理",
						},
					},
					{
						path: "/examinationAndClass/disciplinaryManagement",
						component: () =>
							import("@/views/examinationAndClass/disciplinaryManagement.vue"),
						meta: {
							title: "违纪管理",
						},
					},
				],
			},
			{
				path: "/studentInfo",
				meta: {
					title: "学生信息",
					requireAuth: true,
				},
				redirect: "/studentInfo/initStatue",
				children: [
					{
						path: "/studentInfo/initStatue",
						component: () => import("@/views/studentInfo/initStatue.vue"),
						meta: {
							title: "状态初始化",
						},
					},
					{
						path: "/studentInfo/personalStatue",
						component: () => import("@/views/studentInfo/personalStatue.vue"),
						meta: {
							title: "个人状态更改",
						},
					},
				],
			},
			{
				path: "/homepage",
				meta: {
					title: "首页管理",
					requireAuth: true,
				},
				redirect: "/homepage/swiper",
				children: [
					{
						path: "/homepage/swiper",
						component: () => import("@/views/homepage/swiper.vue"),
						meta: {
							title: "轮播图",
						},
					},
					{
						path: "/homepage/notice",
						component: () => import("@/views/homepage/notice.vue"),
						meta: {
							title: "近期通知",
						},
					},
					{
						path: "/homepage/recommend",
						component: () => import("@/views/homepage/recommend.vue"),
						meta: {
							title: "推荐阅读",
						},
					},
				],
			},
			{
				path: "/branch",
				meta: {
					title: "支部管理",
					requireAuth: true,
				},
				redirect: "/branch/branchList",
				children: [
					{
						path: "/branch/branchList",
						component: () => import("@/views/branch/branch.vue"),
						meta: {
							title: "支部列表",
						},
					},
					{
						path: "/branch/memberView",
						component: () => import("@/views/branch/memberView.vue"),
					},
					{
						path: "/branch/memberControl",
						component: () => import("@/views/branch/memberControl.vue"),
					},
				],
			},
			{
				path: "/lesson20",
				meta: {
					title: "网上党课学习",
					requireAuth: true,
				},
				redirect: "/lesson20/lesson20",
				children: [
					{
						path: "/lesson20/lesson20",
						component: () => import("@/views/lesson20/lesson20.vue"),
						meta: {
							title: "课程管理",
						},
					},
					{
						path: "/lesson20/article20",
						component: () => import("@/views/lesson20/article20.vue"),
						meta: {
							title: "文章管理",
						},
					},
					{
						path: "/lesson20/question20",
						component: () => import("@/views/lesson20/question20.vue"),
						meta: {
							title: "试题管理",
						},
					},
				],
			},
		],
	},
	{
		path: "/login",
		component: () => import("@/views/login/login.vue"),
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
				? "天津大学学生党建平台管理端"
				: `${to.meta.title} - 天津大学学生党建平台管理端`;
		next();
	}
});
export default router;
