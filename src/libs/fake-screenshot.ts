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
  const canvasWidth = 512
  const lineHeight = 50
  const fontSize = 20
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
  ctx.font = `${fontSize}px Arial`
  ctx.fillStyle = 'white'
  ctx.textAlign = 'center'
  ctx.shadowColor = 'black'
  ctx.shadowBlur = 5
  ctx.shadowOffsetX = 2
  ctx.shadowOffsetY = 2

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
      ctx?.drawImage(image, sx, sy, sw, sh, dx, dy, dw, dh)
    }
    const y = scaledHeight + i * lineHeight - (lineHeight - fontSize) / 2
    ctx?.fillText(lines[i], canvas.width / 2, y)
  }

  ctx.font = '12px Arial'
  ctx.fillStyle = 'grey'
  ctx.textAlign = 'right'
  ctx.shadowColor = 'black'
  ctx.shadowBlur = 5
  ctx.shadowOffsetX = 1
  ctx.shadowOffsetY = 1
  ctx.fillText('Created by Twillot', canvas.width, 12)
  ctx.fillText('@sizipaigu', canvas.width, 24)
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
