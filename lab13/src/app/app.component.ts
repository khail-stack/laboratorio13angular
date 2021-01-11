import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  private pattern = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/

  angForm: FormGroup;
  constructor(private fb: FormBuilder) {
    this.createForm();
  }
  
  createForm() {
    this.angForm = this.fb.group({
      name: ['', [Validators.required]],
      firstlastname: ['', [Validators.required]],
      secondlastname: ['', [Validators.required]],
      birthdaydate: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.pattern(this.pattern)] ],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmpassword: ['',[ Validators.required, Validators.minLength(6)]],
    });
  }
  onClickSubmit(name, firstlastname, secondlastname, birthdaydate, email, password ) {

    if (this.angForm.valid) {
      alert('El nombre es : ' + name +  'El primer apellido es: ' + firstlastname + 'El segundo apellido es: ' + secondlastname + 'La fecha de cumpleaños es: ' + birthdaydate + 'El correo es: ' + email + 'La contraseña es: ' + password );
    } else {
      console.log('Invalid')
    }
  }
  

  ngOnInit() {
    
  }

  getErrorMessage(field: string) {
  
    let message;
    if (this.angForm.get(field).errors.required) {
      message = `El campo ${field} es obligatorio`
    } else if (this.angForm.get(field).hasError('minlength')) {
      message =  `El campo ${field} tiene que ser mayor a 6 caracteres`
    } else if (this.angForm.get(field).hasError('pattern')) {
      message =  `El campo ${field} tiene que ser un email valido`
    }
    return message;
  
  }
  isValidField(field: string) {
    return ((this.angForm.get(field).touched || this.angForm.get(field).dirty) && !this.angForm.get(field).valid)
  }
  
}
