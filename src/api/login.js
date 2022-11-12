const http = uni.$u.http

export const getCaptcha = () => http.get('/v1/captcha')
export const login = data => http.post('/v1/login', data)
export const logout = () => http.post('/v1/logout')
export const getInfo = () => http.post('/v1/me/info')
