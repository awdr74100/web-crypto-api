import CryptoJS from 'crypto-js'

export function useCrypto() {
  const CRYPTO_KEY = import.meta.env.VITE_APP_CRYPTO_KEY
  const CRYPTO_IV = import.meta.env.VITE_APP_CRYPTO_IV

  const key = CryptoJS.enc.Utf8.parse(CRYPTO_KEY)
  const iv = CryptoJS.enc.Utf8.parse(CRYPTO_IV)

  const encrypt = (text: string): string => {
    const encrypted = CryptoJS.AES.encrypt(text, key, {
      iv: iv,
      mode: CryptoJS.mode.CBC,
      padding: CryptoJS.pad.Pkcs7
    })

    return encrypted.toString()
  }

  const decrypt = (encryptedText: string): string => {
    const decrypted = CryptoJS.AES.decrypt(encryptedText, key, {
      iv: iv,
      mode: CryptoJS.mode.CBC,
      padding: CryptoJS.pad.Pkcs7
    })

    return decrypted.toString(CryptoJS.enc.Utf8)
  }

  return {
    encrypt,
    decrypt
  }
}
