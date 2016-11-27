import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { shallow } from 'enzyme';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<App />, div);
});

describe('<EmailInput />', () => {
   it('should show an error message specific to leaving the field blank', () => {
      const wrapper = shallow(<EmailInput />);
      wrapper.find('input').simulate('change', {target:{value:''}});
      expect(wrapper.contains(<p>we need to know your email address</p>)).to.equal(true);
   });
});