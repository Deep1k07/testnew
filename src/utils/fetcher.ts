// utils/fetcher.ts

export const fetcher = async <T>(...args: [RequestInfo, RequestInit?]): Promise<T> => {
    const response = await fetch(...args);
    
    if (!response.ok) {
      throw new Error(`An error occurred: ${response.statusText}`);
    }
  
    const data = await response.json();
    return data;
  };
  