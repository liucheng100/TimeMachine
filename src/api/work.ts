import http from "@/utils/request";

export function getAllWorks<T>(data:any){
    return http.get<T>({
        url:'/work/contest/list',
        params: {
            contestId: data.contestId,
            pageNum: data.pageNum,
            pageSize: data.pageSize,
        },
    })
}

export function workDetail<T>(workId:any){
    return http.get<T>({
        url:'/work/detail',
        params: {
            workId: workId,
        },
    })
}

export function getPrized<T>(contestId:number){
    return http.get<T>({
        url:'/work/contest/prized',
        params: {
            contestId: contestId,
        },
    })
}

export function newWork<T>(data:any){
    return http.post<T>({
        url:'/work/new',
        data: {
            workTitle: data.workTitle,
            description: data.description,
            workFile: data.workFile,
            contestGroup: data.contestGroup,
            contestId: data.contestId,
        },
    })
}
