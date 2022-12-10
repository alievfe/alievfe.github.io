function insertStr(str, index, insertStr) {
    const ary = str.split('');		// 转化为数组
    for (const i in ary) {
    ary[i] = '<span>'+ary[i]+'</span>'
    }
    return ary.join('');				// 拼接成字符串后输出
}
console.log(insertStr("我是你爸爸", 1, "b"))
