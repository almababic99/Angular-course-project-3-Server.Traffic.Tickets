import { Component, DestroyRef, inject, OnDestroy, OnInit } from '@angular/core';

@Component({
  selector: 'app-server-status',
  standalone: true,
  imports: [],
  templateUrl: './server-status.component.html',
  styleUrl: './server-status.component.css'
})
export class ServerStatusComponent implements OnInit {
  currentStatus: 'online' | 'offline' | 'unknown' = 'offline';
  // private interval?: ReturnType<typeof setInterval>; // A private property that stores the return value of the setInterval function. 

  private destroyRef = inject(DestroyRef);  // uses Angular's inject() function to inject a DestroyRef instance into the component.

  constructor() {}

  ngOnInit() {   // Runs once after Angular has initialized all the component's inputs.
    console.log('ON INIT');

      // using interval:
    // this.interval = setInterval(() => {
    //   const rnd = Math.random(); 
    //   if (rnd < 0.5) {
    //     this.currentStatus = 'online';
    //   } else if (rnd < 0.9) {
    //     this.currentStatus = 'offline';
    //   } else {
    //     this.currentStatus = 'unknown';
    //   }
    // }, 5000);

      // using destroyRef:
    const interval = setInterval(() => {
      const rnd = Math.random(); 
      if (rnd < 0.5) {
        this.currentStatus = 'online';
      } else if (rnd < 0.9) {
        this.currentStatus = 'offline';
      } else {
        this.currentStatus = 'unknown';
      }
    }, 5000);

    this.destroyRef.onDestroy(() => {   // destroyRef.onDestroy() registers a callback to be executed when the component is destroyed.
      clearInterval(interval);   // clearInterval(interval); is called inside onDestroy() to stop the interval when the component is destroyed, preventing any potential memory leaks.
    });  // Instead of relying on ngOnDestroy() to clean up resources, you can directly use destroyRef.onDestroy() for this purpose.

    // As an alternative to the ngOnDestroy method, you can inject an instance of DestroyRef. You can register a callback to be invoked upon the component's destruction by calling the onDestroy method of DestroyRef.
    // You can pass the DestroyRef instance to functions or classes outside your component. Use this pattern if you have other code that should run some cleanup behavior when the component is destroyed.
    // You can also use DestroyRef to keep setup code close to cleanup code, rather than putting all cleanup code in the ngOnDestroy method.
    // With destroyRef, you can trigger cleanup tasks using the onDestroy() method directly.
  }

  ngAfterViewInit() {  // Runs once after the component's view has been initialized.
    console.log('AFTER VIEW INIT');
  }

  // ngOnDestroy() {   // Runs once before the component is destroyed.
  //   // because of memory leak we need to clean up the interval that keeps on going behind the scenes whenever the component is removed
  //   clearTimeout(this.interval);
  // }

  

}

// When you use implements in a class, you're telling TypeScript that your class will follow the structure defined by the interface. This means that the class must have all the properties and methods declared in the interface, with matching types.
// TypeScript will check the class to ensure that it correctly implements the methods and properties defined by the interface. If the class doesn't match the interface, TypeScript will give an error.
// For example if you write ngonInit instead of ngOnInit

// ngOnInit() is an Angular lifecycle hook - Runs once after Angular has initialized all the component's inputs.
// it is better to use ngOnInit in this case instead of constructor because in the constructor setInterval starts immediately when the component is created, regardless of whether Angular has finished initializing the component or not.
// and in ngOnInit the interval will start only after Angular has finished setting up the component
// setInterval: Every 5 seconds, the callback function inside the setInterval will execute.
// Math.random() function generates a random floating-point number between 0 (inclusive) and 1 (exclusive), i.e., a value in the range [0, 1).
// The random number rnd is used to decide the value of currentStatus
// If rnd < 0.5 (i.e., the random number is between 0 and 0.499999...), currentStatus is set to 'online'.
// If rnd is between 0.5 and 0.899999... (i.e., between 0.5 and 0.899999...), currentStatus is set to 'offline'.
// If rnd is between 0.9 and 1 (i.e., between 0.9 and 0.999999...), currentStatus is set to 'unknown'.
// Every 5 seconds, the currentStatus will be randomly updated to one of the following values: 'online', 'offline', or 'unknown', based on the random number generated.
