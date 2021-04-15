// 图片懒加载设置图片大小
export function getImgUrl(url, w, h) {
    if (!h) {
        h = w
    }
    url += `?param=${w}y${h}`
    return url
}
