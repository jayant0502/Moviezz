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


export const useApi = () => {
  let url = import.meta.env.VITE_SITE_URL as string;
  let apiKey = import.meta.env.VITE_SITE_API_KEY as string;
  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIyZTUwMTU1OWQ3YjcwYWMwODcyZTdkOTFkYWIyYTQxMyIsInN1YiI6IjY2MjBiOTc2MDIzMWYyMDE3YzExODBjMCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.Xp1n8syySKwkh7DP7of2btjBxNchWWPzEaTtXZ2ZqAc'
    }
  };

  const getALLDATA = async (): Promise<AllData> => {
    const res = await fetch('https://api.themoviedb.org/3/trending/all/day?language=en-US',options);
    return res.json();
  };

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
    getALLDATA,
  };
};

export default useApi;
