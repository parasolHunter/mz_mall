import axios from 'axios'
import qs from 'qs'
// 全局配置
import _config from '@/config'
import router from '@/router'
import {
    Toast
} from 'cube-ui'

/** 全局的 axios 默认值 */
// 请求域名
axios.defaults.baseURL = _config.request.baseURL
// token
// axios.defaults.headers.common['Authorization'] = ''
// 请求头
axios.defaults.headers.post['Content-Type'] = _config.request.headersContentType
// 请求超时
axios.defaults.timeout = _config.request.timeout

axios.interceptors.response.use(function (config) {
    // 在发送请求之前做些什么
    return config
}, function (error) {
    console.log(error)
    if (error.message.includes('timeout')) {
        console.log('错误回调', error)
        Toast.$create({
            type: 'text',
            txt: '网络超时.'
        }).show()
    } else if (error.response.status) {
        switch (error.response.status) {
            // 401: 未登录
            // 未登录则跳转登录页面，并携带当前页面的路径
            // 在登录成功后返回当前页面，这一步需要在登录页操作。
            case 401:
                // router.replace({
                //     path: '/login',
                //     query: {
                //         redirect: router.currentRoute.fullPath
                //     }
                // })
                break

                // 403 token过期
                // 登录过期对用户进行提示
                // 清除本地token和清空vuex中token对象
                // 跳转登录页面
            case 403:
                // Toast.$create({
                //     time: 3000,
                //     txt: '登录过期，请重新登录',
                //     onTimeout: () => {
                //          // 清除token
                //         localStorage.removeItem('token')
                //         store.commit('loginSuccess', null)
                //         // 跳转登录页面，并将要浏览的页面fullPath传过去，登录成功后跳转需要访问的页面
                //         setTimeout(() => {
                //             router.replace({
                //                 path: '/login',
                //                 query: {
                //                     redirect: router.currentRoute.fullPath
                //                 }
                //             })
                //         }, 1000)
                //     }
                // }).show()
                break

                // 404请求不存在
            case 404:
                Toast.$create({
                    type: 'text',
                    txt: '网络请求不存在'
                }).show()

                break
                // 其他错误，直接抛出错误提示
            case 500:
                Toast.$create({
                    type: 'text',
                    txt: '网络请求不存在'
                }).show()
                router.push({
                    path: "500"
                });
                break
                // 其他错误，直接抛出错误提示
            default:
                Toast.$create({
                    type: 'text',
                    txt: error.response.data.message
                }).show()
        }
    }
    // 对请求错误做些什么
    return Promise.reject(error)
})

/**
 * 封装axios请求接口
 * @param url  请求的地址 例如(/api/seller)
 * @param params 传给服务端的参数
 * @param type  请求的方式(GET/POST)
 * return 返回一个promise对象
 */
export default async (url = '', params = {}, type = 'GET') => {
    type = type.toUpperCase()
    if (type === 'GET') {
        let time = (new Date()).getTime()
        params.time = time
    }
    if (type === 'POST') {
        params = qs.stringify(params)
    }
    return new Promise((resolve, reject) => {
        axios({
            method: type,
            url: url,
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8'
            },
            data: type === 'POST' ? params : '',
            params: type === 'GET' ? params : ''
        }).then(res => {
            // 成功响应
            resolve(res.data)
        }).catch(err => {
            // 失败响应
            reject(err)
        })
    })
}
