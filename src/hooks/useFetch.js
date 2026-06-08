"use client";
/* eslint-disable no-unused-vars */

import useSWR from 'swr';
import useSWRInfinite from 'swr/infinite';
import { useCallback, useMemo } from 'react';
import axios from '@/src/lib/axios';

const fetcher = async (url) => {
  const response = await axios.get(url);
  return response.data;
};

const postFetcher = async ([url, data]) => {
  const response = await axios.post(url, data);
  return response.data;
};

export const useFetch = (url, options = {}) => {
  const {
    revalidateOnFocus = true,
    revalidateOnReconnect = true,
    refreshInterval = 0,
    dedupingInterval = 2000,
    fallbackData,
    onSuccess,
    onError,
    onRetry,
  } = options;

  const swrOptions = {
    revalidateOnFocus,
    revalidateOnReconnect,
    refreshInterval,
    dedupingInterval,
    fallbackData,
    onSuccess,
    onError,
    onRetry,
    fetcher,
  };

  const { data, error, isLoading, isValidating, mutate } = useSWR(
    url,
    swrOptions
  );

  const refetch = useCallback(() => mutate(), [mutate]);

  return {
    data,
    error,
    isLoading,
    isValidating,
    mutate,
    refetch,
  };
};

export const useFetchInfinite = (getKey, options = {}) => {
  const {
    revalidateOnFocus = true,
    revalidateOnReconnect = true,
    initialSize = 1,
    revalidateAll = false,
    persistSize = false,
    parallel = false,
  } = options;

  const swrOptions = {
    revalidateOnFocus,
    revalidateOnReconnect,
    initialSize,
    revalidateAll,
    persistSize,
    parallel,
    fetcher,
  };

  const {
    data,
    error,
    isLoading,
    isValidating,
    mutate,
    size,
    setSize,
  } = useSWRInfinite(getKey, swrOptions);

  const flattenedData = useMemo(() => {
    if (!data) return [];
    return data.flat();
  }, [data]);

  const isEmpty = useMemo(() => data?.[0]?.length === 0, [data]);
  const isReachingEnd = useMemo(() => {
    if (!data) return false;
    return data[data.length - 1]?.length === 0 || 
           (data[data.length - 1]?.length < (options.pageSize || 10));
  }, [data, options.pageSize]);

  const isRefreshing = useMemo(() => 
    isValidating && data && data.length === size, 
    [isValidating, data, size]
  );

  const loadMore = useCallback(() => {
    if (!isReachingEnd && !isLoading) {
      setSize(size + 1);
    }
  }, [isReachingEnd, isLoading, setSize, size]);

  return {
    data: flattenedData,
    error,
    isLoading,
    isValidating,
    mutate,
    size,
    setSize,
    isEmpty,
    isReachingEnd,
    isRefreshing,
    loadMore,
  };
};

export const usePost = () => {
  const mutate = useCallback(async (url, data, options = {}) => {
    try {
      const response = await axios.post(url, data, options);
      return response.data;
    } catch (error) {
      throw error;
    }
  }, []);

  return { mutate };
};

export const useCache = (key, fetcherFn, options = {}) => {
  const { ttl = 300000 } = options;

  const { data, error, mutate } = useSWR(
    key,
    async () => {
      const cached = localStorage.getItem(key);
      if (cached) {
        const { value, timestamp } = JSON.parse(cached);
        if (Date.now() - timestamp < ttl) {
          return value;
        }
      }

      const freshData = await fetcherFn();
      localStorage.setItem(
        key,
        JSON.stringify({
          value: freshData,
          timestamp: Date.now(),
        })
      );
      return freshData;
    },
    {
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
      shouldRetryOnError: false,
    }
  );

  const clearCache = useCallback(() => {
    localStorage.removeItem(key);
    mutate();
  }, [key, mutate]);

  return {
    data,
    error,
    isLoading: !data && !error,
    clearCache,
    mutate,
  };
};