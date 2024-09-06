import json
import requests
import time
import random
import os
import csv

# 从环境变量读取API密钥
API_KEY = os.environ.get("OPENROUTER_API_KEY")
if not API_KEY:
    raise ValueError("未设置OPENROUTER_API_KEY环境变量")

API_URL = "https://openrouter.ai/api/v1/chat/completions"

def get_category_and_ugc(domain, url, title, description, max_retries=3, base_delay=1):
    prompt = f"""
    Domain: {domain}
    URL: {url}
    Title: {title}
    Description: {description}

    Based on the information above, please determine:
    1. The category of this website from the following list:
    - Social Media Platform
    - Video Sharing Platform
    - Blogging Platform
    - Question and Answer Platform
    - Forum and Community Platform
    - News and Media Platform
    - Professional Social Network Platform
    - Review and Rating Platform
    - Podcast Platform
    - Document Sharing Platform
    - Presentation Sharing Platform
    - Code Sharing Platform
    - Design Sharing Platform
    - Image Sharing Platform
    - Music Sharing Platform
    - E-commerce Platform
    - Crowdfunding Platform
    - Education and Online Learning Platform
    - Travel and Accommodation Platform
    - Job Search Platform
    - Local Business Directory Platform
    - Open Source Project Platform
    - Social Bookmarking Platform
    - Content Aggregation Platform
    - Creator Support Platform
    - Instant Messaging Platform
    - Online Collaboration Tool Platform
    - Cloud Storage Platform
    - Streaming Platform
    - Virtual and Augmented Reality Platform
    - Gaming and Game Streaming Platform
    - Dating and Social Discovery Platform
    - Health and Fitness Platform
    - Financial Platform
    - Restaurant Reservation and Food Delivery Platform

    2. Whether this is a User-Generated Content (UGC) site (true/false)

    Please respond in the following JSON format:
    {{"category": "chosen category", "isUGC": true/false}}
    """

    headers = {
        "Authorization": f"Bearer {API_KEY}",
        "Content-Type": "application/json"
    }

    data = {
        "model": "openai/gpt-4",
        "messages": [{"role": "user", "content": prompt}]
    }

    for attempt in range(max_retries):
        try:
            response = requests.post(API_URL, headers=headers, json=data, timeout=30)
            response.raise_for_status()
            result = response.json()
            return json.loads(result['choices'][0]['message']['content'])
        except requests.exceptions.RequestException as e:
            print(f"尝试 {attempt + 1} 失败: {str(e)}")
            if attempt == max_retries - 1:
                print(f"达到最大重试次数,跳过此项")
                return None
            delay = base_delay * (2 ** attempt) + random.uniform(0, 1)
            print(f"等待 {delay:.2f} 秒后重试...")
            time.sleep(delay)
        except (KeyError, json.JSONDecodeError) as e:
            print(f"解析响应时出错: {str(e)}")
            return None

# 读取原始JSON数据
with open('directories/backlinks_final.json', 'r') as f:
    data = json.load(f)


processed_data = []
# 处理每个项目
for item in data:
    # source json
    if 'organicResults' in item and item['organicResults']:
        result = item['organicResults'][0]
        processed_item = {
            'domain': item['searchQuery']['term'].split(':')[-1],
            'url': result.get('url', ''),
            'displayedUrl': result.get('displayedUrl', ''),
            'title': result.get('title', ''),
            'description': result.get('description', ''),
            'resultsTotal': item.get('resultsTotal', 0)
        }
        processed_item.update(get_category_and_ugc(processed_item['domain'], processed_item['url'], processed_item['title'], processed_item['description']))
        processed_data.append(processed_item)
        print(processed_item)
        time.sleep(0.1)
    # order final json
    if 'category' in item:
        processed_data.append(item)

# 按resultsTotal降序排序
processed_data.sort(key=lambda x: x['resultsTotal'], reverse=True)

# 将更新后的数据写入文件
with open('directories/backlinks_final.json', 'w', encoding='utf-8') as f:
    json.dump(processed_data, f, ensure_ascii=False, indent=2)

# 新增: 将isUGC为真的数据写入CSV文件
with open('directories/backlinks_final.csv', 'w', newline='', encoding='utf-8') as csvfile:
    fieldnames = ['domain', 'url', 'title', 'description', 'resultsTotal', 'category']
    writer = csv.DictWriter(csvfile, fieldnames=fieldnames)
    
    writer.writeheader()
    for item in processed_data:
        if item.get('isUGC', True):
            item.pop('isUGC')
            item.pop('displayedUrl')
            writer.writerow(item)

print("处理完成,数据已更新到JSON文件,UGC数据已写入CSV文件")