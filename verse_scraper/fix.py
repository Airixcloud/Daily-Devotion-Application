import json

with open("today.json", "r", encoding="utf-8") as file:
    data = json.load(file)

for count, entry in enumerate(data, start=1):
    entry["Count"] = count

with open("today.json", "w", encoding="utf-8") as file:
    json.dump(data, file, ensure_ascii=False, indent=4)

print("Count fixed!")