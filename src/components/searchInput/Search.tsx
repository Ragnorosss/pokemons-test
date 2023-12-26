'use client'
import axios from 'axios';
import React, { ChangeEvent, useEffect, useState } from 'react'
type TPokemon = {
    id?:number;
    name:string;
}

export const Search = () => {
    const [search, setSearch] = useState<string>('')
    const [searchResult, setSearchResult] = useState<TPokemon[]>([])
    useEffect(() => {
        const fetchData1 = async () => {
          if (search.trim() !== '') {
          try {
            const res = await axios.get(`https://pokeapi.co/api/v2/item/${search}`);
            setSearchResult(res.data)
          } 
          catch (error) {
            console.error('Ошибка при получении данных с API', error);
          }
        }
        else {
          setSearchResult([]);
        }
        };
        fetchData1();
      }, [search]);
    
      return (
          <div>
      <input 
        type='text' placeholder='Search'
        value={search}
        onChange={(e:ChangeEvent<HTMLInputElement>) => setSearch(e.target.value)}
        style={{color:'black'}}
        />
        <div className='w-[320px] mx-auto p-[30px] border text-center'>
            <div>{searchResult.name}</div>
        </div>
    </div>
  )
}
