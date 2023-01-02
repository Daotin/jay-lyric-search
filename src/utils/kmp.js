/**
 *
 * @param {*} str 目标字符串
 * @param {*} mat 模板字符串
 */
export function KMP(mat, str) {
  let commonMaxLen = 0; // 最大公共字符串长度
  let next = [0, 0]; // 字符串的前两个字符的最大公共前缀长度直接赋值为0
  let matLen = mat.length; // 模板字符串长度
  let strIndex = 0; // str 中当前匹配的索引
  let matIndex = 0; // mat 中当前匹配的索引

  // 该循环求出 next 数组
  for (let i = 2; i <= matLen - 1; i++) {
    let temp = mat.slice(0, i);
    for (let j = 1; j < temp.length - 1; j++) {
      let tempSub1 = temp.slice(0, j);
      let tempSub2 = temp.slice(temp.length - j, temp.length);
      if (tempSub1 == tempSub2) {
        commonMaxLen = tempSub1.length;
      }
    }
    next[i] = commonMaxLen;
  }

  // console.log("next: ", next); // [ 0, 0, 0, 1, 2, 3 ]

  while (matIndex < matLen && strIndex < str.length) {
    if (str[strIndex] == mat[matIndex]) {
      // 如果当前两个字符相等，移动至下一位
      strIndex++;
      matIndex++;
    } else {
      if (matIndex == 0) {
        // 如果指示为元素为 0，目标字符串索引加1，从头开始匹配
        strIndex += 1;
      } else {
        matIndex = next[matIndex]; // next 数组中的元素指示模板字符串哪个元素去匹配
      }
    }
  }

  if (matIndex == matLen) {
    // 匹配成功时，跳出while循环，模板字符串索引是等于它的长度的
    return strIndex - matLen;
  }

  return -1;
}
