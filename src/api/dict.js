const http = uni.$u.http

export const listDictsByDictType = dictType => http.post('/v1/dict/listByDictType', { dictType })
