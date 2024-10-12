import axios from 'axios';

const API_KEY = 'a042d6b31e194ae79aef5c80063ffb48';
const BASE_URL = 'https://newsapi.org/v2/top-headlines';

interface Article {
    title: string;
    description: string;
    url: string;
    urlToImage: string;
}

interface NewsResponse {
    status: string;
    articles: Article[];
}

async function fetchTopHeadlines(): Promise<Article[]> {
    try {
        const response = await axios.get<NewsResponse>(BASE_URL, {
            params: {
                apiKey: API_KEY,
                pageSize: 5,
            },
        });

        return response.data.articles;
    } catch (error) {
        console.error('Error fetching top headlines:', error);
        return [];
    }
}

async function fetchNews(preferences: string[]): Promise<Article[]> {
    if (preferences.length === 0) return fetchTopHeadlines();
    const allArticles: Article[] = [];

    for (const pref of preferences) {
        try {
            const response = await axios.get<NewsResponse>(BASE_URL, {
                params: {
                    q: pref,
                    apiKey: API_KEY,
                    pageSize: 5,
                },
            });

            allArticles.push(...response.data.articles);
        } catch (error) {
            console.error(`Error fetching news for "${pref}":`, error);
        }
    }

    return allArticles;
}

export default {
    fetchNews,
};

