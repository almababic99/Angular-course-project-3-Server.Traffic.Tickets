import { Component } from '@angular/core';

@Component({
  selector: 'button[appButton]',
  standalone: true,
  imports: [],
  templateUrl: './button.component.html',
  styleUrl: './button.component.css'
})
export class ButtonComponent {
  
}

// selector: 'button[appButton]'
// In Angular, the selector defines how a component is associated with an HTML element in a template. 
// The button part indicates that the component is tied to <button> elements in the DOM. This means that Angular will apply this component to all button elements in the template that match the specified condition.
// The [appButton] part is an attribute selector. It targets any button element that has the attribute appButton present, regardless of its value. So, this component will only be applied to <button> elements that include the attribute appButton
// This means the ButtonComponent will only be associated with buttons that explicitly include the appButton attribute. It will not be applied to all button elements, just the ones that have this custom attribute.
// This is useful when you want to apply a component to specific HTML elements based on their attributes, rather than just applying it to all instances of that element type.