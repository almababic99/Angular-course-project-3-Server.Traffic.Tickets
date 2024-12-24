import { Component } from '@angular/core';
import { NewTicketComponent } from "./new-ticket/new-ticket.component";
import { Ticket } from './ticket/ticket.model';
import { TicketComponent } from "./ticket/ticket.component";

@Component({
  selector: 'app-tickets',
  standalone: true,
  imports: [NewTicketComponent, TicketComponent],
  templateUrl: './tickets.component.html',
  styleUrl: './tickets.component.css'
})
export class TicketsComponent {
  tickets: Ticket[] = [];  
  // tickets -> a variable that will hold an array of Ticket objects.
  // The type Ticket[] specifies that this variable is an array where each element must adhere to the structure defined by the Ticket interface.
  // Initially, this array is empty ([]), meaning there are no tickets at the moment.

  onAdd(ticketData: { title: string; text: string }) {
    const ticket: Ticket = {
      title: ticketData.title,
      request: ticketData.text,
      id: Math.random().toString(),
      status: 'open'
    }

    this.tickets.push(ticket);  // After the ticket object is created, it is added to the tickets array, which holds all the tickets. This array is then used to display the list of tickets in the parent component’s template.
  }
  // ticketData: an object that contains the title and text of the ticket. These values are passed from the child component (NewTicketComponent) when the form is submitted.
  // The ticketData is used to create a new Ticket object. The Ticket interface ensures that the created ticket has properties like title, request, id, and status.

  onCloseTicket(id: string) {
    this.tickets = this.tickets.map((ticket) => {
      if (ticket.id === id) {
        return  { ...ticket, status: 'closed' }
      }
      return ticket;
    });
  }
  // onCloseTicket accepts an argument id, which is a string representing the unique identifier of the ticket that needs to be closed.
  // this.tickets is an array of Ticket objects. The map() method is used to iterate over each ticket in the tickets array and create a new array with the modified tickets.
  // map() takes a function that is called for each element in the array (ticket in this case).
  // Inside the map() function, we check if the current ticket’s id matches the provided id.
  // We then create a new ticket object using the spread operator ({ ...ticket, status: 'closed' }). This copies all properties from the original ticket but overrides the status property and sets it to "closed".
  // This ensures that the ticket’s status is updated without modifying the original ticket object directly.
  // If the id does not match, the ticket remains unchanged, and we simply return the ticket as-is.
  // The result of map() is a new array where the ticket with the matching id has its status updated to "closed", and all other tickets remain the same.
  // The tickets property of the component is then updated with this new array.
  // { ...ticket, status: 'closed' }) creates a new object with the same properties as ticket, but with a modified status property.
}
