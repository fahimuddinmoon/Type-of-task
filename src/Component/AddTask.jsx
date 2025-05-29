import { useContext } from "react";
import { AuthContext } from "./AuthProvider";
import UseAxios from "./UseAxios";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";


const AddTask = () => {
     const navigate = useNavigate()
    const { user } = useContext(AuthContext)
    const axiosSecure = UseAxios()
    const handleSubmit = async e => {
        e.preventDefault()
        const title = e.target.title.value
        const description = e.target.description.value
        const deadLine = e.target.deadLine.value
        const time = new Date()
        const category = 'In-Complete'
        const email = user?.email
        if (title.length < 50) {
            return Swal.fire({
                title: 'Title Must Be At Least 200 Character Long!',
                icon: "error",
                draggable: true
            });
        }
        const task = { title, description, time, category, email,deadLine }

        try {
            await axiosSecure.post('/taskAdded', task)
            Swal.fire({
                title: "Task Added SuccessFully!",
                icon: "success",
                draggable: true
            });
        
        } catch {

        } finally {
          navigate('/myAddTask')
        }
    }
    return (
        <div className="pt-16">
            <h3 className="text-center mt-20 text-3xl font-bold">Add Task</h3>
            <div className="w-11/12 mx-auto  text-black ">
                <div className="card  w-full sm:w-8/12 mx-auto my-24  ">
                    <form onSubmit={handleSubmit}>
                        <fieldset className="fieldset">
                            <label className=" fieldset-label  text-sm font-bold text-gray-700">Title</label>
                            <input required type="text" name="title" className="input w-full" placeholder="Title" />
                            <label className=" fieldset-label  text-sm font-bold text-gray-700">Description</label>
                            <input required type="text" name="description" className="input w-full" placeholder="Description" />
                            <label className=" fieldset-label text-sm font-bold text-gray-700">Task Deadline</label>
                            <input type="date" name="deadLine" className="input w-full" required placeholder="Deadline" />
                            <button className="btn btn-primary mt-4">Add Task</button>
                        </fieldset>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default AddTask;