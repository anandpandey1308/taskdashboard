import React from 'react';

import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import PlusIcon from '@material-ui/icons/Add';

import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';

import { makeStyles } from '@material-ui/core/styles';
import tasksController from '../controllers/tasks';

const useStyles = makeStyles({
    root:{
        position:"relative",
        background:"rgba(0,0,0,0.4)",
        display:"flex",
        justifyContent:"center",
        alignItem:"center",
        zIndex:"9",
        "& .makeStyle-root-79": {
            background: "rgba(0,0,0,0.4)"
          }
    },
    smallCard:{
        position:"absolute",
        
        width:"fit-content",
        padding:"10px 40px"
    },
    cardContent:{
        display:"flex",
        flexDirection:"column",
        justifyContent:"center",
    },
    input:{
        marginTop:"10px"
    },
    button:{
        padding:"5px 5px",
        marginTop:"10px"
    }
  });

export default function EditTask({taskId, setEditTask=()=>{}, editFromList}) {
    const classes = useStyles();

    const [taskName, setTaskName] = React.useState("");

    const editTask = async(e)=>{
        if(taskName !== ""){
            const response = await tasksController.editTask(taskId, taskName);
            setEditTask(null);
            editFromList(response.task);
        }
    }

    return (
        <div className={classes.root}>
            <Card className={classes.smallCard}>
                <CardContent className={classes.cardContent}>
                    <Typography variant="h6" color="textSecondary" gutterBottom>
                    + Edit Task
                    </Typography>
                    <TextField id="outlined-basic" className={classes.input} label="Task Name" variant="outlined" size="small" onChange={(e)=>{setTaskName(e.target.value)}} />
                    <Button
                        variant="contained"
                        color="primary"
                        size="small"
                        className={classes.button}
                        startIcon={<PlusIcon />}
                        onClick={editTask}
                    >
                        Edit Task
                    </Button>
                    <Button variant="outlined" color="secondary" className={classes.button} size="small" onClick={()=>{setEditTask(null)}}>
                        Cancel
                    </Button>
                </CardContent>
            </Card>
        </div>
    )
}
