export const disabledColor = '#ebedf0'

export function getColorForFavorites(favorites: number) {
  if (favorites === 0) {
    return disabledColor
  }

  let level

  if (favorites <= 10) {
    level = Math.ceil(favorites / 5)
  } else {
    level = Math.ceil((favorites - 10) / 45) + 2 // 以11为起点，每45个收藏增加一个级别，加2是因为1-10已经用了2个级别
  }

  level = Math.min(level, 4) // 总共4个级别
  const startColor = { r: 155, g: 233, b: 168 }
  const endColor = { r: 33, g: 110, b: 57 }
  let fraction = (level - 1) / 3

  // 线性插值计算颜色
  const r = Math.round(startColor.r + fraction * (endColor.r - startColor.r))
  const g = Math.round(startColor.g + fraction * (endColor.g - startColor.g))
  const b = Math.round(startColor.b + fraction * (endColor.b - startColor.b))

  return `#${r.toString(16).padStart(2, '0')}${g.toString(16).padStart(2, '0')}${b.toString(16).padStart(2, '0')}`
}
