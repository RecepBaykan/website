// convertTitleToUrl fonksiyonunu dışarıya aktarıyoruz
export const convertTitleToUrl = (title) => {
    // Türkçe karakterleri İngilizce karşılıklarına dönüştür
    const turkishChars = {
        'ğ': 'g',
        'ı': 'i',
        'ş': 's',
        'ç': 'c',
        'ö': 'o',
        'ü': 'u',
        'Ğ': 'G',
        'İ': 'I',
        'Ş': 'S',
        'Ç': 'C',
        'Ö': 'O',
        'Ü': 'U'
    };

    let convertedTitle = title.split('').map(char => turkishChars[char] || char).join('');

    // Boşlukları ve diğer özel karakterleri düzenle
    convertedTitle = convertedTitle
        .replace(/\s+/g, '-')     // Boşlukları '-' ile değiştir
        .replace(/[^\w-]+/g, '')  // Geçersiz karakterleri kaldır
        .toLowerCase();           // Tüm harfleri küçük harfe çevir

    return convertedTitle;
};

// ConvertTitle bileşenini oluştur
export const ConvertTitle = () => {
    // Eğer bileşen içinde başka işlevsellik gerekiyorsa buraya ekleyebilirsin
    return null; // Örnek olması açısından boş bir bileşen
};
