import { splitProps } from 'solid-js'

export function Text(props: { text: string; keyword?: string }) {
  const [fields] = splitProps(props, ['text', 'keyword'])
  const { text, keyword } = fields
  const at = '@\\w+'
  const link = 'https?:\\/\\/[\\w\\d\\.\\-\\/_?=&#%]+'
  const hashtag = '#(?!\\s|$)[^\\s#]+'
  const regex = new RegExp(`(${at}}|${link}|${hashtag})`, 'gi')
  const atRegex = new RegExp(`^${at}$`, 'gi')
  const linkRegex = new RegExp(`^${link}$`, 'gi')
  const hashtagRegex = new RegExp(`^${hashtag}$`, 'gi')
  const parts = text.split(regex)

  return (
    <span>
      {parts.map((part) => {
        if (
          atRegex.test(part) ||
          linkRegex.test(part) ||
          hashtagRegex.test(part)
        ) {
          return (
            <span
              class="text-blue-400 cursor-pointer"
              data-text={part}
              style={{
                'background-color':
                  keyword && part.toLowerCase().includes(keyword.toLowerCase())
                    ? 'yellowgreen'
                    : 'inherit',
              }}
            >
              {part}
            </span>
          )
        } else if (
          keyword &&
          part.toLowerCase().includes(keyword.toLowerCase())
        ) {
          return part.split(new RegExp(`(${keyword})`, 'gi')).map((subPart) => {
            return subPart.toLowerCase() === keyword.toLowerCase() ? (
              <span
                class="cursor-text"
                style={{ 'background-color': 'yellowgreen' }}
              >
                {subPart}
              </span>
            ) : (
              subPart
            )
          })
        }

        return part
      })}
    </span>
  )
}
