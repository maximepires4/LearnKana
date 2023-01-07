import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import supabase from '../lib/supabase'

export default function SearchBar({ title, description, dbName, accentColor}) {
    const [search, setSearch] = useState(null)
    const searchRef = useRef(null)

    async function fetchData(keyword) {
        setSearch(false)
        const { data, error } = await supabase.from(dbName).select('*').ilike('name', `%${keyword}%`).limit(5)

        if (error) {
            console.log(error)
            setSearch([])
        }

        if (!data) {
            setSearch([])
        } else {
            setSearch(data)
        }
    }

    useEffect(() => {
        function handleClickOutside(event) {
            if (searchRef.current && !searchRef.current.contains(event.target)) {
                setSearch(null)
            }
        }
        document.addEventListener("mousedown", handleClickOutside);

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        }
    }, [searchRef])

    return (
        <div className="w-full mt-20">
            <p className="text-2xl">
                {description}{' '}
                <code className="rounded-md bg-gray-100 p-3 font-mono text-lg">
                    {title}
                </code>
            </p>
            
            <div className="w-full max-w-screen-xl mx-auto flex justify-center py-5">
                <div className={`w-full max-w-2xl bg-white border border-${accentColor}-400 shadow-md rounded-lg px-3 py-2`}>
                    <div className="max-w-2xl mx-auto w-full">
                        <form className="flex items-center">
                            <label htmlFor="simple-search" className="sr-only">Search</label>
                            <div className="relative w-full">
                                <div className="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
                                    <svg className="w-5 h-5 text-gray-500 dark:text-gray-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd"></path></svg>
                                </div>
                                <input onClick={(e) => fetchData(e.target.value)} onChange={(e) => fetchData(e.target.value)} type="text" id="simple-search" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Search" required />
                            </div>
                        </form>
                    </div>
                    {
                        search != null ?
                            <div className='pt-2' ref={searchRef}>
                                {
                                    search ?
                                        <div>
                                            {
                                                search.length > 0 ?
                                                    search.map((item, i) => (
                                                        <SearchItem key={i} item={item} route={title} />
                                                    ))
                                                    :
                                                    <p>No {title} found</p>
                                            }
                                        </div>
                                        :
                                        <svg className="w-full items-center mt-2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" width="40" height="40" fill="none">
                                            <path className="animate-spin origin-center center" stroke="#0A0A30" strokeLinecap="round" strokeWidth="1.5" d="M12 6.864v1.333m0 7.606v1.333M17.136 12h-1.333m-7.606 0H6.864m8.768 3.632l-.943-.943M9.311 9.311l-.943-.943m0 7.264l.943-.943m5.378-5.378l.943-.943" />
                                        </svg>
                                }
                            </div>
                            :
                            <></>
                    }
                </div>
            </div>
        </div>
    )
}

function SearchItem({ route, item }) {
    return (
        <Link href={`/${route}/${item.id}`} className="group flex rounded-md px-2 py-2 my-2 text-sm text-gray-700 hover:text-blue-400 hover:bg-blue-100 focus:text-blue-400 focus:bg-blue-100">
            <span className="bg-gray-400 h-2 w-2 m-2 rounded-full group-hover:bg-green-400 group-focus:bg-green-400"></span>
            <div className="font-medium px-2">{item.name}</div>
            <div className="flex-grow text-right text-sm font-normal text-gray-500 tracking-wide">{item.information}</div>
        </Link>
    )
}