import http from "@/utils/request";

//根据学号获取userId
export function getProcess<T>(params: any) {
	return http.get<T>({
		url: `/api/process/${params}`,
	});
}

//获取所有学院
export function getCollege<T>() {
	return http.get<T>({
		url: `/api/college/all`,
	});
}

//获取所有年级
export function getGrade<T>() {
	return http.get<T>({
		url: `/api/utils/year`,
	});
}

//获取班级
export function getClass<T>(params: any) {
	return http.get<T>({
		url: `/api/class/list`,
		params,
	});
}

//根据班级Id列表查询user,按班级为单位进行展示
export function getStudentsByClass<T>(params: any) {
	return http.post<T>({
		url: `/api/users/classList`,
		data: params,
	});
}

//批量更新用户状态
export function initStudentsStatue<T>(params: any) {
	return http.post<T>({
		url: `/api/process/updateBatch`,
		data: params,
	});
}
