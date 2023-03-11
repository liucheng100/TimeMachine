import http from "@/utils/request";

//根据学号获取userId
export function getUserId<T>(params:any){
    return http.get<T>({
        url:`/api/id/${params}/getUserId`
    })
}

//根据学号获取info
export function getUserInfo<T>(sno:number){
    return http.get<T>({
        url:`/api/user/${sno}`
    })
}

