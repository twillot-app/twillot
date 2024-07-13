export function loadImage(file: File): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onload = (event) => {
      const img = new Image()
      img.onload = () => resolve(img)
      img.onerror = (err) => reject(err)
      img.src = event.target?.result as string
    }
    reader.onerror = (err) => reject(err)
    reader.readAsDataURL(file)
  })
}

export function generateFakeScreenshot(
  text: string,
  image: HTMLImageElement,
): Promise<ArrayBuffer> {
  const canvasWidth = Math.min(1600, image.width)
  const lineHeight = (60 * image.width) / 1600
  const fontSize = (48 * image.width) / 1600
  const canvas = document.createElement('canvas')
  const ctx = canvas.getContext('2d')
  const lines = text.split('\n')
  const scaleFactor = canvasWidth / image.width
  const scaledHeight = image.height * scaleFactor
  const imageLineHeight = lineHeight / scaleFactor

  canvas.width = canvasWidth
  canvas.height = scaledHeight

  if (lines.length > 1) {
    canvas.height += (lines.length - 1) * lineHeight
  }

  ctx.drawImage(image, 0, 0, canvas.width, scaledHeight)

  // 设置字体样式
  ctx.font = `bold ${fontSize}px sans-serif`
  ctx.textAlign = 'center'
  ctx.fillStyle = 'white'
  ctx.strokeStyle = 'black'
  ctx.lineWidth = 0.02 * fontSize // 相当于 .02em
  ctx.shadowColor = 'rgba(0, 0, 0, 0.4)'
  ctx.shadowBlur = 0.04 * fontSize // 相当于 .04em
  ctx.shadowOffsetX = 0.04 * fontSize
  ctx.shadowOffsetY = 0.04 * fontSize

  for (let i = 0; i < lines.length; i++) {
    if (i > 0) {
      const sx = 0,
        sy = image.height - imageLineHeight,
        sw = image.width,
        sh = imageLineHeight
      const dx = 0,
        dy = scaledHeight + (i - 1) * lineHeight,
        dw = canvas.width,
        dh = lineHeight
      ctx.drawImage(image, sx, sy, sw, sh, dx, dy, dw, dh)
    }
    const y =
      scaledHeight +
      i * lineHeight -
      (lineHeight - fontSize) / 2 -
      lineHeight / 5
    ctx.strokeText(lines[i], canvas.width / 2, y) // 先描边
    ctx.fillText(lines[i], canvas.width / 2, y) // 再填充
  }

  ctx.font = '24px sans-serif'
  ctx.fillStyle = 'rgba(128, 128, 128, 0.8)' // 半透明灰色
  ctx.textAlign = 'right'
  ctx.shadowColor = 'black'
  ctx.shadowBlur = 2
  ctx.shadowOffsetX = 1
  ctx.shadowOffsetY = 1
  ctx.fillText('Created by Twillot', canvas.width - 36, 24)

  return new Promise((resolve, reject) => {
    canvas.toBlob((blob) => {
      if (blob) {
        blob.arrayBuffer().then(resolve).catch(reject)
      } else {
        reject(new Error('Canvas toBlob failed.'))
      }
    })
  })
}
