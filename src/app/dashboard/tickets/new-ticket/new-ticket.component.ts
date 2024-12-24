import { Component, ElementRef, ViewChild } from '@angular/core';
import { ControlComponent } from "../../../shared/control/control.component";
import { ButtonComponent } from '../../../shared/button/button.component';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-new-ticket',
  standalone: true,
  imports: [ControlComponent, ButtonComponent, FormsModule],   // FormsModule is for ngSubmit in new-ticket.component.html
  templateUrl: './new-ticket.component.html',
  styleUrl: './new-ticket.component.css'
})
export class NewTicketComponent {
  @ViewChild('form') form?: ElementRef<HTMLFormElement>;

  onSubmit(title: string, ticketText: String) {
    console.log(title);
    console.log(ticketText);

    this.form?.nativeElement.reset();  // reset() clears all the input elements that are inside of the form if the form is not undefinded (form?)
  }
}

// By using @ViewChild('form'), you can access the form's native DOM element and call methods like reset() to clear its contents programmatically.
// The onSubmit() method logs the values of the title and request (from the input fields).
// After the values are logged, the form is reset using this.form?.nativeElement.reset(). This clears the fields inside the form.
// When you use @ViewChild, Angular creates a reference to the DOM element wrapped inside an ElementRef object. 
// The ElementRef gives you a way to interact with the DOM element, but the ElementRef itself does not expose all the properties and methods that a native DOM element would have. 
// To access these properties or call native methods, you need to use nativeElement.