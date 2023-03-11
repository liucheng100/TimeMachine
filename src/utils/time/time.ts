export default function formatDate(oldDate:string) {
    // 方式1 转换为'yyyy-MM-dd HH:mm:ss'
    function add0(num:any) { return num < 10 ? '0' + num : num } // 个位数的值在前面补0
    const date = new Date(oldDate)
    const Y = date.getFullYear()
    const M = date.getMonth() + 1
    const D = date.getDate()
    const h = date.getHours()
    const m = date.getMinutes()
    const s = date.getSeconds()

    return Y + '-' + add0(M) + '-' + add0(D) + ' \xa0\xa0 ' + add0(h) + ':' + add0(m) + ':' + add0(s)

    // 方式2 转换为'yyyy/MM/dd HH:mm:ss'
    // return new Date(oldDate).toLocaleString()
}