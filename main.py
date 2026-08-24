from lxml import etree
import searched

tree_vietnam = etree.parse("orca_share_media1785744056085_7489953437417504610.xml")
root_vietnam = tree_vietnam.getroot()

tree_english = etree.parse("cleaned.xml")
root_english = tree_english.getroot()

count = input("Enter: ")

english = searched.search(root_english, count)

vietnamese = searched.search_V(root_vietnam, english)

print(english, vietnamese)

