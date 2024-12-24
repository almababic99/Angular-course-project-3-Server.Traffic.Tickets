import { AfterContentInit, afterNextRender, afterRender, Component, contentChild, ContentChild, ElementRef, HostBinding, HostListener, inject, input, ViewEncapsulation } from '@angular/core';

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
export class ControlComponent implements AfterContentInit {
  // @HostBinding('class') className = 'control';  
  // HostBinding is a decorator that allows you to bind a property or attribute to the host element of a component.
  // Using HostBinding, you can dynamically set or change properties (like class, style, attr, etc.) on the host element from within the component class. 
  // This allows you to manipulate the host element's properties based on the component's state or logic.

  // @HostBinding('class'): This tells Angular that you want to bind the class attribute of the host element to the className property of the component.
  // className = 'control': This sets the className property to 'control'. As a result, the host element (which represents the ControlComponent) will have the control class applied.
  
  label = input.required<string>();

  private el = inject(ElementRef);

  // First way of ContentChild:
  // @ContentChild('input') private control?: ElementRef<HTMLInputElement | HTMLTextAreaElement>;  
  // ContentChild allows a parent component to insert content into the child component’s template.
  // The 'input' inside the @ContentChild decorator refers to a template reference variable used in the parent component. 
  // In this case, 'input' should be the name of the template reference variable assigned to an <input> or <textarea> element in the parent component’s template.
  // private control? defines a class property named control, which will hold a reference to the projected content element. The ? makes the property optional, meaning control could be undefined
  // ElementRef<HTMLInputElement | HTMLTextAreaElement> -> control variable can reference either an HTMLInputElement (for <input> elements) or an HTMLTextAreaElement (for <textarea> elements)
  // In Angular, the parent component can pass content to the child component using content projection (with <ng-content></ng-content>). The parent places HTML elements like <input> or <textarea> inside the child component.
  // @ContentChild allows the child component to query for these projected elements. In this case, the child component is looking for an element that has the #input reference variable, which will be a reference to either an <input> or a <textarea>.
  // input is in new-ticket.component.html

  // Second way od contentChild as a function:
  private control = contentChild<ElementRef<HTMLInputElement | HTMLTextAreaElement>>('input');

  constructor() {
    afterRender(() => {
      console.log('afterRender');
    });
    // afterRender is a method you can use to register a callback function that will be called after the Angular component and its child components have been rendered into the DOM. 
    // It's useful when you want to trigger some logic or perform an operation after the initial rendering is complete.
    // It is triggered after Angular has completed rendering the view for the component, including its child components and templates.

    afterNextRender(() => {
      console.log('afterNextRender');
    });
    // afterNextRender is executed after the next rendering cycle is completed. This can be useful when you want to delay the execution of your logic until after Angular has had a chance to update the DOM one more time.
    // It is triggered after the next rendering cycle of the application. This means that it waits for Angular to update the view again, ensuring that any DOM-related actions that may depend on subsequent view updates are 
    // executed after Angular finishes processing.
    // afterNextRender ensures the callback is run after Angular has processed the current changes and after the next view update. This can be helpful when there are multiple DOM changes and you want to execute some logic 
    // after all those changes are finalized.

    // The first callback inside afterRender will execute immediately after the component’s view is rendered and all bindings are resolved.
    // The second callback inside afterNextRender will execute after the next rendering cycle, which may include any DOM changes triggered by the first render or other components.
  }
  // The afterRender and afterNextRender functions let you register a render callback to be invoked after Angular has finished rendering all components on the page into the DOM.
  // afterRender and afterNextRender must be called in an injection context, typically a component's constructor.

  ngAfterContentInit() {  // Lifecycle hook ngAfterContnetInit -> A callback method that is invoked immediately after Angular has completed initialization of all of the directive's content. It is invoked only once when the directive is instantiated.
    console.log('Content initialized');
    console.log(this.control); 
  }

  // ngAfterContentInit: Focuses on content that is projected into the component (i.e., passed in through ng-content or captured using @ContentChild).
  // ngAfterViewInit: Focuses on the component’s own view, meaning it is called after Angular has initialized the view and the DOM elements that belong to the component itself (like elements defined within the component’s own template).

  onClick() {
    console.log('Clicked');
    console.log(this.el);

    // console.log(this.control);  // for @ContentChild('input') private control?: ElementRef<HTMLInputElement | HTMLTextAreaElement>;  
    console.log(this.control());   // for private control = contentChild<ElementRef<HTMLInputElement | HTMLTextAreaElement>>('input');
  }
}

// In Angular, the encapsulation property of a component controls how styles defined within that component are scoped or applied to the component's template. 
// This is important for avoiding style conflicts between components and ensuring that styles are applied in a predictable way.
// The encapsulation property has three possible values:
// ViewEncapsulation.Emulated -> Angular adds a unique attribute to each element in the component's template. It then scopes the styles in such a way that they only apply to elements inside the component, based on those unique attributes.
// ViewEncapsulation.None -> No unique attributes are added to the elements in the template. The styles are applied to the entire application, so if you define a style in your component's CSS, it will affect not just your component, but any other matching elements in the application.
// ViewEncapsulation.ShadowDom -> The component's template and styles are isolated within a "shadow root." Styles defined within the component are scoped strictly to the shadow DOM and will not affect the rest of the application.