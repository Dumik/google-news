export default function SearchInput({query, handleQuery} : {query : string, handleQuery: (value: string) => void }) {
    return (
        <input type="text" onChange={(e) => {handleQuery(e.target.value.trim())}} className="bg-gray-100" value={query}/>
    ) 
}
