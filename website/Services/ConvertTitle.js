
export const convertTitleToUrl = (title) => {
    
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

    
    convertedTitle = convertedTitle
        .replace(/\s+/g, '-')     // Boşlukları '-' ile değiştir
        .replace(/[^\w-]+/g, '')  // Geçersiz karakterleri kaldır
        .toLowerCase();           // Tüm harfleri küçük harfe çevir

    return convertedTitle;
};
