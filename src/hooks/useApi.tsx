export enum SearchType {
  all = "",
  movie = "movie",
  series = "series",
  episode = "episode",
}

export interface SearchResult {
  Title: string;
  Year: string;
  Poster: string;
  imdbID: string;
  Type: string;
}
export interface SearchError {
  Response: string;
  Error: string;
}
export interface DetailsResult {
  Genre: string;
  Title: string;
  Year: string;
  Poster: string;
  imdbRating: string;
  Director: string;
  Actors: string;
  Website: string;
  Plot: string;
  Awards: string
}

export const useApi = () => {
  let url = import.meta.env.VITE_SITE_URL as string;
  let apiKey = import.meta.env.VITE_SITE_API_KEY as string;

  const searchData = async (
    title: string,
    type: SearchType
  ): Promise<SearchResult[] | SearchError> => {
    const res = await fetch(
      `${url}?s=${encodeURI(title)}&type=${type}&apiKey=${apiKey}`
    );
    return res.json();
  };

  const getDetails = async (id: string): Promise<DetailsResult> => {
    const res = await fetch(`${url}?i=${id}&plot=full&apikey=${apiKey}`);

    return res.json();
  };

  return {
    searchData,
    getDetails,
  };
};

export default useApi;
