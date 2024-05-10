import ListItem from './ListItem'
import dataStore from '../../options/store'

const enFonts = [
  {
    name: 'Roboto',
    url: 'https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,100;0,300;0,400;0,500;0,700;0,900;1,100;1,300;1,400;1,500;1,700;1,900&display=swap',
  },
  {
    name: 'Open Sans',
    url: 'https://fonts.googleapis.com/css2?family=Open+Sans:ital,wght@0,300..800;1,300..800&family=Roboto:ital,wght@0,100;0,300;0,400;0,500;0,700;0,900;1,100;1,300;1,400;1,500;1,700;1,900&display=swap',
  },
  {
    name: 'Crimson Text',
    url: 'https://fonts.googleapis.com/css2?family=Crimson+Text:ital,wght@0,400;0,600;0,700;1,400;1,600;1,700&display=swap',
  },
]

const cjkFonts = [
  {
    name: 'LXGW WenKai',
    url: 'https://chinese-fonts-cdn.netlify.app/packages/lxgwwenkai/dist/LXGWWenKai-Regular/result.css',
  },
  {
    name: 'Zhuque Fangsong (technical preview)',
    url: 'https://chinese-fonts-cdn.netlify.app/packages/zqfs/dist/ZhuqueFangsong-Regular/result.css',
  },
  {
    name: '瑞美加张清平硬笔行书',
    url: 'https://chinese-fonts-cdn.netlify.app/packages/rmjzqpybxs/dist/瑞美加张清平硬笔行书/result.css',
  },
]

const fonts = navigator.language.startsWith('zh')
  ? cjkFonts.concat(enFonts)
  : enFonts.concat(cjkFonts)

const FontList = () => {
  const [store, setStore] = dataStore
  return (
    <div class="mb-4 flex flex-col space-y-4 px-4">
      <h4 class="text-base font-medium">
        Font Size:{' '}
        <small class="float-right ml-4 text-xs">{store.fontSize}px</small>
      </h4>
      <div class="flex items-center">
        <input
          type="range"
          name="font-size"
          min="14"
          max="32"
          step="1"
          class="flex-1"
          value={store.fontSize}
          onInput={(e) => {
            const value = parseInt(e.target.value)
            setStore('fontSize', value)
            localStorage.setItem('fontSize', value.toString())
          }}
        />
      </div>
      <h4 class="flex items-center text-base font-medium">
        Font Family:{' '}
        <small class="float-right ml-4 text-xs">{store.activeFont?.name}</small>
      </h4>
      {fonts.map((font) => (
        <ListItem font={font} />
      ))}
    </div>
  )
}

export default FontList
