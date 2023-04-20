import http from "@/utils/request";

//(管理员)查询当前帐号未打分的作品
export function getScoreWorks<T>(data: any) {
    return http.get<T>({
        url: '/score/list',
        params: {
            contestId: data.contestId,
            pageNum: data.pageNum,
            pageSize: data.pageSize,
        },
    })
}

//打分
export function uploadScore<T>(data: any) {
    return http.post<T>({
        url: '/score/upload',
        params: {
            score: data.score,
            workId: data.workId,
        },
    })
}