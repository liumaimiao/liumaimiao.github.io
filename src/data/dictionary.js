import { getTierData } from '../services/api.js';

// Centralized Dictionary Data Loader and Metadata
export const SCENARIO_METADATA = {
    home: { id: 'home', title: 'At Home', emoji: '🏠', background: '#FFF3E0' },
    outdoor: { id: 'outdoor', title: 'Outdoors', emoji: '🌳', background: '#E8F5E9' },
    school: { id: 'school', title: 'At School', emoji: '🏫', background: '#E3F2FD' },
    maths: { id: 'maths', title: 'Maths & Numbers', emoji: '🔢', background: '#E0F7FA' },
    food: { id: 'food', title: 'Food & Drink', emoji: '🍎', background: '#FCE4EC' },
    clothes: { id: 'clothes', title: 'Clothes', emoji: '👕', background: '#ECEFF1' },
    body: { id: 'body', title: 'Body & Feelings', emoji: '👀', background: '#FFF8E1' },
    animals: { id: 'animals', title: 'Animals', emoji: '🐕', background: '#EFEBE9' }
};

/**
 * Asynchronously loads the dictionary and phrases data for a specific age tier
 * from the Cloudflare Worker API.
 */
export const loadTierData = async (tierId) => {
    try {
        const data = await getTierData(tierId);
        return {
            dictionary: data.dictionary || {},
            phrases: data.phrases || []
        };
    } catch (error) {
        console.error(`Failed to load data for tier ${tierId}:`, error);
        return { dictionary: {}, phrases: [] };
    }
};

// Return a list of categories available for a loaded dictionary object
export const getAvailableScenarios = (dictObj) => {
    if (!dictObj) return [];
    return Object.keys(dictObj)
        .filter(key => dictObj[key] && dictObj[key].length > 0)
        .map(key => SCENARIO_METADATA[key])
        .filter(meta => meta !== undefined);
};

// Helper function to get a flat, alphabetically sorted list of words from a dictionary obj
export const getSortedDictionary = (dictObj) => {
    if (!dictObj) return [];

    let allWords = [];
    Object.values(dictObj).forEach(scenarioItems => {
        allWords = [...allWords, ...scenarioItems];
    });

    return allWords.sort((a, b) => a.word.localeCompare(b.word));
};
