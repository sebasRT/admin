
export function toSnakeCase(value: string) {
    return value
        .replace(/[^a-zA-Z0-9]+/g, '_')
        .toLowerCase();
}

export function toCamelCase(value: string) {
    return value
        .replace(/_([a-z])/g, (g) => g[1].toUpperCase());
}