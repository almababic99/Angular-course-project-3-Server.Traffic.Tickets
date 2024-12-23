import { Component, ElementRef, HostBinding, HostListener, inject, input, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-control',
  standalone: true,
  imports: [],
  templateUrl: './control.component.html',
  styleUrl: './control.component.css',
  encapsulation: ViewEncapsulation.None,
  host: {
    class: 'control',
    '(click)': 'onClick()'   // adding event listener to host element
  }
  //  the host property adds the 'control' CSS class to the element that represents ControlComponent in the DOM
})
export class ControlComponent {
  // @HostBinding('class') className = 'control';  
  // HostBinding is a decorator that allows you to bind a property or attribute to the host element of a component.
  // Using HostBinding, you can dynamically set or change properties (like class, style, attr, etc.) on the host element from within the component class. 
  // This allows you to manipulate the host element's properties based on the component's state or logic.

  // @HostBinding('class'): This tells Angular that you want to bind the class attribute of the host element to the className property of the component.
  // className = 'control': This sets the className property to 'control'. As a result, the host element (which represents the ControlComponent) will have the control class applied.
  
  label = input.required<string>();

  private el = inject(ElementRef);

  onClick() {
    console.log('Clicked');
    console.log(this.el);
  }
}

// In Angular, the encapsulation property of a component controls how styles defined within that component are scoped or applied to the component's template. 
// This is important for avoiding style conflicts between components and ensuring that styles are applied in a predictable way.
// The encapsulation property has three possible values:
// ViewEncapsulation.Emulated -> Angular adds a unique attribute to each element in the component's template. It then scopes the styles in such a way that they only apply to elements inside the component, based on those unique attributes.
// ViewEncapsulation.None -> No unique attributes are added to the elements in the template. The styles are applied to the entire application, so if you define a style in your component's CSS, it will affect not just your component, but any other matching elements in the application.
// ViewEncapsulation.ShadowDom -> The component's template and styles are isolated within a "shadow root." Styles defined within the component are scoped strictly to the shadow DOM and will not affect the rest of the application.