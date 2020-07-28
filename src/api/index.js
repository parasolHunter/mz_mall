import Aes from './aes'
import vhttp from './request'

export const fn = vhttp

//首页数据
export const getHome = () => vhttp('10100.do', {}, 'POST')

export const getGoods = () => vhttp('/api/goods')

export const SMSlanding = (data) => vhttp('10002.do', { d: Aes.encrypt(data) }, 'POST')

export const sendCode = (data) => vhttp('10001.do', { d: Aes.encrypt(data) }, 'POST')

export const getClassify = (index) => vhttp('/api/classify', {
    type: index
})
