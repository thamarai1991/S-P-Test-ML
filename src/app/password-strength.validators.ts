import { AbstractControl, ValidationErrors } from "@angular/forms"

export const PasswordStrengthValidator = function (control: AbstractControl): ValidationErrors | null {

  let value: string = control.value || '';

  let upperCaseCharacters = /[A-Z]+/g;

  let lowerCaseCharacters = /[a-z]+/g;

  let numberCharacters = /[0-9]+/g;

  let specialCharacters = /[@$&_-]+/; // for special symbols @_-$&

  if (!value) {
    return null
  }

  //count should increase by +20

  let arrc = [/[A-Z]+/g, /[a-z]+/g, /[0-9]+/g, /[@$&_-]+/];

  let counter = 0

  arrc.forEach(element => {
    if (element.test(value) === true) {
      counter = counter + 20
    }
  })

  // min. 8 characters length the count should increase by +20
  if (value.length >= 8) {
    counter = counter + 20;
  }

  if(value.length > 16){
    return { passwordStrength: '*maximum 16 length', count: counter};
  }
  
  if (upperCaseCharacters.test(value) === false) {
    return { passwordStrength: '*password contains at least one upper case letter', count: counter };
  }

  if (lowerCaseCharacters.test(value) === false) {
    return { passwordStrength: '*password contains at least one lower case letter', count: counter };
  }

  if (numberCharacters.test(value) === false) {
    return { passwordStrength: '*password contains at least one numeric letter',count: counter };
  }

  if (specialCharacters.test(value) === false) {
    return { passwordStrength: '*password contains at least one special symbol @_-$&', count: counter };
  }

  if(value.length < 8){
    return { passwordStrength: '*minimum 8 length', count: counter };
  }

  return { passwordStrength: "", count: counter };

}