const router = require('express').Router();
const taskController = require('../controllers/task');

router.get('/',(req,res)=>{
    const userId = req.user.id;
    
    taskController.list(userId).then((response)=>{
        res.json({status:true, tasks:response});
    })
    .catch(()=>{
        res.json({status:false, message:"Something went wrong"});
    });
});

router.post('/',(req,res)=>{
    const name = req.body.name;
    const userId = req.user.id;
    console.log(name, userId)
    
    taskController
    .create(userId, name)
    .then(function(response){
        res.json({
            status: true,
            message: "Task Created",
            task: response
        })
    })
    .catch((errorResponse)=>{
        res.json(errorResponse);
    })

});

router.delete('/:id', async (req,res)=>{
    const taskId = req.params.id;
    const response = await taskController.remove(taskId);

    res.json(response);
});

router.put('/:id', async (req,res)=>{
    const taskId = req.params.id;
    const name = req.body.name;
    const isCompleted = req.body.isCompleted;
    
    taskController.set(taskId, name, isCompleted).then((response)=>{
        res.json({status:true, task:response});
    }).catch(()=>{
        res.json({status:false, message:"Unable to set task"});
    });
})

module.exports = router;