/**
 *  @FileCreator: StevenGao
 * @Date: 2022/2/11
 */


import Cookies from 'js-cookie';

const TokenKey = 'Token';

export function getToken() {
    return Cookies.get(TokenKey);
}

export function setToken(token: string) {
    return Cookies.set(TokenKey, token)
}

export function setUserId(token: string) {
    return Cookies.set('UserId', token)
}
export function getUserId() {
    return Cookies.get('UserId')
}

export function removeToken() {
    removeAdmin()
    return Cookies.remove(TokenKey)
}

const AdminKey = 'isAdmin';

export function getAdmin() {
    return Cookies.get(AdminKey);
}

export function setAdmin(token: string) {
    return Cookies.set(AdminKey, token)
}

export function removeAdmin() {
    return Cookies.remove(AdminKey)
}
