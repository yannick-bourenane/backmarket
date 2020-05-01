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

  const classes = useStyles();


  return (
    <div className={classes.root}>
    {/* {console.log(filteredUsers)} */}
      <UsersToolbar users={users} getSearch={getSearch}/>
      <div className={classes.content}>
        <UsersTable users={users} filteredUsers={filteredUsers}/>
      </div>
    </div>
  );
};

export default UserList;
