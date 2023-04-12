import http from "@/utils/request";

export function getNewestCompetition<T>(){
    return http.get<T>({
        url:'/contest/running',
        responseType:"json"
    })
}