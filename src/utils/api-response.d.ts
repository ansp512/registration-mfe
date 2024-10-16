export interface EventsEntity {
    event_id: number;
    name: string;
    event_date: Date;
    category: string;
    start_time: string;
    end_time: string;
}

export type GetEventsResponse = EventsEntity[];