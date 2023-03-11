import http from "@/utils/request";

//资源库管理
export function getResourceFile<T>(fileId:number){
    return http.get<T>({
        url:'/api/library',
        params:{
            fileId,
        }
    })
}

export function addResourceFile<T>(params:any){
    return http.post<T>({
        url:'/api/library',
        params:{
            text: params.text,             //文章内容(string)
            columnId: params.columnId,     //要添加的文件所属的栏目id(int)
            path: params.path,             //文件上传后的路径(先调用文件上传接口)(string)
            title: params.title,           //文件标题(string)
        }
    })
}

export function deleteResourceFile<T>(fileId:number){
    return http.post<T>({
        url:'/api/library/delete',
        params:{
            fileId,
        }
    })
}

export function searchResourceFile<T>(name:string){
    return http.get<T>({
        url:'/api/library/search',
        params:{
            name,
        }
    })
}

export function getColumnFile<T>(columnId:number){
    return http.get<T>({
        url:'/api/library/column',
        params:{
            columnId,
        }
    })
}

//栏目管理
export function getColumn<T>(params:any){
    return http.get<T>({
        url:'/api/column',
    })
}

export function addColumn<T>(params:any){
    return http.post<T>({
        url:'/api/column',
        params:{
            columnName:params.columnName,
            position:params.position
        }
    })
}
// 
export function modifyColumnPosition<T>(fileId:number){
    return http.post<T>({
        url:'/api/column/position',
        params:{
            fileId,
        }
    })
}

export function deleteColumn<T>(columnId:number){
    return http.post<T>({
        url:'/api/column/delete',
        params:{
            columnId,
        }
    })
}

// export function uploadFile<T>(file:any){
//     return http.post<T>({
//         url:'/api/file/upload',
//         params:{
//             file,
//         }
//     })
// }

// export function deleteFile<T>(filePath:string){
//     return http.post<T>({
//         url:'/api/file/{id}/delete',
//         params:{
//             filePath,
//         }
//     })
// }