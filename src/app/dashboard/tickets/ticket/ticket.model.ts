export interface Ticket {
    id: string;
    title: string;
    request: string;
    status: 'open' | 'closed';
}

// interface specifies the shape or structure of an object, including its properties and the types of those properties
// Ticket interface describes an object that represents a "ticket" with the following properties: id, title, request, status
// The export keyword ensures that the Ticket interface is available for use in other parts of the application. This means you can import this interface in other files to type-check objects as Ticket.