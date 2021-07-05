import axios from './request'
import baseUrl from './baseUrl'
import qs from 'qs'


export function indexAjax(query,method){
    return axios({
        url:baseUrl + '/api/auth/login',
        method,
        data: qs.stringify(query)
    })
}

export function verifyCodeAjax(query,method){
    return axios({
        url:baseUrl + '/api/global/verifyCode',
        method,
        data: qs.stringify(query)
    })
}

export function usersAjax(query,method){
    return axios({
        url:baseUrl + '/api/sys/users/1',
        method,
        data: qs.stringify(query)
    })
}