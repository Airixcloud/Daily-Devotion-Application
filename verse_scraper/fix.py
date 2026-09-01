import json
store = set()
# Open and parse the file
with open("today.json", "r", encoding="utf-8") as file:
    data = json.load(file)

for entry in data:
    store.add(entry["Sach"])

print("\n".join(sorted(store)))