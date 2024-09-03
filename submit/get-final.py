import json
import sys
import os


def process_json(input_path, output_path):
    # 读取 JSON 文件
    with open(input_path, "r", encoding="utf-8") as file:
        data = json.load(file)

    # 使用字典来存储唯一的 domain 项目
    unique_domains = {}

    for item in data:
        domain = item["domain"]
        if domain not in unique_domains:
            unique_domains[domain] = item
        else:
            # 如果 domain 已存在,比较 visits 并保留较大的
            if int(item["visits"]) > int(unique_domains[domain]["visits"]):
                unique_domains[domain] = item

    # 将结果转换回列表
    result = list(unique_domains.values())

    # 按 visits 降序排序
    result.sort(key=lambda x: int(x["visits"]), reverse=True)

    # 将结果写入新的 JSON 文件
    with open(output_path, "w", encoding="utf-8") as file:
        json.dump(result, file, ensure_ascii=False, indent=2)

    print(f"原始数据项数: {len(data)}")
    print(f"去重后数据项数: {len(result)}")
    print(f"结果已保存到: {output_path}")


if __name__ == "__main__":
    if len(sys.argv) != 3:
        print("使用方法: python script.py <输入文件路径> <输出文件路径>")
        sys.exit(1)

    input_path = sys.argv[1]
    output_path = sys.argv[2]

    if not os.path.exists(input_path):
        print(f"错误: 输入文件 '{input_path}' 不存在")
        sys.exit(1)

    process_json(input_path, output_path)
