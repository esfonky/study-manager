import * as React from 'react';
import { useState } from 'react';
import TextField from '@mui/material/TextField';
import { Box, Toolbar, Typography } from '@mui/material';
import Grid from '@mui/material/Grid';
import IconButton from '@mui/material/IconButton';
import AddIcon from '@mui/icons-material/Add';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ClearIcon from '@mui/icons-material/Clear';
import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import Divider from '@mui/material/Divider';


function Todo() {
  const [todo, setTodo] = useState('');
  const [todos, setTodos] = useState([]);
  const [done, setDone] = useState([]);

  const addTodo = () => {
    if (todo !== ''){
      setTodos([...todos, todo])
      setTodo("");
    }
  };

  const deleteTodo = (text) => {
    const newTodos = todos.filter((todo) => {
      return todo !== text;
    });
    setTodos(newTodos);
  }

  const deleteDone = (text) => {
    const newDone = done.filter((doneTodo) => {
      return doneTodo !== text;
    });
    setDone(newDone);
    setTodos([...todos, text]);
  }

  const checkTodo = (text) => {
    setDone([...done, text]);
    deleteTodo(text);
  }

  var today = new Date(),
  date = (today.getMonth() + 1) + '/' + today.getDate();

  return(
    <Box sx={{ flexGrow:1 }}>
      <Toolbar />
      <Grid container spacing={2}>
        <Grid item xs={1}></Grid>
        <Grid item xs={5}>
          <Typography variant='h2' sx={{ mb:3 }}>{date}</Typography>
          <TextField 
            id="standard-basic" 
            label="새 할 일 추가" 
            variant="standard"
            sx={{width:300}}
            value={todo}
            onChange={(e) => {setTodo(e.target.value)}}/>
          <IconButton sx={{mt:2}} onClick={addTodo}><AddIcon/></IconButton>
          {todos?.length > 0 ? (
            <List>
              {todos.map((todo, index) => (
                <ListItem 
                  key={index}  
                  secondaryAction={
                  <IconButton 
                    edge="end"
                    onClick={() => {
                      deleteTodo(todo);
                  }}>
                    <ClearIcon/>
                  </IconButton>}
                >
                  <IconButton sx={{ mr:1 }}>
                   <RadioButtonUncheckedIcon onClick={()=>{checkTodo(todo)}}/>
                  </IconButton>
                  {todo}
                </ListItem>
              ))}
            </List>
          ) : (
            <List>
              <ListItem>남은 할 일이 없습니다</ListItem>
            </List>
          )}
        </Grid>
        <Grid item xs={1}></Grid>
        <Grid item xs={5}>
          <Typography variant='h4'>완료한 일 </Typography>
          <Divider sx={{fontSize:25}}>{done.length}개</Divider>
          {done?.length > 0 ? (
            <List>
              {done.map((doneTodo, index) => (
                <ListItem key={index}>
                  <IconButton sx={{ mr:1 }}> 
                    <CheckCircleIcon 
                      onClick = {() => {
                        deleteDone(doneTodo);
                      }} />
                  </IconButton>
                  {doneTodo}
                </ListItem>
              ))}
            </List>
          ) : (
            <React.Fragment>
              <Typography>완료한 일이 없습니다</Typography>
            </React.Fragment>
          )}
        </Grid>
      </Grid>
    </Box>
  );
}

export default Todo;
