import { QueryOptions } from './types'

export function parseTwitterQuery(query) {
  const patterns = {
    fromUser: /from:(\w+)/g, // 使用g修饰符以匹配所有结果
    since: /since:(\d{4}-\d{2}-\d{2})/g,
    until: /until:(\d{4}-\d{2}-\d{2})/g,
  }

  const result: QueryOptions = {
    fromUser: '',
    since: '',
    until: '',
    keyword: '',
  }

  // 检查每个模式并更新结果
  for (const [key, pattern] of Object.entries(patterns)) {
    let match
    while ((match = pattern.exec(query))) {
      // 使用while循环和exec方法匹配所有结果
      result[key] = match[1]
      query =
        query.substring(0, match.index) + query.substring(pattern.lastIndex) // 移除已匹配的部分
    }
  }

  // 将剩余的查询字符串设置为keyword
  result.keyword = query.trim()

  return result
}
