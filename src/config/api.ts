/**
 * API configuration based on environment
 */

const getApiBaseUrl = (): string => {
    // Check if we're in production environment
    if (process.env.NODE_ENV === 'production') {
        return 'https://xaregrowth.com';
    }

    // Default to localhost for development
    return 'http://localhost:5490';
};

export const API_BASE_URL = getApiBaseUrl();

export const API_ENDPOINTS = {
    userReviewDetails: (companyId: string) => `${API_BASE_URL}/api/review/userReviewDetails/${companyId}`,
    companyDescription: (companyId: string) => `${API_BASE_URL}/api/review/companyDescription/${companyId}`,
    xareview: () => `${API_BASE_URL}/api/review/xareview`,
    document: (documentId: string) => `${API_BASE_URL}/api/document/${documentId}`,
} as const;
