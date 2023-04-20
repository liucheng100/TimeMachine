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
}

export function concatSrc<T>(path:any){
    return '/api/file/get?path='+path;
}

export function uploadFile<T>(file:FormData){
    return http.post<T>({
        url: '/file/upload',
        data:file
    })
}

export function uploadFile_t<T>(file:FormData){
    return new Promise<T>((resolve, reject) => {
        http.post<T>({
            url: '/file/upload',
            data:file
        }).then(v=>{
            if(typeof v === 'string'){
                resolve(JSON.parse(('['+v+']').replace('}{','},{'))[0])
            }else{
                resolve(v)
            }
        }).catch(err=>{
            reject()
        })
    })
}
