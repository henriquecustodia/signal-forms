// ticket.model.ts
export interface Ticket {
	attendeeName: string
	ticketType: 'VIP' | 'Standard' | 'Economy'
	eventId: string,
  quantity: number
}
