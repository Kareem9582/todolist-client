export const GetData = (key: string): string | null => {
    const storage = window.sessionStorage;
    const storageString = storage.getItem(key);
    if (!storageString) return '';
    return JSON.parse(storageString) as string;
} 