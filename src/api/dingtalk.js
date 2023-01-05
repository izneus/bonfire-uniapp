const http = uni.$u.http

export const ddLogin = data => http.post('/v1/dd/bonfire/login', data)
export const getDdSign = data => http.post('/v1/dd/bonfire/getSign', data)
