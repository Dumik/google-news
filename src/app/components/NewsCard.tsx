import { SearchResult } from '../types/SearchResult';

export default function NewsCard({title, link, image}: SearchResult) {
    return (
        <div className='flex max-w-[460px] gap-2'>  
            <img src={image} alt="" width={200} height={200}/>
            <a href={link} className='underline hover:text-sky-600'><h1>{title}</h1></a>
        </div>
    ) 
}
