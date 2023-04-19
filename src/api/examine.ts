import http from "@/utils/request";

export function getUnExamined<T>(parmas:any){
    return http.get<T>({
        url: `/examine/list?contestId=${parmas.contestId}&pageNum=${parmas.pageNum}&pageSize=${parmas.pageSize}`,
        responseType: "json",
    })
}

export function getUnPass<T>(contestId:any, pageNum:any, pageSize:any){
    return http.get<T>({
        url:"/examine/back",
        responseType:"json",
        params:{
            contestId:contestId,
            pageNum:pageNum,
            pageSize:pageSize
        }
    })
}

export function unPass<T>(data:any){
    return http.post<T>({
        url: "/examine/back",
        data:data
    })
}

export function pass<T>(data:any){
    return http.post<T>({
        url: "/examine/pass",
        data:data
    })
}