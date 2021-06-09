import React from 'react';

class AddUserForm extends React.Component
{
  checkFormFields(e)
  {
    let id = e.target.parentNode.parentNode[0].value;
    let firstName = e.target.parentNode.parentNode[1].value;
    let lastName = e.target.parentNode.parentNode[2].value;
    let email = e.target.parentNode.parentNode[3].value;
    let phone = e.target.parentNode.parentNode[4].value;
    if(id === '' || firstName === '' || lastName === '' || email === '' || phone === '')
    {
      e.target.parentNode.parentNode[5].disabled = true;
    } else {
      e.target.parentNode.parentNode[5].disabled = false;
    }
  }

  render()
  {
    return (
      <form id="add-user-form" style={{display: 'none'}} onSubmit={this.props.onSubmit}>
        <div>
          <label>ID:</label><input type="number" required onChange={this.checkFormFields}/>
        </div>
        <div>
          <label>FirstName:</label><input type="text" required onChange={this.checkFormFields}/>
        </div>
        <div>
          <label>LastName:</label><input type="text" required onChange={this.checkFormFields}/>
        </div>
        <div>
          <label>Email:</label><input type="email" required onChange={this.checkFormFields}/>
        </div>
        <div>
          <label>Phone:</label><input type="tel" pattern="[(][0-9]{3}[)][0-9]{3}-[0-9]{4}" required onChange={this.checkFormFields}/>
        </div>
        <div>
          <input type="submit" value="Добавить" disabled="disabled"/>
        </div>
      </form>
    )
  }
}

export default AddUserForm;