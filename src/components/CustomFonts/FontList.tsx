import ListItem from './ListItem'

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
  return (
    <div class="flex flex-col space-y-4 px-4">
      {fonts.map((font) => (
        <ListItem font={font} />
      ))}
    </div>
  )
}

export default FontList
