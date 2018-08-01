import axios from '../../node_modules/_axios@0.18.0@axios'
axios.defaults.timeout = 5000
axios.defaults.baseURL = 'http://localhost:7001'
axios.interceptors.request.use(config => {
    return config
}, error => {
    console.log('参数错误')
    return Promise.reject(error)
})

axios.interceptors.response.use(res => {
    return res
}, error => {
    console.log('网络异常')
    return Promise.reject(error)
})

// post请求方法
export function fetch(url, params) {
    return new Promise((resolve, reject) => {
        axios.post(url, params)
            .then(res => {
                resolve(res.data)
            }, err => {
                reject(err)
            })
            .catch(error => {
                reject(error)
            })
    })
}
// get请求方法
export function get(url, params) {
    return new Promise((resolve, reject) => {
        axios.get(url, params)
            .then(res => {
                resolve(res.data)
            }, err => {
                reject(err)
            })
            .catch(error => {
                reject(error)
            })
    })
}
// put请求方法
export function put(url, params) {
    return new Promise((resolve, reject) => {
        axios.put(url, params)
            .then(res => {
                resolve(res.data)
            }, err => {
                reject(err)
            })
            .catch(error => {
                reject(error)
            })
    })
}
// del请求方法
export function del(url, params) {
    return new Promise((resolve, reject) => {
        axios.delete(url, params)
            .then(res => {
                resolve(res.data)
            }, err => {
                reject(err)
            })
            .catch(error => {
                reject(error)
            })
    })
}
