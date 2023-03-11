import http from "@/utils/request";

export function searchFile<T>(name:string){
    return http.get<T>({
        url:'/api/library/search',
        params:{name},
    })
}

export function getFile<T>(fileId:number){
    return http.get<T>({
        url:'/api/library',
        params:{fileId},
    })
}

