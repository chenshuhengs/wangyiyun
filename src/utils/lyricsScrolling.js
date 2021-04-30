export default function lyricParser(data) {
    return {
        lyric: parseLyric(data.lrc.lyric || ''),
        tlyric: parseLyric(data.tlyric.lyric || ''),
        lyricuser: data.lyricUser,
        transuser: data.transUser,
    }
}

export function parseLyric(lrc) {
    const lyrics = lrc.split('\n')
    const lrcObj = []
    for (let i = 0; i < lyrics.length; i++) {
        const lyric = decodeURIComponent(lyrics[i])
        const timeReg = /\[\d*:\d*((\.|:)\d*)*\]/g
        const timeRegExpArr = lyric.match(timeReg)
        if (!timeRegExpArr) continue
        const content = lyric.replace(timeReg, '')
        for (let k = 0, h = timeRegExpArr.length; k < h; k++) {
            const t = timeRegExpArr[k]
            const min = Number(String(t.match(/\[\d*/i)).slice(1))
            const sec = Number(String(t.match(/:\d*/i)).slice(1))
            const time = min * 60 + sec
            if (content !== '') {
                lrcObj.push({ time: time, content })
            }
        }
    }
    return lrcObj
}
// https://www.zhihu.com/people/liu-zhu-39-4-3/zvideos
// https://zhuanlan.zhihu.com/p/368904101
