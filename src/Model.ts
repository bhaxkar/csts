export type TicketPriority =  "Low" | "Medium" | "High"
export type TicketStatus = "Open" | "In Progress" | "Resolved"
export type Note = {
    NoteId: string,
    NoteTitle : string,
    NoteCreatedDate: string
}

export interface Ticket {
    ticketId: string
    title: string,
    description: string,
    priority: TicketPriority,
    status: TicketStatus,
    date: string,
    time: string,
    isTicketUpdated: boolean,
    notes?: Note[],
    updatedDate?: string,
}