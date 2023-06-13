import { CardActionArea, Toolbar } from '@mui/material';
import { useState } from 'react';
import * as React from 'react';
import data from '../data/data';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Modal from '@mui/material/Modal';
import Divider from '@mui/material/Divider';
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
import Input from '@mui/material/Input';
import TextField from '@mui/material/TextField';


const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 700,
  minHeight: 200,
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4
};


export function NoteCard(props) {
  const [open, setOpen] = useState(false);
  const [modify, setModify] = useState(false);
  const [contentMod, setContentMod] = useState(props.content);
  const [titleMod, setTitleMod] = useState(props.title);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  var today = new Date();
  let date = today.getFullYear() + '/' + (today.getMonth() + 1) + '/' + today.getDate();

  return (
    <div>
      <Card sx={{ mb:props.mb }}> 
        <CardActionArea onClick={handleOpen}>
          <CardContent>
            <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
              {props.date}
            </Typography>
            <Typography variant="h5" component="div">
              {props.title}
            </Typography>
          </CardContent>
        </CardActionArea>
      </Card>

      <Modal
        open={open}
        onClose={handleClose}
      >
        <Box sx={style}>
          {modify?
          <React.Fragment>
            <Input 
              defaultValue={props.title}
              sx={{ mb : 2, fontSize : 24 }}
              onChange={(e)=>{
                setTitleMod(e.target.value)
              }}
            />
            <Typography id="modal-modal-title" color="text.secondary" variant="h7" component="h3" gutterBottom>
            {date}
            </Typography>
            <Divider />
            <TextField
              id="standard-multiline-static"
              multiline
              fullWidth
              defaultValue={props.content}
              variant="standard"
              rows={4}
              sx={{ mt : 2 }}
              onChange={(e)=>{
                setContentMod(e.target.value)
              }}
            />
          </React.Fragment>
          :
          <React.Fragment>
            <Typography id="modal-modal-title" variant="h5" component="h2">
              {props.title}
            </Typography>
            <Typography id="modal-modal-title" color="text.secondary" variant="h7" component="h3" gutterBottom>
              {props.date}
            </Typography>
            <Divider />
            <Box sx={{ minHeight:120 }}>
              <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                {props.content}
              </Typography>
            </Box>
          </React.Fragment>
          }
          <Box textAlign={'center'}>
            <Button 
              size="large" 
              variant="contained"
              sx={{ borderRadius: 16, mt: 2, m:1 }}
              onClick={() => {
                setModify(!modify);

                if(modify){
                  let copy = [...props.info];
                  // copy[props.i].content = props.content;
                  copy[props.i].content = contentMod;
                  // copy[props.i].title = props.title;
                  copy[props.i].title = titleMod;
                  props.setInfo(copy)
                } else {
                  props.setTitle(props.title);
                  props.setContent(props.content);
                }
              }}  
            >
              {modify? '저장':'수정'}
            </Button>
            <Button 
              size="large" 
              variant="contained"
              sx={{ borderRadius: 16, mt: 2, m:1, backgroundColor: 'red' }}
              onClick={() => {
                let copy = [...props.info];
                copy.splice(props.i, 1);
                props.setInfo(copy);
                handleClose();
              }}  
            >
              삭제
            </Button>
          </Box>
        </Box>
      </Modal>
    </div>
  );
}

const fabStyle = {
  position: 'absolute',
  bottom: 100,
  right: 100,
  width: 100,
  height: 100
};

function AddNote(props) {
  const [open, setOpen] = useState(false);
  // let [title, setTitle] = useState('');
  // let [content, setContent] = useState('');

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  var today = new Date();
  let date = today.getFullYear() + '/' + (today.getMonth() + 1) + '/' + today.getDate();

  return (
    <div>
      <Fab sx={fabStyle} onClick={handleOpen}>
        <AddIcon sx={{ fontSize : 45 }}/>
      </Fab>

      <Modal
        open={open}
        onClose={handleClose}
      >
        <Box sx={style}>
          <Input 
            placeholder="새 노트 제목"
            sx={{ mb : 2, fontSize : 24 }}
            onChange={(e)=>{
              props.setTitle(e.target.value)
            }}
          />
          <Typography id="modal-modal-title" color="text.secondary" variant="h7" component="h3" gutterBottom>
            {date}
          </Typography>
          <Divider />
          <TextField
            id="standard-multiline-static"
            multiline
            fullWidth
            placeholder="이 곳에 새 노트를 작성하세요."
            variant="standard"
            rows={4}
            sx={{ mt : 2 }}
            onChange={(e)=>{
              props.setContent(e.target.value)
            }}
          />
          <Box textAlign='center'>
            <Button 
              size="large" 
              variant="contained"
              sx={{ borderRadius: 16, mt: 2 }}
              onClick={() => {
                let data={
                  title: props.title,
                  date: date,
                  content: props.content
                }
                let copy = [...props.info]
                copy.unshift(data);
                props.setInfo(copy);
                setOpen(false);
              }}  
            >
              저장
            </Button>
          </Box>
        </Box>
      </Modal>
    </div>
  );
 
}

function Notes() {
  let [info, setInfo] = useState(data);
  let [title, setTitle] = useState('');
  let [content, setContent] = useState('');

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Toolbar /> {/* 이게 있어야 컨텐츠가 네비게이션 아래로 숨지 않는다.*/}
      <Grid container spacing={5}>
        {info.map(function(row, i){
          return(
            <Grid item xs={4}>
              <NoteCard 
                title={row.title} 
                date={row.date} 
                content={row.content}
                info={info}
                setInfo={setInfo} 
                i={i}
                setTitle={setTitle}
                setContent={setContent}/>
            </Grid>
          )
        })}
      </Grid>

      <AddNote 
        info={info} 
        setInfo={setInfo} 
        title={title} 
        setTitle={setTitle} 
        content={content} 
        setContent={setContent}/>
      
    </Box>
  );
}

export default Notes;