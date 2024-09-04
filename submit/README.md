## 数据源

- 1000UserGuide
- aidirecotries.es
- quicklist.ing
- https://www.boostaitraffic.com/directory
- some other directories sites

添加新数据源时可能需要对 `similarweb.py` 进行修改后再执行 `get-final.py` 获得最终去重的结果

## Similarweb 数据抓取

使用 `Apify` 的接口：https://console.apify.com/actors/yOYYzj2J5K88boIVO/input
执行后下载 JSON 文件，然后执行 `python3 similarweb.py` 获取最终结果

## Google SERP

使用 `Apify` 的接口：https://console.apify.com/actors/nFJndFXA5zjCTuudP/input

## Ahrefs

使用 `RapidAPI` 获取 `Ahrefs` 关于域名权重的数据
