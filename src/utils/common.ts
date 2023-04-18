/**
 *  @FileCreator: StevenGao
 * @Date: 2022/2/11
 */

export function isSafari() {
    var u = navigator.userAgent;
    // var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1; //android终端
    // var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
    var isSafari = /Safari/.test(u) && !/Chrome/.test(u);
    if (isSafari) {
        return true
    }
    
    return false
}