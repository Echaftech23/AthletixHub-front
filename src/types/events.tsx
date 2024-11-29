export interface Event {
    id: string;
    title: string;
    artist: string;
    date: string;
    time: string;
    venue: string;
    location: string;
    imageUrl: string;
    status: 'sold-out' | 'available' | 'closed';
}