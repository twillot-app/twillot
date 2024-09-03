import requests
import json
from urllib.parse import urlparse

endpoint = "https://api.apify.com/v2/acts/curious_coder~similarweb-scraper/runs?token=apify_api_zaAlAUfoEhN7dbVw9KGBUs2jeVEVKj1xzDzM"


def get_domains_from_json(file_path: str) -> None:
    domains = []
    with open(file_path, "r", encoding="utf-8") as file:
        data = json.load(file)
        for item in data:
            if "_source" in item and "url_text" in item["_source"]:
                url = item["_source"]["url_text"]
            elif "link" in item:
                url = item["link"]
            elif "url" in item:
                url = item["url"]
            else:
                continue
            domain = urlparse(url).netloc
            domains.append(domain)
    print(len(domains))
    requests.post(endpoint, json={"domains": domains})


if __name__ == "__main__":
    file_paths = [
        "directories/quicklist.ing.json",
        "directories/aidirecotries.json",
        "directories/1000user.json",
    ]
    for file_path in file_paths:
        get_domains_from_json(file_path)
