const express = require('express');
const logger=require("./logger");
const errorHandler = require('./errorHandler');
const tasksData = require('./tasksData');
const { addTask,updateTask,deleteTask,GetTaskById } = require('./tasksService');
const cors = require('cors');



const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());


app.use(express.json());

app.use(logger);


app.get('/tasks',async (req, res,next) => 
{
    try
    {
        console.log('GET /tasks called');
        const data=await tasksData.readTasks();
        res.json(data);
    }
   catch (err) { 
  next(err);
}
 
});

app.get('/tasks/:id',async (req, res,next) =>
     {
        try
        {
            console.log(`GET /tasks/${req.params.id} called`);
            const data=await GetTaskById(req.params.id);
            res.json(data); 
        }
        catch (err)
        { 
            next(err);
        }


    });

app.post('/tasks', async(req, res,next) => 
{
    try
    {
        console.log('POST /tasks called');
        const newTask=await addTask(req.body);
        res.status(201).json(newTask);
    }
    catch(err)
    {
        next(err);
    }

});

app.put('/tasks/:id', async(req, res,next) => 
{
  try
  {
        console.log(`PUT /tasks/${req.params.id} called`);
        const updatedData= await updateTask(req.params.id,req.body);
        res.status(200).json(updatedData);
  }
  catch(err)
  {
    next(err);
  }
});

app.delete('/tasks/:id',async(req, res,next) =>
{
    try
    {
        console.log(`DELETE /tasks/${req.params.id} called`);
        await deleteTask(req.params.id);
        res.status(200).json({message: 'Task deleted successfully.'});
    }

    catch(err) 
  {
    next(err);
  }
  
});



app.use(errorHandler);


app.listen(PORT, () => {
  console.log(`Server listening on  http://localhost:${PORT}`);
});



