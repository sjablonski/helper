import PropTypes from 'prop-types';
import * as Yup from 'yup';

const requiredMesssage = 'jest polem wymaganym';

const schema = {
  email: Yup.string()
    .label('E-mail')
    .email('Niepoprawny format adresu email')
    .required(obj => `${obj.label} ${requiredMesssage}`),
  password: Yup.string()
    .label('Hasło')
    .min(2, 'Za mało znaków')
    .required(obj => `${obj.label} ${requiredMesssage}`),
  newPassword: Yup.string()
    .label('Hasło')
    .min(2, 'Za mało znaków'),
  confirmPassword: Yup.string()
    .label('Potwierdź hasło')
    .required(obj => `${obj.label} ${requiredMesssage}`)
    .test('passwords-match', 'Podane hasła nie są identyczne', function test(value) {
      return this.parent.password === value;
    }),
  newConfirmPassword: Yup.string()
    .label('Potwierdź hasło')
    .test('passwords-match', 'Podane hasła nie są identyczne', function test(value) {
      return this.parent.newPassword === value;
    }),
  agreeToTerms: Yup.boolean()
    .label('Terms')
    .test('is-true', 'Aby kontynuować, musisz zaakceptować warunki', value => value === true),
  reportType: Yup.string()
    .label('Rodzaj zgłoszenia')
    .required(obj => `${obj.label} ${requiredMesssage}`),
  phoneNumber: Yup.string()
    .label('Numer telefonu')
    .matches(/(^\+[0-9]{2}|^\+[0-9]{2}\(0\)|^\(\+[0-9]{2}\)\(0\)|^00[0-9]{2}|^0)([0-9]{9}$|[0-9\-\s]{10}$)/, {
      message: 'Błędny format numeru telefonu. Wzór: +48500000000',
    })
    .required(),
  location: Yup.string()
    .label('Lokalizacja')
    .typeError('Niepoprawny format')
    .required(obj => `${obj.label} ${requiredMesssage}`),
  description: Yup.string()
    .label('Opis')
    .min(1, 'za mało znaków'),
};

const validationSchema = schemaNames => {
  const obj = {};
  schemaNames.forEach(index => {
    obj[index] = schema[index];
  });

  return Yup.object().shape(obj);
};

validationSchema.propsTypes = {
  schemaNames: PropTypes.array,
};

export default validationSchema;
