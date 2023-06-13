import * as React from 'react';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { useState } from 'react';
import { Toolbar } from '@mui/material';
import Input from '@mui/material/Input';
import Divider from '@mui/material/Divider';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';


function Countdown() {
  const [start, setStart] = useState(false);
  const [hr, setHr] = useState(0);
  const [min, setMin] = useState(0);
  const [sec, setSec] = useState(0);
  const [time, setTime] = useState(0);

  let inputTime = hr + min + sec;

  React.useEffect(() => {
    let interval = null;
    
    if ((start && time>0) === true) {
      interval = setInterval(() => {
        setTime((time) => time - 1);
      }, 1000);
    } else {
      clearInterval(interval);
    }
    return () => {
      clearInterval(interval);
    };
  }, [start, time]);

  const TimeChip = (props) => {
    return(
      <Chip 
        label={props.label} 
        variant="outlined"
        onClick={() => {
          setHr(props.hr * 3600)
          setMin(props.min * 60)
        }}/>
    );
  }

  let inputSx = {fontSize : 95, width : 105}
  return(
    <React.Fragment>
      <Stack direction="row" spacing={1}>
        <TimeChip label="국어" hr={1} min={20} />
        <TimeChip label="수학" hr={1} min={40} />
        <TimeChip label="영어" hr={1} min={10} />
        <TimeChip label="탐구" hr={0} min={30} />
      </Stack>

      {start ? 
      <Typography variant='h1'>
        {("0" + Math.floor(time / 3600)).slice(-2)} : {("0" + Math.floor((time / 60) % 60)).slice(-2)} : {("0" + Math.floor(time % 60)).slice(-2)}
      </Typography>
      :
      <Stack direction="row" spacing={4}>
        <Input placeholder="00" value={hr/3600} sx={inputSx} onChange={(e)=>{setHr(e.target.value * 3600)}}/>
        <Typography variant='h1'>:</Typography>
        <Input placeholder="00" value={min/60} sx={inputSx} onChange={(e)=>{setMin(e.target.value * 60)}}/> 
        <Typography variant='h1'>:</Typography>
        <Input placeholder="00" sx={inputSx} onChange={(e)=>{setSec(e.target.value * 1)}}/>
      </Stack>
      }
      

      <Button 
        size="large" 
        variant="contained"
        sx={{ borderRadius: 16, mt: 2, m:1, ml : 23 }} 
        onClick={() => {
          setStart(!start)
          setTime(inputTime)
          
        }}
      >
        {start ? 'STOP' : 'START'}
      </Button>

      
    </React.Fragment>
  )
}

function Timer(props) {
  let second = props.time / 1000

  return(
    <Typography variant='h1'>
      {("0" + Math.floor(second / 3600)).slice(-2)} : {("0" + Math.floor((second / 60) % 60)).slice(-2)} : {("0" + Math.floor(second % 60)).slice(-2)}
    </Typography>

  )
}

function ControlButtons(props) {
  const StartButton = (
    <Button 
     size="large" 
     variant="contained"
     sx={{ borderRadius: 16, mt: 2, m:1, ml: 23 }} 
     onClick={props.handleStart}>Start</Button>
  );

  const ActiveButtons = (
    <React.Fragment>
      <Button 
       size="large" 
       variant="contained"
       sx={{ borderRadius: 16, mt: 2, m:1, ml:16 }} 
       onClick={props.handleReset}>Reset</Button>
      <Button 
       size="large" 
       variant="contained"
       sx={{ borderRadius: 16, mt: 2, m:1 }} 
       onClick={props.handlePauseResume}>
        {props.paused ? "Resume" : "Pause"}</Button>
    </React.Fragment>
  );

  return (
    <React.Fragment>
      {props.active ? ActiveButtons : StartButton}
    </React.Fragment>
  );

}

function Stopwatch() {
  const [active, setActive] = useState(false);
  const [paused, setPaused] = useState(true);
  const [time, setTime] = useState(0); 

  React.useEffect(() => {
    let interval = null;
    
    if (active && paused === false) {
      interval = setInterval(() => {
        setTime((time) => time + 1000);
      }, 1000);
    } else {
      clearInterval(interval);
    }
    return () => {
      clearInterval(interval);
    };
  }, [active, paused]);

  const handleStart = () => {
    setActive(true);
    setPaused(false);
  }

  const handlePauseResume = () => {
    setPaused(!paused);
  }

  const handleReset = () => {
    setActive(false);
    setTime(0);
  }

  return (
    <Box sx={{flexGrow:1}}>
      <Toolbar />
      <Typography variant='h4'>스톱워치</Typography>
      <Timer time={time} />
      <ControlButtons
        active={active}
        paused={paused}
        handleStart={handleStart}
        handlePauseResume={handlePauseResume}
        handleReset={handleReset}
      />
      <Divider sx={{ mt : 3 }}/>
      <Typography sx={{ mt : 3, mb : 1 }} variant='h4'>타이머</Typography>
      <Countdown />
    </Box>
  );
}

export default Stopwatch;