export function Text({ text, keyword }: { text: string, keyword?: string }) {
  const regex = new RegExp(`(@\\w+|https?:\\/\\/[\\w\\d\\.\\-\\/_?=&#%]+|#[^\s#]+)`, 'gi');
  const parts = text.split(regex);

  return (
    <span>
      {parts.map((part) => {
        if (part.startsWith('@') || part.startsWith('https') || part.startsWith('#')) {
          return <span class="text-blue-400 cursor-pointer" data-text={part} style={{ "background-color": keyword && part.toLowerCase().includes(keyword.toLowerCase())? "yellowgreen" : "inherit" }}>{part}</span>;
        } else if (keyword && part.toLowerCase().includes(keyword.toLowerCase())) {
          return part.split(new RegExp(`(${keyword})`, 'gi')).map((subPart) => {
            return subPart.toLowerCase() === keyword.toLowerCase()
             ? <span class="cursor-text" style={{ 'background-color': 'yellowgreen' }}>{subPart}</span>
              : subPart;
          })
        }

        return part;
      })}
    </span>
  );
}
