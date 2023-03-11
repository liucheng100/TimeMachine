import http from "@/utils/request";

export function getNotices<T>(){
    return http.get<T>({
        url:'/api/notice'
    })
}

export function topNoticeItem<T>(libraryFileId:number){
    return http.post<T>({
        url:'/api/notice/top',
        params:{
            libraryFileId,
        }
    })
}

export function deleteNotice<T>(libraryFileId:number){
    return http.post<T>({
        url:'/api/notice/delete',
        params:{
            libraryFileId,
        }
    })
}

export function addNotice<T>(params:any){
    return http.post<T>({
        url:'/api/notice',
        params:{
            text:params.text,
            title:params.title,
            path: '',
        }
    })
}

export function alterNotice<T>(params:any){
    return http.post<T>({
        url:'/api/notice.alter',
        params:{
            libraryFileId:params.libraryFileId,
            title:params.title,
            text:params.text,
            path:params.path,
        }
    })
}