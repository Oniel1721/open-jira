
export enum EntryStatus {
    PENDING = 'PENDING',
    IN_PROGRESS = 'IN_PROGRESS',
    FINISHED = 'FINISHED'
}


export interface Entry {
    _id: string;
    description: string;
    createAt: number;
    status: EntryStatus;
}