// 回到顶部
function backTop(dom) {
    let time = setInterval(() => {
        dom.scrollTop -= 30
        if (dom.scrollTop <= 0) {
            clearInterval(time)
        }
    }, 10)
}

export default backTop
