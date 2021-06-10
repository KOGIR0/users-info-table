import React from 'react';
import './UsersTable.css';

const ascending = 'asc';
const descending = 'des';
const pageElemsNum = 50;

class UsersTable extends React.Component
{
  constructor(props)
  {
    super(props);

    this.state = {
      usersData: props.data ? props.data : [],
      sortValue: "",
      sortDirection: "",
      chosenUser: null
    }

    this.sortColumn = this.sortColumn.bind(this);
    this.showUserInfo = this.showUserInfo.bind(this);
  }

  componentDidUpdate(oldProps) {
    const newProps = this.props
    if(oldProps.data !== newProps.data) {
      this.setState({ 
        usersData: this.props.data,
        sortValue: "",
        sortDirection: "",
        chosenUser: null
       })
    }
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

  showUserInfo(index)
  {
    let userNumInArray = index + pageElemsNum * this.props.currentPage;
    if(this.state.chosenUser !== this.state.usersData[userNumInArray])
    {
      this.setState({chosenUser: this.state.usersData[userNumInArray]});
    } else {
      this.setState({chosenUser: null});
    }
  }

  render()
  {
    return (
      <div>
      <table className="center">
        <tbody>
          <tr>
            <th className="column-name" onClick={() => this.sortColumn('id')}>ID {this.getSortDirection('id')}</th>
            <th className="column-name" onClick={() => this.sortColumn('firstName')}>firstName {this.getSortDirection('firstName')}</th>
            <th className="column-name" onClick={() => this.sortColumn('lastName')}>lastName {this.getSortDirection('lastName')}</th>
            <th className="column-name" onClick={() => this.sortColumn('email')}>email {this.getSortDirection('email')}</th>
            <th className="column-name" onClick={() => this.sortColumn('phone')}>phone {this.getSortDirection('phone')}</th>
          </tr>
          {this.state.usersData.slice(pageElemsNum * this.props.currentPage,
          pageElemsNum * (this.props.currentPage + 1) < this.state.usersData.length ?
          pageElemsNum * (this.props.currentPage + 1) : this.state.usersData.length).map((data, index) => {
            return (<tr className="user-row" key={index} onClick={() => this.showUserInfo(index)} style={data === this.state.chosenUser ? {backgroundColor: 'orange'} : null}>
              <td>{data.id}</td>
              <td>{data.firstName}</td>
              <td>{data.lastName}</td>
              <td>{data.email}</td>
              <td>{data.phone}</td>
              </tr>)
          })}
        </tbody>
      </table>
      <ChosenUserInfo user={this.state.chosenUser}/>
      </div>
    );
  }
}

function ChosenUserInfo(props)
{
  if(props.user !== null)
  {
    return <div>
            <div>Выбран пользователь <b>{props.user.firstName + " " + props.user.lastName}</b></div>
            <div>Описание:</div>
            <textarea defaultValue={props.user.description}></textarea>
            <div>Адрес проживания: <b>{props.user.address.streetAddress}</b></div>
            <div>Город: <b>{props.user.address.city}</b></div>
            <div>Провинция/штат: <b>{props.user.address.state}</b></div>
            <div>Индекс: <b>{props.user.address.zip}</b></div>
          </div>
  }
  return null;
}

export {UsersTable, pageElemsNum};