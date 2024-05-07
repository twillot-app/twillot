export default function ZenMode() {
  return (
    <div class="fixed inset-0 z-40 flex flex-col bg-white dark:bg-gray-800">
      <header class="mx-auto h-14 w-[60rem] pb-4">
        <h1>Header</h1>
      </header>
      <div class="-my-14 flex-1 overflow-auto py-14">
        <article class="mx-auto w-[60rem] px-2">
          <p>这里是文章内容，内容可能非常长，需要滚动条来查看全部内容。</p>
          <p>
            {new Array(100)
              .fill(
                '这是重复的文本，用于创建一个非常长的段落，以演示滚动效果。',
              )
              .join(' ')}
          </p>
        </article>
      </div>
      <footer class="mx-auto h-14 w-[60rem] pt-4">
        <h1>Footer</h1>
      </footer>
    </div>
  )
}
