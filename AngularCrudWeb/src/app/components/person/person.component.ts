import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { PersonService } from 'src/app/services/person.service';
import { Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-person',
  templateUrl: './person.component.html',
  styleUrls: ['./person.component.css'],
})
export class PersonComponent {
  showForm = false;
  updateButton = false;
  isPrevented = false;
  personId = 0;
 

  personList: any;
  person: any;
  updatedPerson: any;
  updatedPersonId: any;
  idForDelete: any

  constructor(
    private personService: PersonService,
    private toastrService: ToastrService
  ) {}

  personForm = new FormGroup({
    first_name: new FormControl('', Validators.required),
    last_name: new FormControl('', Validators.required),
    address: new FormControl('', Validators.required),
    city: new FormControl('', Validators.required),
  });

  displayForm() {
    this.showForm = true;
    this.personList = false;
    this.person = false;
    this.updateButton = false;
    this.personForm.reset();
    this.personId = 0;
  }

  displayPersonList() {

    this.showForm = false;
    this.person = false;
    this.personId = 0;
    this.personService.getAllPersons().subscribe((response) => {
      this.personList = response;
      console.log('Inside subscriber');
      console.log(this.personList);
    });

    console.log('Outside subscriber');
  }

  getPersonById() {

    this.personList = false;
    this.showForm = false;

    console.log('Person id: ' + this.personId);

    this.personService.getPersonById(this.personId).subscribe((response) => {
      this.person = response;

      console.log(this.person);
      console.log('Person id:' + this.personId);
    });
  }

  submitForm() {
    
    console.log('I am submiting form');
    console.log(this.personForm.value);

    if (this.updatedPersonId) {
      this.updatedPerson = this.personForm.value;
      this.updatedPerson.person_id = this.updatedPersonId;

      this.personService.updatePerson(this.updatedPerson).subscribe((response) => {
          this.person = response;

          this.person = false;
          this.personList = false;
          this.showForm = false;
          this.updateButton = false;
          this.personForm.reset();
          this.updatedPersonId = null;

          this.toastrService.success('Person updated Successfuly!');
        });
    } else {
      this.personService.savePerson(this.personForm.value).subscribe(
        (response) => {
          this.person = response;

          console.log('Saved person: ' + JSON.stringify(this.person));
          this.person = false;
          this.personList = false;
          this.showForm = false;
          this.personForm.reset();
          this.updatedPersonId = null;
          this.toastrService.success('Person created Successfuly!');
        },
        (err) => {
          this.toastrService.error("OOOPS I can't create person");
        }
      );
    }
  }

  editForm(personId: number) {
    let currentPerson = this.personList.find((pers: any) => {
      return pers.person_id === personId;
    });
    this.personForm.controls['first_name'].setValue(currentPerson.first_name);
    this.personForm.controls['last_name'].setValue(currentPerson.last_name);
    this.personForm.controls['address'].setValue(currentPerson.address);
    this.personForm.controls['city'].setValue(currentPerson.city);

    this.updatedPersonId = personId;

    this.updateButton = true;
    this.showForm = true;
    this.personList = false;
    this.person = false;
    
  }

  deletePerson(idForDelete: number) {

     if(confirm('Are you sure to delete this Person?'))
     
    this.personService.deletePerson(idForDelete).subscribe((response) => {
       
      this.personList = false;
      this.showForm = false;
      this.toastrService.success('Person deleted Successfully!');
    
     },

    (error) => {
      console.log(error)
    }
    );
   }
}