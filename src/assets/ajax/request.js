import Axios from "axios";
import baseUrl from './baseUrl'
import router from '../../router'
import { message } from '@/assets/commonJs/until'


let axios = Axios.create({
    baseURL: baseUrl,
    timeout: 1000 * 12,
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
});

// 请求拦截
axios.interceptors.request.use((confing) => {
    //设置请求头
    if (localStorage.eToken) {
        confing.headers.Authorization = localStorage.eToken
        confing.headers['X-Token'] = localStorage.eToken
    }
    return confing
}, (error) => {
    return Promise.reject(error)
}
)


//响应拦截
axios.interceptors.response.use((response) => {
    message(true,'接口联调成功')
    return response.data  //返回来的数据取data
}, (error) => {
    message(false,'接口联调失败')
    // 获取状态码
    const { status } = error.response

    if (status === 401) {
        message(false,'请重新登录')
        //清楚token
        localStorage.removeItem('eToken')
        //跳转到登录页面
        router.push({ name: 'login' })
    }
    return Promise.reject(error)
}
)

export default axios