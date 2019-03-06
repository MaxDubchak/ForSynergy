import React, {Component} from 'react';
import axios from 'axios';

import Modal from "@material-ui/core/Modal";
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Button from "@material-ui/core/Button";

import AddUserForm from "./add_user.js";
import "./users_page.css"

class MainPage extends Component{
    state= {
        users: [],
        openAddUserModal: false,
    };


  setJsonToState = (data) =>{
      console.log(data);
    let id = 0;
    let new_users = [];
    for(id; id<data.length; id++){
        new_users = new_users.concat([data[id]]);
    }
    this.setState({users: new_users});
  };

  refresh_users=()=>{
    const URL = "api/user/all";
    axios.get(URL)
        .then(response =>{
            this.setJsonToState(response.data);
        })
        .catch(error=>{
            console.log(error);
        })
  };

  componentWillMount() {
    this.refresh_users();
  };


  openAddUser=()=>{
      this.setState({openAddUserModal:true});
      this.refresh_users();
  };

  closeAddUserModal=()=>{
      this.setState({openAddUserModal:false});
  };

  onClickLogout=()=>{
      const URL = "api/user/logout";
      axios.get(URL)
          .then(response=>{
              this.props.history.push(0)
          })
          .catch(error=> {
              console.log(error);
          })

  };

  render(){
    return(
      <div className='root'>
        <Table className='custom_table'>
          <TableHead>
            <TableRow>
              <TableCell>User ID</TableCell>
              <TableCell>User Email</TableCell>
              <TableCell>Password</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {this.state.users.map( user => (
                <TableRow key={user.id}>
                  <TableCell>{user.user_id}</TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>{user.password}</TableCell>
                </TableRow>
                ))}
          </TableBody>
        </Table>
          <div className='custom_buttons'>
                <Button
                    className='AddButton'
                    variant='contained'
                    color='primary'
                    size='medium'
                    onClick={this.openAddUser}>
                    Add user
                </Button>

                <Button
                    variant='contained'
                    color='secondary'
                    size='medium'
                    onClick={this.onClickLogout}>
                    Logout
                </Button>
        </div>
        <div>
          <Modal
              open={this.state.openAddUserModal}
              onClose={this.closeAddUserModal}
              disableAutoFocus={true}>
              <AddUserForm
                  close={this.closeAddUserModal}
              />
          </Modal>
        </div>
      </div>
    )
  }
}

export default MainPage;
