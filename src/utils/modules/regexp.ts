/**
 * @description 正则表达式 (数据验证)
 */
// 英文
const validEng = (val: string): boolean => /^[a-zA-Z]+$/.test(val);

// 数字
const validNum = (val: string): boolean => /^[0-9]+$/.test(val);

export { validEng, validNum };
