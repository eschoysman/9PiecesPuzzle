import {useCallback, useEffect, useRef, useState} from 'react';

export function useInfinityScroll({chunkSize = 10, fetchData }) {
    const [data, setData] = useState([]);
    const [hasNextPage, setHasNextPage] = useState(true);
    const [nextPage, setNextPage] = useState(1);
    const [isLoading, setIsLoading] = useState(false);

    const observerRef = useRef(null);
    const loaderRef = useRef(null);

    const loadMore = useCallback(async () => {
        if(!hasNextPage || isLoading) return;
        setIsLoading(true);
        try {
            const response = await fetchData(nextPage, chunkSize);
            if(response?.data) {
                setData(prev => [...prev, ...response.data]);
                setHasNextPage(response.hasNextPage);
                if(response.hasNextPage) {
                    setNextPage(prev => prev + 1);
                }
            }
        } catch(error) {
            console.error('Error loading more data:', error);
        } finally {
            setIsLoading(false);
        }
    }, [fetchData, nextPage, chunkSize, hasNextPage, isLoading]);

    useEffect(() => {
        loadMore();
    }, []);

    useEffect(() => {
        if (observerRef.current) observerRef.current.disconnect();

        observerRef.current = new IntersectionObserver(entries => {
            if(entries[0].isIntersecting && hasNextPage && !isLoading) {
                loadMore();
            }
        });

        const currentLoader = loaderRef.current;
        if(currentLoader) {
            observerRef.current.observe(currentLoader);
        }

        return () => {
            if (observerRef.current && currentLoader) {
                observerRef.current.unobserve(currentLoader);
            }
        };
    }, [loadMore, hasNextPage, isLoading]);

    return {data, loaderRef, isLoading, hasNextPage};

}
