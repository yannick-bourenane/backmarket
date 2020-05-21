import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/styles';
import { UsersToolbar, UsersTable } from './components';
import axios from 'axios';


const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(3)
  },
  content: {
    marginTop: theme.spacing(2)
  }
}));

const UserList = () => {
  const [users,setUsers] = useState([]);
  const [userId, setUserId] = useState("");
  const [selectedUsers, setSelectedUsers] = useState([]);

  useEffect(() => {
    axios.get(process.env.REACT_APP_BACKEND_URL + "/admin/users").then(users => {
      setUsers(users.data)
    })
    }
  , [])
  const [search, setSearch] = useState("")

   function handleSearch() {
    if (search) {
    return users.filter((user) => user.lastname.toLowerCase().includes(search.toLowerCase()));}
    return users;
    }

  let filteredUsers = handleSearch()

  function getSearch(e) {
    setSearch(e.target.value)
  }

  const handleSelectAll = event => {
    let selectedUsers;

    if (event.target.checked) {
      selectedUsers = filteredUsers.map(user => user._id);
    } else {
      selectedUsers = [];
    }

    setSelectedUsers(selectedUsers);
  };

  const handleSelectOne = (event, id) => {
    const selectedIndex = selectedUsers.indexOf(id);
    let newSelectedUsers = [];
    setUserId(id)
    if (selectedIndex === -1) {
      newSelectedUsers = newSelectedUsers.concat(selectedUsers, id);
    } else if (selectedIndex === 0) {
      newSelectedUsers = newSelectedUsers.concat(selectedUsers.slice(1));
    } else if (selectedIndex === selectedUsers.length - 1) {
      newSelectedUsers = newSelectedUsers.concat(selectedUsers.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelectedUsers = newSelectedUsers.concat(
        selectedUsers.slice(0, selectedIndex),
        selectedUsers.slice(selectedIndex + 1)
      );
    }

    setSelectedUsers(newSelectedUsers);
  };
  

  const classes = useStyles();


  return (
    <div className={classes.root}>
      <UsersToolbar users={users} getSearch={getSearch} userId={userId} handleSelectAll={handleSelectAll}  handleSelectOne={handleSelectOne} selectedUsers={selectedUsers}/>
      <div className={classes.content}>
        <UsersTable users={users} filteredUsers={filteredUsers} handleSelectAll={handleSelectAll} handleSelectOne={handleSelectOne} selectedUsers={selectedUsers}/>
      </div>
    </div>
  );
};

export default UserList;
