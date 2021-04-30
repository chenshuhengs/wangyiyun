"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = lyricParser;
exports.parseLyric = parseLyric;

function lyricParser(data) {
  return {
    lyric: parseLyric(data.lrc.lyric || ''),
    tlyric: parseLyric(data.tlyric.lyric || ''),
    lyricuser: data.lyricUser,
    transuser: data.transUser
  };
}

function parseLyric(lrc) {
  var lyrics = lrc.split('\n');
  var lrcObj = [];

  for (var i = 0; i < lyrics.length; i++) {
    var lyric = decodeURIComponent(lyrics[i]);
    var timeReg = /\[\d*:\d*((\.|:)\d*)*\]/g;
    var timeRegExpArr = lyric.match(timeReg);
    if (!timeRegExpArr) continue;
    var content = lyric.replace(timeReg, '');

    for (var k = 0, h = timeRegExpArr.length; k < h; k++) {
      var t = timeRegExpArr[k];
      var min = Number(String(t.match(/\[\d*/i)).slice(1));
      var sec = Number(String(t.match(/:\d*/i)).slice(1));
      var time = min * 60 + sec;

      if (content !== '') {
        lrcObj.push({
          time: time,
          content: content
        });
      }
    }
  }

  return lrcObj;
} // https://www.zhihu.com/people/liu-zhu-39-4-3/zvideos
// https://zhuanlan.zhihu.com/p/368904101