export type Event = {
    id: string;
    title: string;
    description: string;
    date: string; // ISO format
    location: string;
    imageUrl?: string;
    registrationLink?: string;
    tags?: string[];
}