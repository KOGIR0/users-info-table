import './App.css';
import React from 'react';

const smallDataURL = 'http://www.filltext.com/?rows=32&id={number|1000}&firstName={firstName}&lastName={lastName}&email={email}&phone={phone|(xxx)xxx-xx-xx}&address={addressObject}&description={lorem|32}';
const bigDataURL = 'http://www.filltext.com/?rows=1000&id=%7Bnumber%7C1000%7D&firstName=%7BfirstName%7D&delay=3&lastName=%7BlastName%7D&email=%7Bemail%7D&phone=%7Bphone%7C(xxx)xxx-xx-xx%7D&address=%7BaddressObject%7D&description=%7Blorem%7C32%7D'
const ascending = 'asc';
const descending = 'des';
const pageElemsNum = 50;

class UsersTable extends React.Component
{

  constructor(props)
  {
    super(props);

    this.state = {
      initialUsersData: [[]],
      usersData: [[]],
      sortValue: "",
      sortDirection: "",
      pageNum: 0,
      currentPage: 0,
      chosenUser: null,
      loading: true
    }

    this.sortColumn = this.sortColumn.bind(this);
    this.getSortDirection = this.getSortDirection.bind(this);
    this.changePage = this.changePage.bind(this);
    this.Search = this.Search.bind(this);
    this.showUserInfo = this.showUserInfo.bind(this);
  }

  componentDidMount()
  {
    fetch(bigDataURL)
    .then(res => res.ok ? res : Promise.reject(res))
    .then(response => response.json())
    .then(data => {
      this.setState({usersData: data,
       initialUsersData: data,
       loading: false,
       pageNum: data.length % pageElemsNum === 0 ? Math.floor(data.length / pageElemsNum) : Math.floor(data.length / pageElemsNum) + 1});
    }).catch((e) => {
      console.log(e);
    });
  }

  getSortDirection(param)
  {
    if(this.state.sortValue === param)
    {
      if(this.state.sortDirection === ascending)
      {
        return <strong>&#8593;</strong>;
      } else {
        return <strong>&#8595;</strong>;
      }
    }
    return null;
  }

  sortColumn(param)
  {
    if(this.state.sortValue === param)
    {
      if(this.state.sortDirection === ascending)
      {
        this.setState({
          usersData: this.state.usersData.sort((a, b) => a[param] < b[param]),
          sortValue: param,
          sortDirection: descending
        });
      } else {
        this.setState({
          usersData: this.state.usersData.sort((a, b) => a[param] > b[param]),
          sortValue: param,
          sortDirection: ascending
        });
      }
    } else {
      this.setState({
        usersData: this.state.usersData.sort((a, b) => a[param] > b[param]),
        sortValue: param,
        sortDirection: ascending
      });
    }
  }

  changePage(key)
  {
    this.setState({currentPage: key});
  }

  Search(e)
  {
    let searchValue = document.getElementById('search-value').value;
    let filteredData = this.state.initialUsersData.filter((data) => {
      return data.id === +searchValue || data.firstName.toLowerCase().includes(searchValue)
      || data.lastName.toLowerCase().includes(searchValue) || data.email.toLowerCase().includes(searchValue)
      || data.phone.includes(searchValue);
    });
    
    this.setState({usersData: filteredData,
      currentPage: 0,
      pageNum: filteredData.length % pageElemsNum === 0 ? Math.floor(filteredData.length / pageElemsNum) : Math.floor(filteredData.length / pageElemsNum) + 1});
  }

  showUserInfo(index)
  {
    if(this.state.chosenUser !== this.state.usersData[index + pageElemsNum * this.state.currentPage])
    {
      this.setState({chosenUser: this.state.usersData[index + pageElemsNum * this.state.currentPage]});
    } else {
      this.setState({chosenUser: null});
    }
  }

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
    console.log(id);
    console.log("firstName: " + firstName);
    console.log("lastName: " + lastName);
    console.log("email: " + email);
    console.log("phone: " + phone);
  }

  showForm(e)
  {
    console.log(e.target);
    let display = document.getElementById('add-user-form').style.display;
    if(display === 'none')
    {
      e.target.innerHTML = 'Отмена';
      document.getElementById('add-user-form').style.display = 'block';
    } else {
      e.target.innerHTML = 'Добавить';
      document.getElementById('add-user-form').style.display = 'none';
    }
  }

  render()
  {
    return (
      <div className="App">
        <form>
          <input type="text" id="search-value"></input>
          <input type="button" onClick={this.Search} value="Find"/>
        </form>
        <button onClick={this.showForm}>Добавить</button>
        <form id="add-user-form" style={{display: 'none'}}>
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
            <label>Phone:</label><input type="tel" required onChange={this.checkFormFields}/>
          </div>
          <div>
            <input type="submit" value="Добавить" disabled="disabled"/>
          </div>
        </form>
        {this.state.loading ? <div>Loading...</div> : null}
        <table>
            <tbody>
            <tr>
              <th onClick={() => this.sortColumn('id')}>ID {this.getSortDirection('id')}</th>
              <th onClick={() => this.sortColumn('firstName')}>firstName {this.getSortDirection('firstName')}</th>
              <th onClick={() => this.sortColumn('lastName')}>lastName {this.getSortDirection('lastName')}</th>
              <th onClick={() => this.sortColumn('email')}>email {this.getSortDirection('email')}</th>
              <th onClick={() => this.sortColumn('phone')}>phone {this.getSortDirection('phone')}</th>
            </tr>
            {this.state.usersData.slice(pageElemsNum * this.state.currentPage,
             pageElemsNum * (this.state.currentPage + 1) < this.state.usersData.length ?
             pageElemsNum * (this.state.currentPage + 1) : this.state.usersData.length).map((data, index) => {
              return <tr key={index} onClick={() => this.showUserInfo(index)}>
                <td>{data.id}</td>
                <td>{data.firstName}</td>
                <td>{data.lastName}</td>
                <td>{data.email}</td>
                <td>{data.phone}</td>
                </tr>
            })}
          </tbody>
        </table>
          {
          this.state.chosenUser !== null ?
          <div>
            <div>Выбран пользователь <b>{this.state.chosenUser.firstName + " " + this.state.chosenUser.lastName}</b></div>
            <div>Описание:</div>
            <textarea defaultValue={this.state.chosenUser.description}></textarea>
            <div>Адрес проживания: <b>{this.state.chosenUser.address.streetAdress}</b></div>
            <div>Город: <b>{this.state.chosenUser.address.city}</b></div>
            <div>Провинция/штат: <b>{this.state.chosenUser.address.state}</b></div>
            <div>Индекс: <b>{this.state.chosenUser.address.zip}</b></div>
          </div>
          :
          null
          }
        <div style={{display: 'flex', flexDirection: 'row'}}>
          {
            [...Array(this.state.pageNum).keys()].map((key, index) => <div key={index} onClick={() => this.changePage(key)} style={{margin: '5px', padding: '5px', borderRadius: '3px', backgroundColor: 'orange'}}>{key + 1}</div>)
          }
        </div>
      </div>
    );
  }
}

export default UsersTable;
