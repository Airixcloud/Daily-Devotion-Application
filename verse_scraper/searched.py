def search(root, count):
    result = root.xpath(f"//verse_count[@extra='{count}']")

    if result:
        entry = result[0]

        book = entry.xpath("./book/text()")[0]
        chapter = entry.xpath("./chapter/text()")[0]
        verse = entry.xpath("./verse/text()")[0]
        text = entry.xpath("./text/text()")[0]
        return [book, chapter, verse, text]

def search_V(root, data):

    Bib_name = [('SangTheKy', 'Genesis'), 
                ('XuatEDipToKy', 'Exodus'), 
                ('LeViKy', 'Leviticus'), 
                ('DanSoKy', 'Numbers'), 
                ('PhucTruyenLuatLeKy', 'Deuteronomy'), 
                ('GioSue', 'Joshua'), 
                ('CacQuanXet', 'Judges'), 
                ('RuTo', 'Ruth'), 
                ('SaMuEnI', '1 Samuel'), 
                ('SaMuEnII', '2 Samuel'), 
                ('CacVuaI', '1 Kings'), 
                ('CacVuaII', '2 Kings'), 
                ('SuKyI', '1 Chronicles'), 
                ('SuKyII', '2 Chronicles'), 
                ('EXoRa', 'Ezra'), 
                ('NeHeMi', 'Nehemiah'), 
                ('EXoTe', 'Esther'), 
                ('Giop', 'Job'), 
                ('ThiThien', 'Psalms'), 
                ('ChamNgon', 'Proverbs'), 
                ('TruyenDao', 'Ecclesiastes'), 
                ('NhaCa', 'Song of Solomon'), 
                ('ESai', 'Isaiah'), 
                ('GieReMi', 'Jeremiah'), 
                ('CaThuong', 'Lamentations'), 
                ('EXeChiEn', 'Ezekiel'), 
                ('DaNiEn', 'Daniel'), 
                ('OSe', 'Hosea'), 
                ('GioEn', 'Joel'), 
                ('AMot', 'Amos'), 
                ('ApDia', 'Obadiah'), 
                ('GioNa', 'Jonah'), 
                ('MiChe', 'Micah'), 
                ('NaHum', 'Nahum'), 
                ('HaBaCuc', 'Habakkuk'), 
                ('SoPhoNi', 'Zephaniah'), 
                ('AGhe', 'Haggai'), 
                ('XaChaRi', 'Zechariah'), 
                ('MaLaChi', 'Malachi'), 
                ('MaThiO', 'Matthew'), 
                ('Mac', 'Mark'), 
                ('LuCa', 'Luke'), 
                ('Giang', 'John'), 
                ('CongVuCacSuDo', 'Acts'),
                 ('RoMa', 'Romans'), 
                 ('CoRinhToI', '1 Corinthians'), 
                 ('CoRinhToII', '2 Corinthians'), 
                 ('GaLaTi', 'Galatians'), 
                 ('EPheSo', 'Ephesians'), 
                 ('PhiLip', 'Philippians'), 
                 ('CoLoSe', 'Colossians'), 
                 ('TeSaLoNiCaI', '1 Thessalonians'), 
                 ('TeSaLoNiCaII', '2 Thessalonians'), 
                 ('TiMoTheI', '1 Timothy'), 
                 ('TiMoTheII', '2 Timothy'), 
                 ('Tit', 'Titus'), 
                 ('PhiLeMon', 'Philemon'), 
                 ('HeBoRo', 'Hebrews'), 
                 ('GiaCo', 'James'), 
                 ('PhiERoI', '1 Peter'), 
                 ('PhiERoII', '2 Peter'), 
                 ('GiangI', '1 John'), 
                 ('GiangII', '2 John'), 
                 ('GiangIII', '3 John'), 
                 ('GiuDe', 'Jude'), 
                 ('KhaiHuyen', 'Revelation')]

    book, chapter, verse = data[0], data[1], data[2]

    for book_name in Bib_name:
        if book_name[1] == book:
            book = book_name[0]

    text = root.xpath(
    f"//BIBLEBOOK[@bname='{book}']/CHAPTER[@cnumber='{chapter}']/VERS[@vnumber='{verse}']/text()"
    )
    
    return [book, chapter, verse, text[0]]
