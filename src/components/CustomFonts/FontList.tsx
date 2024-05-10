import ListItem from './ListItem'
import dataStore from '../../options/store'

const fonts = [
  {
    name: 'Roboto',
    url: 'https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,100;0,300;0,400;0,500;0,700;0,900;1,100;1,300;1,400;1,500;1,700;1,900&display=swap',
  },
  {
    name: 'Open Sans',
    url: 'https://fonts.googleapis.com/css2?family=Open+Sans:ital,wght@0,300..800;1,300..800&family=Roboto:ital,wght@0,100;0,300;0,400;0,500;0,700;0,900;1,100;1,300;1,400;1,500;1,700;1,900&display=swap" rel="stylesheet',
  },
  {
    name: 'LXGW WenKai',
    url: 'https://chinese-fonts-cdn.netlify.app/packages/lxgwwenkai/dist/LXGWWenKai-Regular/result.css',
  },
  {
    name: 'Zhuque Fangsong (technical preview)',
    url: 'https://chinese-fonts-cdn.netlify.app/packages/zqfs/dist/ZhuqueFangsong-Regular/result.css',
  },
  {
    name: 'XuandongKaishu',
    url: 'https://chinese-fonts-cdn.netlify.app/packages/xuandongkaishu/dist/XuandongKaishu/result.css',
  },
]

const FontList = () => {
  const [store, setStore] = dataStore
  return (
    <div class="mb-4 flex flex-col space-y-4 px-4">
      <h4 class="text-base font-medium">
        Font Size:{' '}
        <small class="float-right ml-4 text-sm">{store.fontSize}px</small>
      </h4>
      <div class="flex items-center">
        <input
          type="range"
          name="font-size"
          min="14"
          max="32"
          step="1"
          class="flex-1"
          onInput={(e) => {
            const value = parseInt(e.target.value)
            setStore('fontSize', value)
            localStorage.setItem('fontSize', value.toString())
          }}
        />
      </div>
      <h4 class="text-base font-medium">
        Choose your font:{' '}
        <small class="float-right ml-4 text-sm">{store.activeFont?.name}</small>
      </h4>
      {fonts.map((font) => (
        <ListItem font={font} />
      ))}
    </div>
  )
}

export default FontList
