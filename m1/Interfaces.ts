// Interface boekgegevens
export interface BookI {
    id: number;
    title: string;
    description: string;
    publicationYear: number;
    isAvailable: boolean;
    publicationDate: string;
    coverImageUrl: string;
    genre: string;
    authors: string[];
    publisherId: number;
}

// Interface uitgeversgegevens
export interface PublisherI {
    id: number;
    name: string;
    location: string;
    contactEmail: string;
}

