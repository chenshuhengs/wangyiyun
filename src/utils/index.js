export function rounding(money) {
    let str = String(money)
    let num =
        str.slice(str.length - 2, str.length)[0] == 0
            ? str.substring(0, str.length - 2)
            : str.substring(0, str.length - 2) + '.' + str.slice(str.length - 2, str.length)[0]

    return num
}
// 防抖
export function debounce(func, wait) {
    let timeout
    if (timeout) clearTimeout(timeout)
    timeout = setTimeout(() => {
        func()
    }, wait)
}

// 播放次数
export function playCount(count) {
    if (String(count).length > 5) {
        return `${String(count).slice(0, String(count).length - 4)}万`
    } else {
        return count
    }
}

export function timeDate(time) {
    let date = new Date(time)
    var month = date.getMonth() + 1 + '月'
    var today = date.getDate() + '日'
    return month + today
}
// 转换成分钟
export function minute(time) {
    let date = new Date(time)
    return date.getMinutes() + ' : ' + date.getSeconds()
}

export function likeMusic(id, likeid) {
    for (let i = 0; i < likeid.length; i++) {
        if (likeid[i] == id) {
            likeid.splice(i, 1)
            return true
        }
    }
    return false
}
// 视频是否点赞
export function fabulous(id, mvList) {
    for (let i = 0; i < mvList.length; i++) {
        if (mvList[i].mlogBaseData.id == id) {
            return true
        }
    }
    return false
}

// 视频是否收藏
export function queryCollection(id, queryList) {
    for (let i = 0; i < queryList.length; i++) {
        if (queryList[i].vid == id) {
            return true
        }
    }
    return false
}

export function domBollFun(direction, domObj) {
    let childLength = domObj.childNodes.length
    let number = Math.ceil(childLength / 8)
    let i = 1
    if (direction == 'left') {
        i--
        if (i <= 1) {
            document.getElementsByClassName('left')[1].style.opacity = 0
            document.getElementsByClassName('right')[1].style.opacity = 1
        }
        domObj.setAttribute('style', `transform:translateX(0%)`)
    } else if (direction == 'right') {
        i++
        if (i >= number) {
            document.getElementsByClassName('right')[1].style.opacity = 0
            document.getElementsByClassName('left')[1].style.opacity = 1
        }
        domObj.setAttribute('style', `transform:translateX(-100%)`)
    }
    domObj.style.transition = '1s'
}
