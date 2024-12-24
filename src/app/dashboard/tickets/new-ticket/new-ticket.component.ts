import { AfterViewInit, Component, ElementRef, EventEmitter, OnInit, output, Output, viewChild, ViewChild } from '@angular/core';
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
export class NewTicketComponent implements OnInit, AfterViewInit {
  // first way of using ViewChild:
  @ViewChild('form') private form?: ElementRef<HTMLFormElement>;

  // second way of using viewChild - signal function:
  // private form = viewChild.required<ElementRef<HTMLFormElement>>('form');

  // @Output() add = new EventEmitter<{title: string; text: string}>();
  add = output<{title: string; text: string}>();  // creates an event emitter that emits an object with two properties: title (a string) and text (a string), which represent the title and description of the ticket being submitted.

  ngOnInit() {  // Lifecycle hook ngOnInit -> A callback method that is invoked immediately after the default change detector has checked the directive's data-bound properties for the first time, and before any of the view or content children have been checked. It is invoked only once when the directive is instantiated.
    console.log('ON INIT');
    console.log(this.form?.nativeElement);
  }
  // If you try to access this.form?.nativeElement inside ngOnInit, it may not work as expected because, at this stage, the view (and elements like the form) is not fully initialized yet. 
  // You will see undefined in the console if form is not yet available.

  ngAfterViewInit() {   // Lifecycle hook ngAfterViewInit -> A callback method that is invoked immediately after Angular has completed initialization of a component's view. It is invoked only once when the view is instantiated.
    console.log('AFTER VIEW INIT');
    console.log(this.form?.nativeElement);
  }
  // When ngAfterViewInit is called, the form element (this.form?.nativeElement) will be fully initialized, and you will have access to its properties, such as resetting the form, focusing an input field, or reading its value.

  onSubmit(title: string, ticketText: string) {
    this.add.emit({title: title, text: ticketText}); 
    // emit() is the method used to trigger the event and send the data (title and ticketText) to the parent component.
    // The parent listens for the add event and reacts accordingly, often by performing some action with the data, like adding it to a list or displaying it in the UI in tickets.component.html


    console.log(title);
    console.log(ticketText);

    this.form?.nativeElement.reset();  // reset() clears all the input elements that are inside of the form if the form is not undefinded (form?) -> for @ViewChild('form') private form?: ElementRef<HTMLFormElement>;
    // this.form().nativeElement.reset();   // reset() clears all the input elements that are inside of the form. we need form() because we are using signals -> for private form = viewChild.required<ElementRef<HTMLFormElement>>('form');
  }
}

// By using @ViewChild('form'), you can access the form's native DOM element and call methods like reset() to clear its contents programmatically.
// The onSubmit() method logs the values of the title and request (from the input fields).
// After the values are logged, the form is reset using this.form?.nativeElement.reset(). This clears the fields inside the form.
// When you use @ViewChild, Angular creates a reference to the DOM element wrapped inside an ElementRef object. 
// The ElementRef gives you a way to interact with the DOM element, but the ElementRef itself does not expose all the properties and methods that a native DOM element would have. 
// To access these properties or call native methods, you need to use nativeElement.