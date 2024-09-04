'use client'
import { useEffect, useState } from 'react';
import NewsCard from './components/NewsCard';
import { FiltersEnum } from './types/filters';
import { SearchResult } from './types/SearchResult';
import {searchGoogleNews} from './api/fetch'

export default function Home() {
  const [news, setNews] = useState<SearchResult[]>([]);
  const [filter, setFilter] = useState(FiltersEnum.COUNTRY);
  const [country, setCountry] = useState('');
  const [date, setDate] = useState('');
  const [topic, setTopic] = useState('latest news');
  const FiltersType = Object.values(FiltersEnum);
  const dateToday = new Date()

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      if (filter) {
        searchGoogleNews(filter, filter === FiltersEnum.COUNTRY ? country : filter === FiltersEnum.DATE ? date : topic, setNews);
      }
    }, 1000);

    return () => clearTimeout(delayDebounceFn);
  }, [filter, country, date, topic]);

  return (
    <div className="flex flex-col gap-4">
      <div className="flex gap-2 p-4  justify-between mt-4">
        <div className="flex  gap-2">
          {FiltersType.map((filterType, index) => (
            <div key={index} className="flex  gap-2">
              <button 
                onClick={() => setFilter(filterType)} 
                className={filter === filterType ? 'bg-blue-500 text-white py-1 px-4  rounded-sm capitalize' : 'bg-gray-200 py-1 px-4  rounded-sm capitalize'}
              >
                {filterType}
              </button>
              {filter === filterType && (
                <input
                className='bg-gray-100 border-gray-900 rounded-sm px-2 py-1'
                  type="text"
                  value={filterType === FiltersEnum.COUNTRY ? country : filterType === FiltersEnum.DATE ? date : topic}
                  onChange={(e) => {
                    if (filterType === FiltersEnum.COUNTRY) setCountry(e.target.value);
                    else if (filterType === FiltersEnum.DATE) setDate(e.target.value);
                    else if (filterType === FiltersEnum.TOPIC) setTopic(e.target.value);
                  }}
                  placeholder={`Enter ${filterType.toLowerCase()}`}
                />
              )}
            </div>
          ))}
        </div>


          <button 
            onClick={() => {
              setCountry('');
              setDate('');
              setTopic('latest news');
              setNews([]);
            }}
            className="bg-red-500 text-white py-1 px-4 rounded max-w-52"
            >
            Clear Search
          </button>
        </div>
        <span className='pl-4 p-1 w-full text-center'> NEWS - {dateToday.toDateString()}</span>
        <div className='p-4 flex flex-col gap-4'>
          {news.map(el => (
            <NewsCard key={el.link} {...el} />
          ))}
      </div>
    </div>
  );
}