import http from "@/utils/request";

export function getFile<T>(path:any){
    return http.get<Blob>({
        url:'/file/get',
        params: {
            path: path
        },
        responseType: "blob",
    })
}

export function getSrc<T>(path:any){
    return new Promise((resolve, reject) => {
        getFile(path).then(blob=>{
            resolve(URL.createObjectURL(blob))
        }).catch(error => reject(error))
    })
    return new Promise((resolve, reject) => {
        resolve('/file/get?path='+path)
    })
}

export function uploadFile<T>(file:FormData){
    return http.post<T>({
        url: '/file/upload',
        data:file
    })
}
