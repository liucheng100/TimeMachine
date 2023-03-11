import http from "@/utils/request";

export function getBranchlist<T>(params:any){
    return http.get<T>({
        url:'/api/partyBranch/branchList',
        params:{
            collegeId: params.collegeId || '',
            grade: params.grade || '',
            type: params.type || '',
        },
    })
}

export function getBranchInfo<T>(branchId:number){
    return http.get<T>({
        url:'/api/partyBranch',
        params:{
            branchId,
        },
    })
}

export function getBranchMember<T>(branchId:number){
    return http.get<T>({
        url:'/api/partyBranch/memberList',
        params:{
            branchId,
        },
    })
}

export function getUtilYear<T>(branchId:number){
    return http.get<T>({
        url:'/api/utils/year',
    })
}

export function getCollegeList<T>(){
    return http.get<T>({
        url:'/api/college/all',
    })
}

export function newBranch<T>(parmas:any){
    return http.post<T>({
        url:'/api/partyBranch/create',
        data:{
            partybranchAcademy: parmas.partybranchAcademy,
            partybranchSchoolyear: parmas.partybranchSchoolyear,
            partybranchType: parmas.partybranchType,
            partybranchName: parmas.partybranchName,
        }
    })
}

export function delBranch<T>(branchId:number){
    return http.delete<T>({
        url:'/api/partyBranch',
        params:{
            branchId,
        }
    })
}
export function update3Person<T>(params:any){
    return http.post<T>({
        url:'/api/partyBranch/update3Person',
        params:{
            branchId: params.branchId,
            index: params.index,
            newStuNum: params.newId,
        }
    })
}
export function loadFile<T>(FormData:any){
    return http.post<T>({
        url:'/api/partyBranch/file',
        data: FormData,
    })
}
export function pushArray<T>(data:any){
    return http.post<T>({
        url:'/api/partyBranch/batch/update/branch',
        data:{
            nameSnoList: data.nameSnoList,
            targetBranchId: data.targetBranchId,
        }
    })
}
export function pushPerson<T>(parmas:any){
    return http.post<T>({
        url:'/api/partyBranch/updateInfoById',
        params:{
            sno: parmas.sno,
            targetBranchId: parmas.targetBranchId,
        }
    })
}
