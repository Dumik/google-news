import { FiltersEnum } from '../types/filters';
import axios from 'axios';
import { SearchResult } from '../types/SearchResult';

export const searchGoogleNews = async (filter: FiltersEnum, filterValue: string, setNews: (value: SearchResult[]) => void) => {
    const apiKey = process.env.NEXT_PUBLIC_GOOGLE_API_KEY;
    const cx = process.env.NEXT_PUBLIC_CX;
    
    let searchQuery = 'latest news';

    if (filter === FiltersEnum.COUNTRY && filterValue) {
      searchQuery += ` ${filterValue}`;
    } else if (filter === FiltersEnum.DATE && filterValue) {
      searchQuery += ` after:${filterValue}`;
    } else if (filter === FiltersEnum.TOPIC && filterValue) {
      searchQuery += ` ${filterValue}`;
    }

    const url = `https://www.googleapis.com/customsearch/v1?q=${encodeURIComponent(searchQuery)}&cx=${cx}&key=${apiKey}`;
    console.log('Request URL:', url);
    let result = []; 

    try {
      const { data } = await axios.get(url);
      result = data.items.map((item: any) => ({
        title: item.title,
        link: item.link,
        image: item.pagemap && item.pagemap.cse_thumbnail && item.pagemap.cse_thumbnail[0]
          ? item.pagemap.cse_thumbnail[0].src
          : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRvYaQnAuw5GYDqUuq1ph7d4dKq-RtUOoHOKQ&s",
      }));
    } catch (error) {
      console.error('Error fetching search results:', error);
      return [];
    } finally {
      setNews(result);
    }
  };