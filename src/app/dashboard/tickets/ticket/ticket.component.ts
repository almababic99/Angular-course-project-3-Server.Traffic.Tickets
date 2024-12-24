import { Component, input, output, signal } from '@angular/core';
import { Ticket } from './ticket.model';

@Component({
  selector: 'app-ticket',
  standalone: true,
  imports: [],
  templateUrl: './ticket.component.html',
  styleUrl: './ticket.component.css'
})
export class TicketComponent {
  data = input.required<Ticket>();

  close = output();

  detailsVisible = signal(false);   // detailsVisible is a reactive signal, initialized with false. This means that initially, the details are not visible.
  onToggleDetails() {   // In the onToggleDetails method, you're toggling the value of detailsVisible
    // First way - using set:
    // this.detailsVisible.set(!this.detailsVisible());

    // Second way - using update:
    this.detailsVisible.update((wasVisible) => !wasVisible);
  }

  onMarkAsCompleted() {   // mark a ticket as completed (or closed)
    this.close.emit();   // notify the parent component (or another component) that the ticket should be marked as completed, and some action might follow, such as updating the status of the ticket to "closed" in the parent component
  }
}
