import { useEffect } from 'react';
enum storageTypes {
    local = 'local',
    session = 'session',
}

const storageVar = {
    [storageTypes.local]: window.localStorage,
    [storageTypes.session]: window.sessionStorage,
};

export const useStorage = <T,>(key: string, init: T, storageType: storageTypes) => {
    if (window === undefined) throw new Error('Window is missing');
    const storage = storageVar[storageType];
    if (storage === undefined) throw new Error('Storage type not selected.');

    const getStorage = () => {
        const storageString = storage.getItem(key);
        if (!storageString) return init;
        return JSON.parse(storageString) as T;
    };

    const deleteStorage = () => storage.removeItem(key);

    const updateStorage = (obj: T) => {
        storage.setItem(key, JSON.stringify(obj));
        return obj;
    };

    useEffect(() => { }, [key]);

    return { getStorage, deleteStorage, updateStorage };
};

const useSessionStorage = <T,>(key: string, init: T) => useStorage(key, init, storageTypes.session);
const useLocalStorage = <T,>(key: string, init: T) => useStorage(key, init, storageTypes.local);

export { useSessionStorage, useLocalStorage, storageTypes };

export default useStorage;