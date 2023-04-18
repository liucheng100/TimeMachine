import http from "@/utils/request";

export function getPrize<T>(prizeId:number){
    return http.get<T>({
        url:'/prize/get',
        params: {
            prizeId:prizeId,
        },
    })
}


// 获取带均分信息的作品列表
export function getAllWorks<T>(data:any){
    return http.get<T>({
        url:'/prize/works',
        params: {
            contestId: data.contestId,
            pageNum: data.pageNum,
            pageSize: data.pageSize,
        },
    })
}