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
}
