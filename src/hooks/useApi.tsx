export enum SerachType{
    all='',
    movie='movie',
    series='series',
    episode='episode'
}

export interface DetailsResult {
    Genre: string;
    Title: string;
    Year :string;
    poster: string;
    imdbRating: string;
    Director: string;
    Actors: string
    Website: string;


}
