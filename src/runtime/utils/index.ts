import {__PREFIX} from "./constants"

/**
 * Search HTML Key
 * @param key
 * @param search
 */
export const htmlKey = (key: string, search: unknown): string => {
    if (typeof search === 'object' && search !== null && 'value' in search) {
        const searchKey = (search as { value: string }).value;

        if (!searchKey) {
            return key.replace(__PREFIX, "");
        }

        const escapedSearchKey = searchKey.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
        const regex = new RegExp(escapedSearchKey, "gi");

        return key.replace(regex, (match) => `<mark class="bg-blue-100">${match}</mark>`).replace(__PREFIX, "");
    }

    return key.replace(__PREFIX, "");
};


export const __JSON = () => `state${Date.now()}.json`;

export const isObject = (value: unknown): boolean => typeof value === "object" && value !== null;

export const isObjectExpanding = (key: string, value: string[]) => value.includes(key);

export const isObjectEditing = (key: string, value: string[]) => value.includes(key);
