export function numberToPrice(value: number, locale = 'es-CO'): string {
    const formattedNumber = Number(value).toLocaleString(locale, { style: 'currency', currency: 'COP', maximumFractionDigits: 0 });
    return formattedNumber;
}

export function priceToNumber(value: string) {
    const cleanedValue = value.replace(/[^\d.-]/g, '');
    return Number(cleanedValue);
}
