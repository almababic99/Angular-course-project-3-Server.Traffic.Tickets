import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-server-status',
  standalone: true,
  imports: [],
  templateUrl: './server-status.component.html',
  styleUrl: './server-status.component.css'
})
export class ServerStatusComponent implements OnInit {
  currentStatus: 'online' | 'offline' | 'unknown' = 'offline';

  constructor() {}

  ngOnInit() {
    setInterval(() => {
      const rnd = Math.random(); 
      if (rnd < 0.5) {
        this.currentStatus = 'online';
      } else if (rnd < 0.9) {
        this.currentStatus = 'offline';
      } else {
        this.currentStatus = 'unknown';
      }
    }, 5000);
  }
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
