import ImageSearchResults from '@/components/ImageSearchResults';
import Link from 'next/link';
import { Suspense } from 'react';
import ImageSkeleton from './loading';

async function fetchSearchResults(searchTerm, startIndex) {
    const response = await fetch(
        `https://www.googleapis.com/customsearch/v1?key=${process.env.API_KEY}&cx=${process.env.CONTEXT_KEY}&q=${searchTerm}&searchType=image&start=${startIndex}`
    );

    if (!response.ok) throw new Error('Something went wrong');
    const data = await response.json();
    return data;
}

// 包装组件，以便在 Suspense 中使用
async function ImageSearchComponent({ searchParams }) {
    const startIndex = searchParams.start || '1';
    const searchTerm = searchParams.searchTerm;
    const results = await fetchSearchResults(searchTerm, startIndex);

    if (!results || results.length === 0) {
        return (
            <div className='flex flex-col justify-center items-center pt-10'>
                <h1 className='text-3xl mb-4'>
                    No results found for {searchTerm}
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

    return <ImageSearchResults results={results} />;
}

// 页面组件，使用 Suspense 包裹 ImageSearchComponent
export default function ImageSearchPage({ searchParams }) {
    return (
        <Suspense fallback={<ImageSkeleton />}>
            <ImageSearchComponent searchParams={searchParams} />
        </Suspense>
    );
}
