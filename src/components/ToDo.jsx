import { useEffect, useState } from "react";
import supabase from "../supabase-client";

function ToDo({session}) {
    const [newTask, setNewTask] = useState({title:'', description:''});
    const [tasks, setTasks] = useState([]);
    const [newDescription, setNewDescription] = useState('');

    const handleSubmit = async (e)=>{
        e.preventDefault();
        const {error}=await supabase.from('tasks').insert({...newTask, email: session.user.email}).single();
        if(error){
            console.error(error.message);
        }
        setNewTask({title:'', description:''});
        fetchTasks();
    }

    const deleteTask = async (id)=>{
        const {error}=await supabase.from('tasks')
            .delete()
            .eq("id", id)
            .eq("email", session.user.email);
        if(error){
            console.error('Error deleting task: ', error.message);
        }
        await fetchTasks();
    }

    const updateTask = async (id)=>{
        const {error}=await supabase.from('tasks')
            .update({description: newDescription})
            .eq("id", id)
            .eq("email", session.user.email);
        if(error){
            console.error('Error updating task: ', error.message);
        }
        await fetchTasks();
        setNewDescription('');
    }

    const fetchTasks = async () => {
        const {data, error} = await supabase.from('tasks')
            .select('*')
            .eq('email', session.user.email)
            .order('created_at', {ascending: false});
        if(error){
            console.error('Error fetching tasks: ', error.message);
        } else {
            setTasks(data || []);
        }
    };

    useEffect(()=>{
        fetchTasks();
    },[]);

    return (
        <div className="App">
            <h1>Todo App</h1>
            <form onSubmit={handleSubmit}>
                <input type="text" placeholder="Title" value={newTask.title} onChange={e=>setNewTask({...newTask, title: e.target.value})} required />
                <input type="text" placeholder="Description" value={newTask.description} onChange={e=>setNewTask({...newTask, description: e.target.value})} required />
                <button type="submit">Add Task</button>
            </form>
            <ul>
                {tasks.map(task => (
                    <li key={task.id}>
                        <div className="task-content">
                            <strong>{task.title}</strong>: {task.description}
                        </div>
                        <div className="task-actions">
                            <input type="text" placeholder="New Description" value={newDescription} onChange={e=>setNewDescription(e.target.value)} />
                            <button onClick={()=>updateTask(task.id)}>Update</button>
                            <button onClick={()=>deleteTask(task.id)}>Delete</button>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default ToDo;