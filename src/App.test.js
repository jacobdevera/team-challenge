import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { shallow, mount } from 'enzyme';
import SignUpForm, { EmailInput, PasswordConfirmationInput } from './TeamSignUp';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<App />, div);
});

describe('<SignUpForm />', () => {
   const wrapper = mount(<SignUpForm />);

   describe('<EmailInput />', () => {
      const email = wrapper.find('#email');

      it('should show an error message specific to leaving the field blank', () => {
         email.simulate('change', {target:{value:''}});
         expect(wrapper.contains(<p className="help-block error-missing">we need to know your email address</p>)).toEqual(true);
      });


      it('should show an error message specific to entering an invalid value', () => {
         email.simulate('change', {target:{value:'invalid'}});
         expect(wrapper.contains(<p className="help-block error-invalid">this is not a valid email address</p>)).toEqual(true);
      });

      it('should not show an error message if a valid value is entered', () => {
         email.simulate('change', {target:{value:'email@domain.com'}});
         expect(wrapper.contains(<p className="help-block error-invalid">this is not a valid email address</p>)).toEqual(false);
         expect(wrapper.contains(<p className="help-block error-missing">we need to know your email address</p>)).toEqual(false);
      });

      it('should update the parent state when changed', () => {
         email.simulate('change', {target:{value:'change'}});
         expect(wrapper.state('email')).toEqual({ valid: false, value: 'change'});
      });

   });

   describe('<RequiredInput />', () => {
      const name = wrapper.find('#name');
      const pass = wrapper.find('#password');

      it('should show an error message if field is left blank', () => {
        name.simulate('change', {target:{value:''}});
        expect(wrapper.contains(<p className="help-block error-missing">we need to know your name</p>)).toEqual(true);
        pass.simulate('change', {target:{value:''}});
        expect(wrapper.contains(<p className="help-block error-missing">your password can't be blank</p>)).toEqual(true);
      });
      
      it('should not show an error message if field is not blank', () => {
        name.simulate('change', {target:{value:'Joel'}});
        expect(wrapper.contains(<p className="help-block error-missing">we need to know your name</p>)).toEqual(false);
        pass.simulate('change', {target:{value:'Ross'}});
        expect(wrapper.contains(<p className="help-block error-missing">your password can't be blank</p>)).toEqual(false);
      });

    
   });

    describe('<BirthdayInput />', () => {
        const dob = wrapper.find('#dob');

        it('should show an error message specific to leaving the field blank', () => {
          dob.simulate('change', {target:{value:''}});
          expect(wrapper.contains(<p className="help-block error-missing">we need to know your birthdate</p>)).toEqual(true);
      });
        it('should show an error message when the input value is in an invalid format', () => {
          dob.simulate('change', {target:{value:'11282016'}});
          expect(wrapper.contains(<p className="help-block error-invalid">that isn't a valid date</p>)).toEqual(true);
        });
        it('should show an error message when the difference between input value and current date is less than 13 years', () => {
          dob.simulate('change', {target:{value:'11/28/2016'}});
          expect(wrapper.contains(<p className="help-block error-not-old">sorry, you must be at least 13 to sign up</p>)).toEqual(true);
        });

    });

    describe('<PasswordConfirmationInput />', () => {
      const passwordConf = wrapper.find('#passwordConf');
      const password = wrapper.find('#password');

      it('should not show an error message specific to leaving the field blank', () => {
         passwordConf.simulate('change', {target:{value:''}});
         expect(wrapper.contains(<p className="help-block error-mismatched">passwords don't match</p>)).toEqual(false);
      });

      it('should show an error message if passwords do not match', () => {
         password.simulate('change', {target:{value:"Hello"}});
         passwordConf.simulate('change', {target:{value:"HeloItsMe"}});
         expect(wrapper.contains(<p className="help-block error-mismatched">passwords don't match</p>)).toEqual(true);
      });

      it('should not show an error message if passwords match', () => {
         password.simulate('change', {target:{value:"husky"}});
         passwordConf.simulate('change', {target:{value:"husky"}});
         expect(wrapper.contains(<p className="help-block error-mismatched">passwords don't match</p>)).toEqual(false);
      });
   });

   describe('reset button', () => {
      const reset = wrapper.find('#resetButton');
      it('should clear out all fields on click', () => {
         wrapper.setState({
            email: { value: 'email@domain.com', valid: true },
            name: { value: 'John', valid: true },
            dob: { value: '', valid: false },
            password: { value: 'password', valid: true },
            passwordConf: { value: 'password', valid: true }
         });
         reset.simulate('click');
         expect(wrapper.state()).toEqual(
            {
               email: { value: '', valid: false },
               name: { value: '', valid: false },
               dob: { value: '', valid: false },
               password: { value: '', valid: false },
               passwordConf: { value: '', valid: false }
            }
         );
      });
   });

})