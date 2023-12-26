'use client'
import axios from 'axios';
import Head from 'next/head';
import Link from 'next/link';
import React, { useEffect, useState } from 'react'

export const Paginations = () => {
    const [page, setPage] = useState<number>(1);
    const [abilities, setAbilities] = useState<any[]>([]);
  
    useEffect(() => {
      const fetchData = async () => {
        try {
          const response = await axios.get(`https://pokeapi.co/api/v2/item/?limit=10&offset=${(page - 1) * 20}`);
          setAbilities(response.data.results);
        } catch (error) {
          console.error('Ошибка при получении данных с API', error);
        }
      };
  
      fetchData();
    }, [page]);
  
    return (
      <div>
        <Head>
          <title>PokeAPI Pagination</title>
        </Head>
  
        <main>
          <h1>Abilities from PokeAPI</h1>
          <ul className='flex justify-center gap-3'>
            {abilities.map((ability: any) => (
                <>
                    <li key={ability.name} className='border max-w-[100px]'>
                        <Link href={`/pokemon/${ability.name}`}>
                            {ability.name}
                        </Link>
                    </li>
                </>
            ))}
          </ul>
  
          <div className='flex flex-col'>
            <button
              onClick={() => setPage((prevPage) => Math.max(prevPage - 1, 1))}
              disabled={page === 1}
            >
              Previous Page
            </button>
            <span>Current Page: {page}</span>
            <button
              onClick={() => setPage((prevPage) => prevPage + 1)}
            >
              Next Page
            </button>
          </div>
        </main>
      </div>  
      )
}
