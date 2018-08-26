let store = { drivers: [], passengers: [], trips: [] };
// store is a JS object that stores and represents all initialized driver, passenger and trip objects
// store object has 3 keys: drivers, passengers and trips
// and each key will point to an array of driver/passenger/trip objects, respectively
let driverId = 0;
// declare driverId variable set = 0 once, OUTSIDE of the Driver class
// this value will be incremented first and THEN set = to the driver's id each time a driver object is initialized (see below)
class Driver {
  constructor(name) {
    this.id = ++driverId;
    this.name = name;
    store.drivers.push(this); // store.drivers is an array of driver objects, into which we push the newly created driver object (this)
  }
  // A driver has many trips. Method .trips() called on driver object returns array of all trip objects belonging to driver object
  trips() {
    return store.trips.filter(trip => {
      return trip.driverId === this.id;
    });
  }
  // A driver has many passengers through trips. Method .passengers() called on driver object returns array of all passenger objects that a driver has taken on a trip
  passengers() {
    return this.trips().map(trip => {
      return trip.passenger();
    });
  }
}

let passengerId = 0;

class Passenger {
  constructor(name) {
    this.id = ++passengerId;
    this.name = name;
    store.passengers.push(this);
  }
  // A passenger has many trips. Method .trips() called on passenger object returns array of all trip objects that a passenger has taken (i.e. that 'belong to' the passenger)
  trips() {
    return store.trips.filter(trip => {
      return trip.passengerId === this.id;
    });
  }
  // A passenger has many drivers through trips. Method .drivers() called on passenger object returns array of all driver objects that have taken a passenger on a trip
  drivers() {
    return this.trips().map(trip => {
      return trip.driver();
    });
  }
}

let tripId = 0;

class Trip {
  constructor(driver, passenger) {
    this.id = ++tripId;
    this.driverId = driver.id;
    this.passengerId = passenger.id;
    store.trips.push(this);
  } //new Trip() - initialized with an instance of driver and an instance of passenger; returns a JS object that has attributes id, driverId, and passengerId
  // A trip belongs to a driver and belongs to a passenger.
  driver() {
    return store.drivers.find(driver => {
      return driver.id === this.driverId;
    });
  }
  // method .driver() called on trip object returns the driver object that the trip object belongs to
  passenger() {
    return store.passengers.find(passenger => {
      return passenger.id === this.passengerId;
    });
  }
}
// method .passenger() called on trip object returns the passenger object that the trip object belongs to
