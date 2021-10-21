export interface Movie {
    id: string;
    image: string;
    title: string;
}

export interface LikedMovie extends Movie {
    likeCount: number;
}
