import http from "@/utils/request";

//获取考试总表
export function getExamList<T>() {
	return http.get<T>({
		url: `/api/exam/all`,
	});
}

//删除考试
export function deleteExam<T>(id: any) {
	return http.get<T>({
		url: `/api/exam/${id}/delete`,
	});
}

//添加考试
export function addExam<T>(data: any) {
	return http.post<T>({
		url: `/api/exam/new`,
		data: data,
	});
}

//获取考试详情
export function getExam<T>(id: any) {
	return http.get<T>({
		url: `/api/exam/${id}/detail`,
	});
}

//获取预备党员培训状态
export function getExamProbationary<T>(id: any) {
	return http.get<T>({
		url: `/api/exam/probationary/${id}`,
	});
}

//修改预备党员培训状态
export function postExamProbationary<T>(id: any, data: any) {
	return http.post<T>({
		url: `/api/exam/probationary/${id}`,
		data: data,
	});
}

//获取考试成绩
export function getExamResults<T>(examId:any= -1, collegeId:any = -1) {
	return http.get<T>({
		url: `/api/exam/${examId}/results/${collegeId}`,
	});
}

//导出数据
export function getExcel<T>(examId: any) {
	return http.get<T>({
		url: `/api/exam/export/analyse/${examId}`,
		responseType: "blob",
	});
}

//获取各学院状态
export function getCollegeStatue<T>(examId: any) {
	return http.get<T>({
		url: `/api/exam/activist/list/${examId}`,
	});
}

//导出数据
export function getExcelSign<T>(examId: any) {
	return http.get<T>({
		url: `/api/exam/export/attendee/${examId}`,
		responseType: "blob",
	});
}

//提交Excel结果
export function submitExcel<T>(examId: any,importId: any){
    return http.get<T>({
        url:`/api/exam/excel/${importId}/commit/${examId}`,
    })
}

//上传Excel - activist
export function uploadExcelActivist<T>(FormData:any){
    return http.post<T>({
        url:'/api/exam/excel/activist',
        data: FormData,
    })
}

//上传Excel - applicant
export function uploadExcelApplicant<T>(FormData:any){
    return http.post<T>({
        url:'/api/exam/excel/applicant',
        data: FormData,
    })
}

//上传Excel - probationary
export function uploadExcelProbationary<T>(FormData:any){
    return http.post<T>({
        url:'/api/exam/excel/probationary',
        data: FormData,
    })
}
