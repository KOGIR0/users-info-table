import React from 'react';

class AddUserForm extends React.Component
{
  constructor(props)
  {
    super(props);

    this.state = {
      id: '',
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      disabled: true,
    }
  }

  checkFormFields(e)
  {
    let id = this.state.id;
    let firstName = this.state.firstName;
    let lastName = this.state.lastName;
    let email = this.state.email;
    let phone = this.state.phone;

    switch(e.target.id)
    {
      case 'id-input':
        this.setState({id: e.target.value});
        id = e.target.value;
        break;
      case 'firstname-input':
        this.setState({firstName: e.target.value});
        firstName = e.target.value;
        break;
      case 'lastname-input':
        this.setState({lastName: e.target.value});
        lastName = e.target.value;
        break;
      case 'email-input':
        this.setState({email: e.target.value});
        email = e.target.value;
        break;
      case 'phone-input':
        this.setState({phone: e.target.value});
        phone = e.target.value;
        break;
    }
    if(id.length < 1 || firstName.length < 1 ||
     lastName.length < 1 || email.length < 1 || phone.length < 1)
    {
      this.setState({disabled: true});
    } else {
      this.setState({disabled: false});
    }
  }

  render()
  {
    return (
      <form id="add-user-form" style={{display: 'none'}} onSubmit={this.props.onSubmit}>
        <div>
          <label>ID:</label>
          <input id="id-input" type="number"
                value={this.state.id} required
                onChange={this.checkFormFields.bind(this)}/>
        </div>
        <div>
          <label>FirstName:</label>
          <input id="firstname-input" type="text"
                value={this.state.firstName} required
                onChange={this.checkFormFields.bind(this)}/>
        </div>
        <div>
          <label>LastName:</label>
          <input id="lastname-input" type="text"
                value={this.state.lastName} required
                onChange={this.checkFormFields.bind(this)}/>
        </div>
        <div>
          <label>Email:</label>
          <input id="email-input" type="email"
                value={this.state.email} required
                onChange={this.checkFormFields.bind(this)}/>
        </div>
        <div>
          <label>Phone:</label>
          <input id="phone-input" type="tel" 
                value={this.state.phone}
                pattern="[(][0-9]{3}[)][0-9]{3}-[0-9]{4}"
                required onChange={this.checkFormFields.bind(this)}/>
        </div>
        <div>
          <input id="add-button" type="submit" value="Добавить" disabled={this.state.disabled}/>
        </div>
      </form>
    )
  }
}

export default AddUserForm;