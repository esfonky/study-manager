import * as React from 'react';
import './App.css';
import 'react-day-picker/dist/style.css';
import Navigation from './components/Navigation';
import Box from '@mui/material/Box';
import {
  Route,
  Routes,
  Navigate
} from 'react-router-dom';
import Calendar from './pages/Calendar';
import { Container } from '@mui/material';
import Notes from './pages/Notes';
import Todo from './pages/Todo';
import Timer from './pages/Timer';


function App() {
  return (
    <Box sx={{ display: 'flex' }}>
      
      <Navigation />
      
      <Container maxWidth='xl' sx={{ marginY: 5 }}>
        <Routes>
          <Route exact path="/" element={<Navigate to="/calendar"/>} />
          <Route path="/calendar" element={<Calendar />} />
          <Route path="/notes" element={<Notes />} />
          <Route path="/todo" element={<Todo />} />
          <Route path="/timer" element={<Timer />} />
        </Routes> 
      </Container>
    </Box>
  );
}

export default App;
