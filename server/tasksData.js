const fs = require('fs').promises;
const DATA_PATH = './tasks.json';
async function readTasks() 
{
    try
    {
        const data=await fs.readFile(DATA_PATH,'utf-8');
        return JSON.parse(data);
    }

    catch
    {
        return[];
    }
}



async function writeTasks(tasksArray)
 {
  await fs.writeFile(DATA_PATH, JSON.stringify(tasksArray, null, 2));
}







module.exports={readTasks,writeTasks};