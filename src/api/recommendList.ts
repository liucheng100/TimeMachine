import http from "@/utils/request";

export function getRecommendList<T>(params:any){
    return http.get<T>({
        url:'/api/recommendList',
    })
}

export function topRecommendItem<T>(recommendedFileId:number){
    return http.post<T>({
        url:'/api/recommendList/top',
        params:{
            recommendedFileId,
        }
    })
}

export function deleteRecommend<T>(recommendedFileId:number){
    return http.post<T>({
        url:'/api/recommendedList/delete',
        params:{
            recommendedFileId,
        }
    })
}

export function addRecommend<T>(fileId:number){
    return http.post<T>({
        url:'/api/recommendList/head',
        params:{
            fileId,
        }
    })
}

export function alterRecommend<T>(params:any){
    return http.post<T>({
        url:'/api/recommendList/alter',
        params:{
            recommendedFileId: params.recommendedFileId,
            newFileId: params.newFileId
        }
    })
}

