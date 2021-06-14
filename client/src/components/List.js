import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import Checkbox from '@material-ui/core/Checkbox';
import IconButton from '@material-ui/core/IconButton';
import Divider from '@material-ui/core/Divider';

import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';

import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import tasksController from '../controllers/tasks';
import EditTask from './EditTask';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    marginTop:"15px"
  },
  listItem:{
      margin:"10px 0"
  }
}));

export default function TasksList({dashboardData, removeFromTaskList, editFromList, editFromListC}) {
  const classes = useStyles();

  const [tasksList, setTasks] = React.useState(dashboardData.latestTasks);
  
  const [editTask, setEditTask] = React.useState(null);

  const removeTask = async (taskId)=>{
      await tasksController.removeTask(taskId);
      removeFromTaskList(taskId);
  }

  const editATask = async (taskId, completed)=>{
    console.log(taskId, completed);
    tasksController.editTask(taskId, null, !completed);
    editFromListC(taskId, !completed);
  }

  return (
    <>
    {editTask != null && <EditTask taskId={editTask} setEditTask={setEditTask} editFromList={editFromList} />}
    <Card className={classes.root}>
      <CardContent className={classes.cardContent}>
        <List className={classes.root}>
          {tasksList.map((task, i) => {
              
            const taskId = task["_id"];
            return (
                <div key={taskId}>
                <ListItem key={taskId} role={undefined} dense button onClick={()=>{editATask(taskId, task.completed)}} className={classes.listItem}>
                    <ListItemIcon>
                    <Checkbox
                      edge="start"
                      checked={ task.completed }
                      tabIndex={-1}
                      disableRipple
                    />
                    </ListItemIcon>
                    <ListItemText id={taskId} primary={task.name} />
                    <ListItemSecondaryAction>
                    <IconButton edge="end" onClick={()=>setEditTask(taskId)}>
                        <EditIcon />
                    </IconButton>
                    <IconButton edge="end" onClick={()=>removeTask(taskId)} >
                        <DeleteIcon />
                    </IconButton>
                    </ListItemSecondaryAction>
                </ListItem>
                {i !== tasksList.length && <Divider variant="middle" />}
              </div>
            );
          })}
        </List>
      </CardContent>
    </Card>
    </>
  );
}