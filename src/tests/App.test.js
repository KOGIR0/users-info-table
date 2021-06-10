import React from 'react';
import ReactDOM from 'react-dom';
import enzyme from 'enzyme';
import {cleanup} from '@testing-library/react';

import AddUserForm from '../components/AddUserForm'
import { UsersTable } from '../components/UsersTable';
import Adapter from 'enzyme-adapter-react-16';

enzyme.configure({ adapter: new Adapter() })

afterEach(cleanup);

it('Form should be disabled by default', () => {
    const div = document.createElement('div');
    ReactDOM.render(<AddUserForm />, div);
    expect(div.querySelector("[id='add-user-form']").style.display).toBe('none');
});

it('Button should be disabled by default', () => {
    const component = enzyme.shallow(<AddUserForm onSubmit={console.log("Click")}/>);
    expect(component.find("#add-button").props().disabled).toBe(true);
});

it('Button should be enabled when form filled', () => {
    const component = enzyme.shallow(<AddUserForm onSubmit={console.log("Click")}/>);
    component.find("#id-input").simulate('change', {target: { value: 1, id: 'id-input' }});
    component.find("#firstname-input").simulate('change', {target: { value: '1', id: 'firstname-input' }});
    component.find("#lastname-input").simulate('change', {target: { value: '11', id: 'lastname-input' }});
    component.find("#email-input").simulate('change', {target: { value: '1@mail.ru', id: 'email-input' }});
    component.find("#phone-input").simulate('change', {target: { value: '(111)111-1111', id: 'phone-input' }});

    expect(component.find("#add-button").props().disabled).toBe(false);
});

it('Button should be disabled when one of fields becomes empty', () => {
    const component = enzyme.shallow(<AddUserForm onSubmit={console.log("Click")}/>);
    component.find("#id-input").simulate('change', {target: { value: 1, id: 'id-input' }});
    component.find("#firstname-input").simulate('change', {target: { value: '1', id: 'firstname-input' }});
    component.find("#lastname-input").simulate('change', {target: { value: '11', id: 'lastname-input' }});
    component.find("#email-input").simulate('change', {target: { value: '1@mail.ru', id: 'email-input' }});
    component.find("#phone-input").simulate('change', {target: { value: '(111)111-1111', id: 'phone-input' }});

    component.find("#firstname-input").simulate('change', {target: { value: '', id: 'firstname-input' }});

    expect(component.find("#add-button").props().disabled).toBe(true);
});
