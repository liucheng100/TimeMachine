import http from "@/utils/request";

export function getPrize<T>(prizeId:number){
    return http.get<T>({
        url:'/prize/get',
        params: {
            prizeId:prizeId,
        },
    })
}