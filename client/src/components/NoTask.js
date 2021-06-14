import React from 'react';

import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import PlusIcon from '@material-ui/icons/Add';

import Typography from '@material-ui/core/Typography';

import { makeStyles } from '@material-ui/core/styles';
import AddTask from './AddTask';

const useStyles = makeStyles({
    smallCard:{
        position:"absolute",
        top:"40%",
        right:"43%",
        
        width:"fit-content",
        padding:"10px 40px"
    },
    cardContent:{
        display:"flex",
        flexDirection:"column",
        justifyContent:"center",
    },
    button:{
        padding:"5px 5px",
        marginTop:"10px"
    }
  });

export default function NoTask({addToTaskList}) {
    const classes = useStyles();
    const [adding, setAdding] = React.useState(false);

    const setNewTask =(task)=>{
        addToTaskList(task);
        setAdding(false);
    }
    

    if(!adding){
        return (
            <Card className={classes.smallCard}>
                <CardContent className={classes.cardContent}>
                    <Typography variant="h6" color="textSecondary" gutterBottom>
                    You have no task
                    </Typography>
                    <Button
                        variant="contained"
                        color="primary"
                        size="small"
                        className={classes.button}
                        startIcon={<PlusIcon />}
                        onClick={()=>{setAdding(true)}}
                    >
                        Add Task
                    </Button>
                </CardContent>
            </Card>
        )
    }else{
        return (
            <AddTask setNewTask={setNewTask} />
        )
    }
}
