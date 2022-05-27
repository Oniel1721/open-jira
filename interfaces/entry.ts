
export enum EntryStatus {
    PENDING = 'PENDING',
    IN_PROGRESS = 'IN_PROGRESS',
    FINISHED = 'FINISHED'
}

export const validEntryStatus:EntryStatus[] = [
    EntryStatus.FINISHED, 
    EntryStatus.IN_PROGRESS, 
    EntryStatus.PENDING
]


export interface Entry {
    _id: string;
    description: string;
    createdAt: number;
    status: EntryStatus;
}