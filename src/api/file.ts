import http from "@/utils/request";

export function uploadFile<T>(FormData:any){
    return http.post<T>({
        url:'/api/file/upload',
        data: FormData,
    })
}

export function downloadFile<T>(parmas:any){
    return http.get<T>({
        url: `/d/${parmas.type}/${parmas.name}`,
        responseType: "blob",
    })
}
