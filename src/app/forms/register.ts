import { FormControl, ValidatorFn, Validators } from '@angular/forms';

const passwordRegex: RegExp = /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,25}$/;
const PASSWORD_REGEX: ValidatorFn = Validators.pattern(passwordRegex);
const usernameRegex: RegExp = /^[a-zA-Z0-9_]*$/;
const USERNAME_REGEX: ValidatorFn = Validators.pattern(usernameRegex);

export const RegisterForm = {
  username: new FormControl('', [
    Validators.maxLength(30),
    Validators.minLength(4),
    Validators.required,
    USERNAME_REGEX,
  ]),
  email: new FormControl('', [Validators.email, Validators.required]),
  password: new FormControl('', [
    Validators.minLength(8),
    Validators.maxLength(25),
    Validators.required,
    PASSWORD_REGEX,
  ]),
  confirmPassword: new FormControl(''),
};
