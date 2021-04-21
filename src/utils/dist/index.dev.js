"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.rounding = rounding;
exports.debounce = debounce;
exports.playCount = playCount;
exports.timeDate = timeDate;
exports.minute = minute;
exports.likeMusic = likeMusic;
exports.domBollFun = domBollFun;

function rounding(money) {
  var str = String(money);
  var num = str.slice(str.length - 2, str.length)[0] == 0 ? str.substring(0, str.length - 2) : str.substring(0, str.length - 2) + '.' + str.slice(str.length - 2, str.length)[0];
  return num;
} // 防抖


function debounce(func, wait) {
  var timeout;
  if (timeout) clearTimeout(timeout);
  timeout = setTimeout(function () {
    func();
  }, wait);
} // 播放次数


function playCount(count) {
  if (String(count).length > 5) {
    return "".concat(String(count).slice(0, String(count).length - 4), "\u4E07");
  } else {
    return count;
  }
}

function timeDate(time) {
  var date = new Date(time);
  var month = date.getMonth() + 1 + '月';
  var today = date.getDate() + '日';
  return month + today;
} // 转换成分钟


function minute(time) {
  var date = new Date(time);
  return date.getMinutes() + ' : ' + date.getSeconds();
}

function likeMusic(id, likeid) {
  for (var i = 0; i < likeid.length; i++) {
    if (likeid[i] == id) {
      likeid.splice(i, 1);
      return true;
    }
  }

  return false;
}

function domBollFun(direction, domObj) {
  var childLength = domObj.childNodes.length;
  var number = Math.ceil(childLength / 8);
  var i = 1;

  if (direction == 'left') {
    i--;

    if (i <= 1) {
      document.getElementsByClassName('left')[1].style.opacity = 0;
      document.getElementsByClassName('right')[1].style.opacity = 1;
    }

    domObj.setAttribute('style', "transform:translateX(0%)");
  } else if (direction == 'right') {
    i++;

    if (i >= number) {
      document.getElementsByClassName('right')[1].style.opacity = 0;
      document.getElementsByClassName('left')[1].style.opacity = 1;
    }

    domObj.setAttribute('style', "transform:translateX(-100%)");
  }

  domObj.style.transition = '1s';
}