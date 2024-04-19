export enum SearchType {
  all = "multi",
  movie = "movie",
  series = "tv",
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
  Awards: string;
}
export interface AllData {
  adult: boolean;
  backdrop_path: string;
  genre_ids: number[];
  id: number;
  media_type: string;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  release_date: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
}

export interface MovieSearchOptions {
  query: string;
  includeAdult?: boolean;
  language?: string;
  primaryReleaseYear?: number;
  page?: number;
  region?: string;
  year?: number;
}

export const useApi = () => {
  let url = import.meta.env.VITE_SITE_URL as string;
  let apiKey = import.meta.env.VITE_SITE_API_KEY as string;
  let authKey = import.meta.env.VITE_SITE_AUTH_KEY;
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${authKey}`,
    },
  };

  const getALLDATA = async (): Promise<AllData> => {
    const res = await fetch(`${url}trending/all/day?language=en-US`, options);
    return res.json();
  };

  const searchData = async (
    query: string,
    includeAdult: boolean,
    language: string,
    primaryReleaseYear: number,
    page: number,
    region: string,
    year: number,
    type: SearchType
  ): Promise<MovieSearchOptions[] | SearchError> => {
    const res = await fetch(
      `${url}/search/${type}?query=${query}&include_adult=${includeAdult}&language=${language}&page=${page}&region=${region}`
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
    getALLDATA,
  };
};

export default useApi;
