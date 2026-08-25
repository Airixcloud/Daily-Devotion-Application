from lxml import etree
import searched
import json
import random

def main():
    data = []
    tree_vietnam = etree.parse("orca_share_media1785744056085_7489953437417504610.xml")
    root_vietnam = tree_vietnam.getroot()

    tree_english = etree.parse("cleaned.xml")
    root_english = tree_english.getroot()
    for count in range(1,731):
        english = searched.search(root_english, count)

        vietnamese = searched.search_V(root_vietnam, english)

        data.append({
            "Count": count,
            "Book": english[0],
            "Chapter": english[1],
            "Verse": english[2],
            "Text_english": english[3],
            "Sach": vietnamese[0],
            "Doan": vietnamese[1],
            "Cau": vietnamese[2],
            "Text_vietnamese": vietnamese[3]
        })

    with open("today.json", "w", encoding="utf-8") as file:
        json.dump(data, file, ensure_ascii=False, indent=4)

if __name__ == "__main__":
    main()

