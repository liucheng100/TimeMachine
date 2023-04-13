import http from "@/utils/request";

export function getUnExamined<T>(parmas:any){
    return http.get<T>({
        url: `/examine/list?contestId=${parmas.contestId}&pageNum=${parmas.pageNum}&pageSize=${parmas.pageSize}`,
        responseType: "json",
    })
}