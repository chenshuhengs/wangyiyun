export function rounding(money) {
    let str = String(money)
    let num =
        str.slice(str.length - 2, str.length)[0] == 0
            ? str.substring(0, str.length - 2)
            : str.substring(0, str.length - 2) + '.' + str.slice(str.length - 2, str.length)[0]

    return num
}

export function playCount(count) {
    if (String(count).length > 5) {
        return `${String(count).slice(0, String(count).length - 4)}万`
    } else {
        return count
    }
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
