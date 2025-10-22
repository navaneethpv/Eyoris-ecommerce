"use client";
import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { categories } from '../../components/home/components/Catergoris/categories';

export default function SearchPage() {
  const searchParams = useSearchParams();
  const initialQuery = searchParams.get('q') || '';
  const [query, setQuery] = useState(initialQuery);
  const [filteredSuggestions, setFilteredSuggestions] = useState<string[]>([]);

  useEffect(() => {
    if (query.trim() === '') {
      setFilteredSuggestions([]);
    } else {
      const filtered = categories
        .map((cat: any) => cat.title)
        .filter((title: string) => title.toLowerCase().includes(query.toLowerCase()));
      setFilteredSuggestions(filtered);
    }
  }, [query]);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">Search Results</h1>
      <div className="relative mb-6">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search for Products..."
          className="w-full border border-gray-300 rounded-full py-2 px-4 pl-10 focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
        />
        <svg
          className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
          />
        </svg>
      </div>
      {filteredSuggestions.length > 0 ? (
        <div>
          <h2 className="text-xl font-semibold mb-4">Suggestions:</h2>
          <ul className="space-y-2">
            {filteredSuggestions.map((suggestion, index) => (
              <li key={index} className="p-4 border border-gray-200 rounded-md">
                {suggestion}
              </li>
            ))}
          </ul>
        </div>
      ) : query.trim() !== '' ? (
        <p>No results found for "{query}".</p>
      ) : (
        <p>Enter a search term to see results.</p>
      )}
    </div>
  );
}
