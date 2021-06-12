import { Component } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
class T{
  name?:String;
  setname(name:String)
  {
this.name = name
  }
  getname()
  {
    return this.name;
  }


}
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent {

constructor(private fb: FormBuilder)
{

}


  profileForm = new FormGroup({
    firstName: new FormControl(''),
    lastName: new FormControl(''),
    address: new FormGroup({
      street: new FormControl()
    })
  });




  identityRevealedValidator (control: AbstractControl): string | null  {
    const name = control.get('firstName')?.value;
    const lastName = control.get('lastName')?.value;
    console.log(name)
    console.log(lastName)
  if(name)
  {
    return 'yes';
  }
  return null;
  };
// //////////////////////////////////////////////////////////////////////////////

 profileForm2 = this.fb.group({
    firstName: ['', [Validators.required,this.firstNameValidator]
  ],
    lastName: ['',[Validators.required]],
    address: this.fb.group({
      street: ['',[Validators.required]],
    
    }),
    aliases: this.fb.array([
      this.fb.control('',[Validators.required])
    ])
  }, { validators: this.identityRevealedValidator });
  get aliases() {
    let t = this.profileForm2.get('aliases') as FormArray;
    // console.log(t)
    return t;
  }

  addAlias() {
    this.aliases.push(this.fb.control('',[Validators.required]));
  }

  onSubmit() {
    let fv = this.profileForm.value;
    let fn = fv.firstName;
    console.warn(fv);
  }


  onSubmit2() {
    let fv = this.profileForm2.value;
    let fn = fv.firstName;
    console.warn(fv.aliases);
  }




  updateProfile() {
    this.profileForm.patchValue({
      firstName: 'Nancy',
      lastName:'sureName',
      address: {
        street: '123 Drew Street'
      }
    });
  }


  firstNameValidator (control: AbstractControl):string | null {
console.log(control.get('firstName'))
console.log(control.get('lastName'))
    if( control.value ==='ahmed'){
      return 'true';
    }
    return null; // if name is not ahmed accept it .
  };

 

}
