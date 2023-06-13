import * as React from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import { Toolbar, Typography } from '@mui/material';
import HeatMap from '@uiw/react-heat-map';
import Tooltip from '@mui/material/Tooltip';
import { useState } from 'react';
import data from '../data/data';
import { NoteCard } from './Notes';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import taskData from '../data/taskData';


function Calendar() {
  let [date, setDate] = useState('');
  let [notes, setNotes] = useState(data);
  let [tasks, setTasks] = useState(taskData);


  const noteFilter = (input) => {
    let newNotes = data.filter((note) => {
      return note.date === input;
    });
    setNotes(newNotes);
  }
  const taskFilter = (input) => {
    let newTasks = taskData.filter((item) => {
      return item.date === input; 
    });
    setTasks(newTasks);
  }


  return (
    <Box sx={{ flexGrow:1 }}>
      <Toolbar />
      <HeatMap 
        value={taskData}
        width={1200}
        height={270}
        
        rectSize={30}
        panelColors={{ 1: '#9cd7ff', 4: '#7ae0ff', 6: '#0789e6', 9: '#024778'}}
        weekLabels={['일', '월', '화', '수', '목', '금', '토']}
        monthLabels={	['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12']}
        legendCellSize={0}
        startDate={new Date('2023/01/01')}
        endDate={new Date()}
        rectRender={(props, data) => {
          // if (!data.count) return <rect {...props} />;
          return (
            <Tooltip 
              key={props.key} 
              placement="top" 
              title={`${data.date || 0}`} 
              arrow 
              followCursor
            >
              <rect {...props} onClick={() => {
                setDate(data.date);
                noteFilter(date);
                taskFilter(date);
              }}/>
            </Tooltip>
          );
        }} />

      <Grid container spacing={3}>
      {date !== '' ? 
        <React.Fragment>
          <Grid item xs={12}><Typography variant='h3'>{date}</Typography></Grid>
          <Grid item xs={3.5}>
            <Typography variant='h5' sx={{ mb:2 }}>이 날 작성한 노트</Typography>
            {notes.length > 0 ? notes.map(function(row, i){
            return(
              <NoteCard title={row.title} content={row.content} i={i} mb={2}/>
            );}) : <Typography variant='h6' sx={{color:'gray'}}>작성한 노트가 없습니다</Typography>}
          </Grid>
          <Grid item xs={0.5}></Grid>
          <Grid item xs={4}>
            <Typography variant='h5' sx={{ mb:2 }}>이 날 완료한 일</Typography>
            {tasks.length > 0 ? tasks[0].done.map(function(row, i){
            return(
              <Typography variant='h6' sx={{ mb:2 }}><CheckCircleIcon sx={{mr:1}}/>{row}</Typography>
            );}) : <Typography variant='h6' sx={{color:'gray'}}>완료한 일이 없습니다</Typography>}
          </Grid>
        </React.Fragment>
          
        : <Grid item xs={12}><Typography variant='h4'>날짜를 선택해주세요</Typography></Grid>}
      </Grid>
    </Box>
  );
}


export default Calendar;