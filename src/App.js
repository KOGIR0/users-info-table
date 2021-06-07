import './App.css';
import React from 'react';

var smallDataURL = 'http://www.filltext.com/?rows=32&id={number|1000}&firstName={firstName}&lastName={lastName}&email={email}&phone={phone|(xxx)xxx-xx-xx}&address={addressObject}&description={lorem|32}';
var bigDataURL = 'http://www.filltext.com/?rows=1000&id=%7Bnumber%7C1000%7D&firstName=%7BfirstName%7D&delay=3&lastName=%7BlastName%7D&email=%7Bemail%7D&phone=%7Bphone%7C(xxx)xxx-xx-xx%7D&address=%7BaddressObject%7D&description=%7Blorem%7C32%7D'
var ascending = 'asc';
var descending = 'des';

class UsersTable extends React.Component
{

  constructor(props)
  {
    super(props);

    this.state = {
      usersData: [[]],
      sortValue: "",
      sortDirection: "",
      pageNum: 0,
      currentPage: 0,
    }

    this.sortColumn = this.sortColumn.bind(this);
    this.getSortDirection = this.getSortDirection.bind(this);
    this.changePage = this.changePage.bind(this);
    this.Search = this.Search.bind(this);
  }

  componentDidMount()
  {
    console.log("Fetching data");
    fetch(bigDataURL)
    .then(response => response.json())
    .then(data => {
      console.log(data);
      this.setState({usersData: data, pageNum: data.length / 50});
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
    console.log(document.getElementById('search-value').value);
  }

  render()
  {
    return (
      <div className="App">
        <form>
          <input type="text" id="search-value"></input>
          <input type="button" onClick={this.Search} value="Find"/>
        </form>
        <table>
            <tbody>
            <tr>
              <th onClick={() => this.sortColumn('id')}>ID {this.getSortDirection('id')}</th>
              <th onClick={() => this.sortColumn('firstName')}>firstName {this.getSortDirection('firstName')}</th>
              <th onClick={() => this.sortColumn('lastName')}>lastName {this.getSortDirection('lastName')}</th>
              <th onClick={() => this.sortColumn('email')}>email {this.getSortDirection('email')}</th>
              <th onClick={() => this.sortColumn('phone')}>phone {this.getSortDirection('phone')}</th>
            </tr>
            {this.state.usersData.slice(50 * this.state.currentPage,
             50 * (this.state.currentPage + 1) < this.state.usersData.length ?
             50 * (this.state.currentPage + 1) : this.state.usersData.length).map((data, index) => {
              return <tr key={index}>
                <td>{index} {data.id}</td>
                <td>{data.firstName}</td>
                <td>{data.lastName}</td>
                <td>{data.email}</td>
                <td>{data.phone}</td>
                </tr>
            })}
          </tbody>
        </table>
        <div style={{display: 'flex', flexDirection: 'row'}}>
          {
            [...Array(this.state.pageNum).keys()].map((key) => <div onClick={() => this.changePage(key)} style={{margin: '5px', padding: '5px', borderRadius: '3px', backgroundColor: 'orange'}}>{key + 1}</div>)
          }
        </div>
      </div>
    );
  }
}

export default UsersTable;
