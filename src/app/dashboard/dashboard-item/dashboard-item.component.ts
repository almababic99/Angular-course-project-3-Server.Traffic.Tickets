import { Component, input, Input } from '@angular/core';

@Component({
  selector: 'app-dashboard-item',
  standalone: true,
  imports: [],
  templateUrl: './dashboard-item.component.html',
  styleUrl: './dashboard-item.component.css'
})
export class DashboardItemComponent {
  // First way - decorators:
  // @Input(): a decorator in Angular that allows a parent component to pass data to a child component. It marks a property of the child component as being an input property.

  // { required: true }: an option passed to the @Input() decorator. It indicates that this input property is required for the child component. 
  //  If the parent does not provide a value for this input property, Angular will raise an error. This makes the input property mandatory in the component.

  // image!: The exclamation mark (!) is a non-null assertion operator in TypeScript. It tells TypeScript that you are sure this property will not be null or undefined at runtime.  

  // { src: string; alt: string }: This defines the type of the image property. The property image is an object with two properties: src: string and alt: string
  
  // @Input({ required: true }) image!: { src: string; alt: string };
  // @Input({ required: true }) title!: string;


  // Second way - signals:
  // The .required method is being called on input. The angle brackets <...> indicate that required is a generic function and expects a type to be specified.
  // The type { src: string; alt: string } specifies that the required method expects an object with two properties: src: string and alt: string
  image = input.required<{ src: string; alt: string }>();
  title = input.required<string>();

}
