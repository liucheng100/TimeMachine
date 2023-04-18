import http from "@/utils/request";

export function getNewestCompetition<T>(){
    return http.get<T>({
        url:'/contest/running',
        responseType:"json"
    })
}

//分页查询赛事列表
export function getCompetitions<T>(params:any){
    return http.get<T>({
        url:'/contest/list',
        params: {
            pageSize: params.pageSize,
            pageNum: params.pageNum
        },
    })
}