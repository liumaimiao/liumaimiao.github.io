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

// Dynamic mapping of tier files for Vita bundler
const tierFiles = {
    'age-3-5': () => import('./age-3-5.js'),
    'age-6-10': () => import('./age-6-10.js'),
    'age-10-12': () => import('./age-10-12.js'),
    'age-12-16': () => import('./age-12-16.js'),
    'age-16-18': () => import('./age-16-18.js')
};

/**
 * Asynchronously loads the dictionary and phrases data for a specific age tier.
 * This ensures that users only download the megabytes of vocabulary JSON when
 * they actually click on the tier, improving app load times (Code Splitting).
 */
export const loadTierData = async (tierId) => {
    try {
        if (tierFiles[tierId]) {
            const module = await tierFiles[tierId]();
            return {
                dictionary: module.dictionary || {},
                phrases: module.phrases || []
            };
        }
    } catch (error) {
        console.error(`Failed to load data for tier ${tierId}:`, error);
    }

    // Fallback if loading fails or tier doesn't exist
    return { dictionary: {}, phrases: [] };
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
