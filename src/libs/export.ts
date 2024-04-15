// This file is copied from https://github.com/prinsss/twitter-web-exporter/blob/main/src/utils/exporter.ts

/**
 * Supported formats of exporting.
 */
export const EXPORT_FORMAT = {
  JSON: 'JSON',
  CSV: 'CSV',
} as const

export type ExportFormatType =
  (typeof EXPORT_FORMAT)[keyof typeof EXPORT_FORMAT]

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type DataType = Record<string, any>

/**
 * Escape characters for CSV file.
 */
export function csvEscapeStr(str: string) {
  return `"${str.replace(/"/g, '""').replace(/\n/g, '\\n').replace(/\r/g, '\\r')}"`
}

/**
 * Save a text file to disk.
 */
export function saveFile(
  filename: string,
  content: string,
  prependBOM: boolean = false,
) {
  const link = document.createElement('a')
  const blob = new Blob(
    prependBOM ? [new Uint8Array([0xef, 0xbb, 0xbf]), content] : [content],
    {
      type: 'text/plain;charset=utf-8',
    },
  )
  const url = URL.createObjectURL(blob)

  link.href = url
  link.download = filename
  link.click()
  URL.revokeObjectURL(url)
}

/**
 * Export data and download as a file.
 */
export async function exportData(
  data: DataType[],
  format: ExportFormatType,
  filename: string,
) {
  try {
    let content = ''
    let prependBOM = false
    console.log(`Exporting to ${format} file: ${filename}`)

    switch (format) {
      case EXPORT_FORMAT.JSON:
        content = await jsonExporter(data)
        break
      case EXPORT_FORMAT.CSV:
        prependBOM = true
        content = await csvExporter(data)
        break
    }
    saveFile(filename, content, prependBOM)
  } catch (err) {
    console.error('Failed to export file', err as Error)
  }
}

export async function jsonExporter(data: DataType[]) {
  return JSON.stringify(data, undefined, '  ')
}

export async function csvExporter(data: DataType[]) {
  const headers = Object.keys(data[0] ?? {})
  let content = headers.join(',') + '\n'

  for (const row of data) {
    const values = headers.map((header) => {
      const value = row[header]
      if (typeof value === 'string') {
        return csvEscapeStr(value)
      }

      if (typeof value === 'object') {
        return csvEscapeStr(JSON.stringify(value))
      }

      return value
    })
    content += values.join(',')
    content += '\n'
  }

  return content
}
