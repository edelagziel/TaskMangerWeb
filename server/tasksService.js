const { readTasks, writeTasks } = require('./tasksData');
const { v4: uuidv4 } = require('uuid');




async function addTask(taskData) 
{
  const tasks = await readTasks();  
  const newTask =
  {
    id:uuidv4(),
    title: taskData.title.trim(), 
    description: taskData.description ? taskData.description.trim() : '',  
    status: taskData.status,
    createdAt: new Date().toISOString(), 
    updatedAt: new Date().toISOString()   
  };
  tasks.push(newTask);

  await writeTasks(tasks);

  return newTask;

}


async function updateTask(id, updatedData) {
  const tasks = await readTasks();

  const index = tasks.findIndex(task => task.id === id);

  if (index === -1) {
    throw new Error('Task not found');
  }

  tasks[index].title = updatedData.title.trim();
  tasks[index].description = updatedData.description ? updatedData.description.trim() : '';
  tasks[index].status = updatedData.status;
  tasks[index].updatedAt = new Date().toISOString();

  await writeTasks(tasks);

  return tasks[index];
}






async function GetTaskById(id) {
  const tasks = await readTasks();

  const index = tasks.findIndex(task => task.id === id);

  if (index === -1) {
    throw new Error('Task not found');
  }

  return tasks[index];

}





async function deleteTask(id) {
  const tasks = await readTasks();

  const index = tasks.findIndex(task => task.id === id);

  if (index === -1) {
    throw new Error('Task not found');
  }

  tasks.splice(index, 1);  

  await writeTasks(tasks);
}




module.exports={addTask,updateTask,deleteTask,GetTaskById};
