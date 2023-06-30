import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root'
})
export class PersonService {
  
  url = "http://localhost:8080/"

  constructor(private http: HttpClient) { }

    getAllPersons() {
      return this.http.get(this.url + "allPerson")
    }

    getPersonById(personId: number) {
      return this.http.get(this.url + "person/" + personId)
    }

    savePerson(personForm: any) {
      return this.http.post(this.url + "savePerson", personForm)
    }

    updatePerson(updatedPerson: any) {
      console.log("In service class updated person: " + JSON.stringify(updatedPerson))
      return this.http.put(this.url + "updatePerson", updatedPerson)
    }

  deletePerson(personId: number) {

    let headers = new HttpHeaders();
    headers.append('Content-Type', 'text/plain'),
    headers.append('Accept', 'text/plain')
   

    return this.http.delete(this.url + "person/delete/" + personId, 
    { observe: 'response', responseType: 'text' })
  }

}
