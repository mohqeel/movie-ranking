/** Interface for movie info from API */
export interface Movie {
    id: string;
    image: string;
    title: string;
    release_date: number;
}

/** Interface for liked movies */
export interface LikedMovie extends Movie {
    likeCount: number;
}
