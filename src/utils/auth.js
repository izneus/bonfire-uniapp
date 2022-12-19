const tokenKey = 'BF_TOKEN_MOBILE'
export const getTokenSync = () => uni.getStorageSync(tokenKey)
export const setTokenSync = token => uni.setStorageSync(tokenKey, token)
export const removeTokenSync = () => uni.removeStorageSync(tokenKey)
