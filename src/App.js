import './App.css';
import React from 'react';
import AddUserForm from './components/AddUserForm';
import {UsersTable, pageElemsNum} from './components/UsersTable';

const smallDataURL = 'http://www.filltext.com/?rows=32&id=%7Bnumber%7C1000%7D&firstName=%7BfirstName%7D&lastName=%7BlastName%7D&email=%7Bemail%7D&phone=%7Bphone%7C(xxx)xxx-xx-xx%7D&address=%7BaddressObject%7D&description=%7Blorem%7C32%7D';
const bigDataURL = 'http://www.filltext.com/?rows=1000&id=%7Bnumber%7C1000%7D&firstName=%7BfirstName%7D&delay=3&lastName=%7BlastName%7D&email=%7Bemail%7D&phone=%7Bphone%7C(xxx)xxx-xx-xx%7D&address=%7BaddressObject%7D&description=%7Blorem%7C32%7D';

function Pages(props)
{
  return (
    <div style={{display: 'flex', flexDirection: 'row'}}>
    {
      [...Array(props.pageNum).keys()].map(
        (key, index) => {
          return (
          <div key={index} className="page-num"
            onClick={() => props.onClick(key)}>
              {key + 1}
          </div>
          );
        }
      )
    }
    </div>
  );
}

class UsersInfoApp extends React.Component
{

  constructor(props)
  {
    super(props);

    this.state = {
      initialUsersData: [],
      usersData: [],
      pageNum: 0,
      currentPage: 0,
      loading: true
    }

    this.changePage = this.changePage.bind(this);
    this.Search = this.Search.bind(this);
    this.addUser = this.addUser.bind(this);
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
      console.log("Error: " + e);
    });
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
      pageNum: filteredData.length % pageElemsNum === 0 ?
       Math.floor(filteredData.length / pageElemsNum) :
       Math.floor(filteredData.length / pageElemsNum) + 1});
  }

  showForm(e)
  {
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

  addUser(e)
  {
    e.preventDefault();
    let id = e.target[0].value;
    let firstName = e.target[1].value;
    let lastName = e.target[2].value;
    let email = e.target[3].value;
    let phone = e.target[4].value;
    let newUser = {
      id: id,
      firstName: firstName,
      lastName: lastName,
      email: email,
      phone: phone,
      adress: {
        streetAdress: "",
        city: '',
        state: '',
        zip: ''
      },
      description: ''
    }

    this.setState({
      initialUsersData: [newUser, ...this.state.initialUsersData],
      usersData: [newUser, ...this.state.initialUsersData]
    });
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
        <AddUserForm onSubmit={this.addUser}/>
        {this.state.loading ? <div>Loading...</div> : null}
        <UsersTable data={this.state.usersData} currentPage={this.state.currentPage}/>
        <Pages onClick={this.changePage} pageNum={this.state.pageNum}/>
      </div>
    );
  }
}

export default UsersInfoApp;