import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CarService {

  url = "http://localhost:8080/"

  constructor(private http: HttpClient) { }

  getAllCars() {
    return this.http.get(this.url + "allCar") 
  }

  getCarByPlateNumber(plate_number: number) {
return this.http.get(this.url + "car/" + plate_number)
  }

  saveCar(carForm: any) {

    return this.http.post(this.url + "saveCar", carForm)

  }

  updateCar(updatedCar: any) {
    console.log("In service class updated car: " + JSON.stringify(updatedCar))
    return this.http.put(this.url + "updateCar", updatedCar)
 
}

deleteCar(plateNumber: any) {

  let headers = new HttpHeaders();
  headers.append('Content-Type', 'text/plain'),
  headers.append('Accept', 'text/plain')

console.log(JSON.stringify(plateNumber));

return this.http.delete(this.url + "car/delete/" + plateNumber, { observe: 'response', responseType: 'text' });

}


}
