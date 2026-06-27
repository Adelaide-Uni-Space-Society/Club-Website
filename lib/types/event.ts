export type Event = {
    id: string;
    title: string;
    description: string;
    date: string; // ISO format
    location: string;
    imageUrl?: string;
    imageUrls?: string[];
    registrationLink?: string;
    tags?: string[];
}