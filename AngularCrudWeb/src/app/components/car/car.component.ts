import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CarService } from 'src/app/services/car.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-car',
  templateUrl: './car.component.html',
  styleUrls: ['./car.component.css']
})
export class CarComponent {

  showForm = false;
  showCarByPlateNumber = false;
  updateButton = false;
  plateNumber = 0;

  carList: any;
  car: any;
  updatedCar: any;
  updatedPlateNumber: any;


  constructor(private carService: CarService, private toastrService: ToastrService){}

  carForm = new FormGroup({
    car_name: new FormControl('', Validators.required),
    f_year: new FormControl('', Validators.required),
    country: new FormControl('', Validators.required),
    model: new FormControl('', Validators.required),
    price: new FormControl('', Validators.required),
  });
  
  displayForm() {
  this.showForm = true;
  this.carList = false;
  this.car = false;
  this.updateButton = false;
  this.showCarByPlateNumber = false;
  this.carForm.reset();
  this.plateNumber = 0;
 }

  displayCarList() {
   
    this.showForm = false;
    this.car = false;
    this.updateButton = false;
    this.showCarByPlateNumber = false;
    this.plateNumber = 0;


    this.carService.getAllCars().subscribe((response) => {
     this.carList = response;
      console.log("List of cars: " + JSON.stringify(this.carList));
    })

  }

  getCarByPlateNumber() {
    this.showCarByPlateNumber = true;
    this.carList = false;
    this.showForm = false;

    this.carService.getCarByPlateNumber(this.plateNumber).subscribe((response) => {
      this.car = response;

      console.log(this.car);
      console.log("Plate number" + this.plateNumber);
    })

  }


  submitForm(){
    
    console.log(this.carForm.value);
   
    if(this.updatedPlateNumber){
        this.updatedCar = this.carForm.value;
        this.updatedCar.plate_number = this.updatedPlateNumber;

       this.carService.updateCar(this.updatedCar).subscribe((response) => {
      this.car = response;

          this.car = false;
          this.carList = false;
          this.showForm = false;
          this.updateButton = false;
          this.carForm.reset();
          this.updatedPlateNumber = null;

          this.toastrService.success('Car updated Successfuly!')
  });
  } else {

    this.carService.saveCar(this.carForm.value).subscribe(
      (response) => {
        this.car = response;

        console.log('Saved car: ' + JSON.stringify(this.car));

          this.car = false;
          this.carList = false;
          this.showForm = false;
          this.carForm.reset();
          this.updatedPlateNumber = null;  
          
          this.toastrService.success('Car created Successfuly!');
  },
  (err) => {
    this.toastrService.error("OOOPS I can't create car");
  }
);
}
}

editForm(plateNumber: number) {
  let currentCar = this.carList.find((c: any) => {
    return c.plate_number === plateNumber;
  });
  this.carForm.controls['car_name'].setValue(currentCar.car_name);
  this.carForm.controls['f_year'].setValue(currentCar.f_year);
  this.carForm.controls['country'].setValue(currentCar.country);
  this.carForm.controls['model'].setValue(currentCar.model);
  this.carForm.controls['price'].setValue(currentCar.price);

  this.updatedPlateNumber = plateNumber;

  this.updateButton = true;
  this.showForm = true;
  this.carList = false;
  this.car = false;
}

deleteCar(plateNumber: number) {

  if(confirm('Are you sure to delete this Car?')) 

    this.carService.deleteCar(plateNumber).subscribe((response) => {

      this.showForm = false;
      this.carList = false;
      this.toastrService.success('Car deleted Successfuly!');


    } )
}

}
