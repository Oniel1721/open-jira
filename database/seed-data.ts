import { EntryStatus } from "../interfaces";


interface SeedData {
    entries: SeedEntry[]
}

interface SeedEntry {
    description: string;
    status: EntryStatus;
    createdAt: number;
}

export const seedData:SeedData = {
    entries: [
        {
            description: 'First description: Pendiente',
            status: EntryStatus.PENDING,
            createdAt: Date.now()
        },
        {
            description: 'Second description: En progeso',
            status: EntryStatus.IN_PROGRESS,
            createdAt: Date.now() - 1000000
        },
        {
            description: 'Third description: Terminada',
            status: EntryStatus.FINISHED,
            createdAt: Date.now() - 100000
        },
    ]
}