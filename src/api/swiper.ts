import http from "@/utils/request";

export function getCarousel<T>(params:any){
    return http.get<T>({
        url:'/api/carousel',
    })
}

export function topCarousel<T>(carouselId:number){
    return http.post<T>({
        url:'/api/carousel/top',
        params:{carouselId},
    })
}

export function addCarousel<T>(params:any){
    return http.post<T>({
        url:'/api/carousel',
        params:{
            link: params.link,
            title: params.title,
            picturePath: params.picturePath,
            fileId: params.fileId,
        }
    })
}

export function deleteCarousel<T>(carouselId:number){
    return http.post<T>({
        url:'/api/carousel/delete',
        params:{carouselId},
    })
}

export function alterCarousel<T>(params:any){
    return http.post<T>({
        url:'/api/carousel/alter',
        params:{
            carouselId: params.carouselId,
            newLink: params.newLink,
            newTitle: params.newTitle,
            newPicPath: params.newPicPath,
            fileId: params.fileId,
        }
    })
}
