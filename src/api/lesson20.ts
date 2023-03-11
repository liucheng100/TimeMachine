import http from "@/utils/request";

export function getCourselist<T>(params:any){
    return http.get<T>({
        url:'/api/course',
    })
}

export function courseAlter<T>(params:any){
    return http.post<T>({
        url:'/api/course/alter',
        params:{
            courseId: params.courseId,
            newCourseName: params.newCourseName,
            newCourseDetail: params.newCourseDetail,
            newText: params.newText,
        }
    })
}
export function addCourse<T>(parmas:any){
    if(parmas.position)
        return http.post<T>({
            url:'/api/course/position',
            params:{
                courseName: parmas.courseName,
                courseDetail: parmas.courseDetail,
                text: parmas.text,
                position: parmas.position,
            }
        })
    else
    return http.post<T>({
        url:'/api/course',
        params:{
            courseName: parmas.courseName,
            courseDetail: parmas.courseDetail,
            text: parmas.text,
        }
    })
}
export function removeCourse<T>(courseId:any){
    return http.post<T>({
        url:'/api/course/delete',
        params:{
            courseId: courseId,
        }
    })
}
export function getArticle<T>(courseId:any){
    return http.get<T>({
        url:'/api/course/passage',
        params:{
            courseId: courseId,
        }
    })
}
export function addArticle<T>(params:any){
    return http.post<T>({
        url:'/api/course/passage',
        headers: {"Content-Type":"text/plain"},
        params:{
            courseId: params.courseId,
            title: params.title,
        },
        data: params.text
    })
}
export function removeArticle<T>(passageList:any){
    return http.post<T>({
        url:'/api/course/passage/delete',
        data: passageList,
    })
}

export function alterArtTitle<T>(data:any){
    return http.post<T>({
        url:'/api/course/passage/title/alter',
        params: {
            passageId: data.passageId,
            newTitle: data.newTitle,
        },
    })
}

export function alterArtText<T>(data:any){
    return http.post<T>({
        url:'/api/course/passage/text/alter',
        params: {
            passageId: data.passageId,
            newText: data.newText,
        },
    })
}



export function getExercise<T>(courseId:any){
    return http.get<T>({
        url:'/api/course/exercise',
        params:{
            courseId: courseId,
        }
    })
}
export function addExercise<T>(data:any){
    return http.post<T>({
        url:'/api/course/exercise',
        data,
    })
}
export function editExercise<T>(data:any){
    return http.post<T>({
        url:'/api/course/exercise/alter',
        data,
    })
}
export function removeExercise<T>(exList:any){
    return http.post<T>({
        url:'/api/course/exercise/delete',
        data: exList,
    })
}