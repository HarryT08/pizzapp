export const cleanProductName = (name : string) => {
    const clean_name = name.trim().toLowerCase();
    let regexPattern = /\s+/g;
    let cleaned = clean_name.replace(regexPattern, " ");
    return cleaned
}
