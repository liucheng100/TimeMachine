import http from "@/utils/request";

export function contestList<T>(data:any){
    return http.get<T>({
        url:'/contest/list',
        params: {
            pageSize: data.pageSize,
            pageNum: data.pageNum
        },
    })
}

export function contesting<T>(){
    return http.get<T>({
        url:'/contest/running',
    })
}


export function getContest<T>(contestId:any){
    return http.get<T>({
        url:'/contest/get',
        params: {
            contestId,
        },
    })
}

