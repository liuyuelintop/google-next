import ImageSearchResults from '@/components/ImageSearchResults';
import Link from 'next/link';
import { Suspense } from 'react';
import Loading from './loading';

async function fetchSearchResults(searchParams) {
    const startIndex = searchParams.start || '1';
    const response = await fetch(
        `https://www.googleapis.com/customsearch/v1?key=${process.env.API_KEY}&cx=${process.env.CONTEXT_KEY}&q=${searchParams.searchTerm}&searchType=image&start=${startIndex}`
    );
    if (!response.ok) throw new Error('Something went wrong');
    const data = await response.json();
    return data;
}

export default async function WebSearchPage({ searchParams }) {
    return (
        <Suspense fallback={<Loading />}>
            <ImageSearchContent searchParams={searchParams} />
        </Suspense>
    );
}
async function ImageSearchContent({ searchParams }) {
    const results = await fetchSearchResults(searchParams);

    if (!results || results.length === 0) {
        return (
            <div className='flex flex-col justify-center items-center pt-10'>
                <h1 className='text-3xl mb-4'>
                    No results found for {searchParams.searchTerm}
                </h1>
                <p className='text-lg'>
                    Try searching the web or images for something else{' '}
                    <Link href='/' className='text-blue-500'>
                        Home
                    </Link>
                </p>
            </div>
        );
    }

    return <div>{results.items && <ImageSearchResults results={results} />} </div>;
}

