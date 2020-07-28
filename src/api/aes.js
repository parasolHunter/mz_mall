/**
 * 工具类
 */
import CryptoJS from 'crypto-js'

const aesKey = 'FECE018C402936BA'
export default {
    encrypt (word) {
        var srcs = ''
        var key = CryptoJS.enc.Utf8.parse(aesKey)
        if (typeof (word) === 'object') {
            for (var i in word) {
                if (typeof (word[i]) !== 'string') {
                    word[i] = word[i].toString()
                }
            }
            srcs = JSON.stringify(word)
        }
        var encrypted = CryptoJS.AES.encrypt(srcs, key, {
            mode: CryptoJS.mode.ECB,
            padding: CryptoJS.pad.Pkcs7
        })
        encrypted = encrypted.ciphertext.toString()
        var encryptedHexStr = CryptoJS.enc.Hex.parse(encrypted)
        return encryptedHexStr.toString()
    },
    decrypt (word) {
        var key = CryptoJS.enc.Utf8.parse(aesKey)
        var encryptedHexStr = CryptoJS.enc.Hex.parse(word)
        var srcs = CryptoJS.enc.Base64.stringify(encryptedHexStr)
        var decrypt = CryptoJS.AES.decrypt(srcs, key, {
            mode: CryptoJS.mode.ECB,
            padding: CryptoJS.pad.Pkcs7
        })
        var decryptedStr = decrypt.toString(CryptoJS.enc.Utf8).toString()
        return decryptedStr
    }

}
