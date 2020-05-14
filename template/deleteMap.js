/*
 * 过滤目录中的所有文件包括子目录
 * @param{ String } 需要过滤的目录
 */
let deleteMap = require('@daojia/prohibit-soucemap')
deleteMap('./dist')
