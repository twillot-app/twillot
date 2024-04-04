export function Text({ text, keyword }: { text: string, keyword?: string }) {
  const kRegex = keyword? `|${keyword}` : '';
  const regex = new RegExp(`(@\\w+|https:\\/\\/[^\s]+|#[^\s#]+${kRegex})`, 'gi');
  const parts = text.split(regex);

  return (
    <span>
      {parts.map((part) => {
        if (part.startsWith('@') || part.startsWith('https') || part.startsWith('#')) {
          return <span class="text-blue-400 cursor-pointer" data-text={part}>{part}</span>;
        } else if (keyword && part.toLowerCase() === keyword.toLowerCase()) {
          // bg-color 不生效
          return <span class="cursor-text" style={{ 'background-color': 'yellowgreen' }}>{part}</span>;
        }

        return part;
      })}
    </span>
  );
}
