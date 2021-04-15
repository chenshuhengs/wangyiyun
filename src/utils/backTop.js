// 回到顶部
function backTop(dom, bool) {
    if (bool) {
        let time = setInterval(() => {
            dom.scrollTop -= 30
            if (dom.scrollTop <= 0) {
                clearInterval(time)
            }
        }, 10)
    } else {
        dom.scrollTop = 0
    }
}

export default backTop
