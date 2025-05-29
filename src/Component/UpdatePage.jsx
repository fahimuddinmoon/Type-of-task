import { useNavigate, useParams } from "react-router-dom";
import UseAxios from "./UseAxios";
import { useQuery } from "@tanstack/react-query";
import { useContext } from "react";
import { AuthContext } from "./AuthProvider";
import Swal from "sweetalert2";


const UpdatePage = () => {
    const { id } = useParams()
    const { user } = useContext(AuthContext)
    const navigate = useNavigate()
    const axiosSecure = UseAxios()
    const { data: allData = [], isLoading, refetch } = useQuery({
        queryKey: ['allData', id],
        queryFn: async () => {
            const { data } = await axiosSecure.get(`/taskAdded/single/${id}`)
            return data
        }
    })
    const { category, description, deadLine, email, time, title, _id } = allData
    const handleUpdate = async (e) => {
        e.preventDefault()
        const title = e.target.title.value
        const description = e.target.description.value
        const deadLine = e.target.deadLine.value
        const email = user?.email
        if (title.length < 50) {
            return Swal.fire({
                title: 'Title Must Be At Least 200 Character Long!',
                icon: "error",
                draggable: true
            });
        }
        const task = { title, description, deadLine, email }

        try {
            await axiosSecure.put(`/UpdateTask/${_id}`, task)
            Swal.fire({
                title: "Updated Successfully!",
                icon: "success",
                draggable: true
            });
        } catch {

        } finally {
            navigate('/myAddTask')
            refetch()
            
        }

    }

    return (
        <div className="pt-16">
            <h4 className="text-2xl font-bold text-center my-6">update</h4>
            <div className="w-10/12 mx-auto text-black ">
                <div className="card  w-8/12 mx-auto my-28 shrink-0 ">
                    <form onSubmit={handleUpdate}>
                        <fieldset className="fieldset">
                            <label className=" fieldset-label">Title</label>
                            <input required type="text" defaultValue={title} name="title" className="input w-full" />
                            <label className=" fieldset-label">Description</label>
                            <input required type="text" defaultValue={description} name="description" className="input w-full" />

                            {
                                deadLine && <div>
                                    <label className=" fieldset-label text-sm font-bold text-gray-700">Task Deadline</label>
                                    <input type="date" defaultValue={deadLine} name="deadLine" className="input w-full" required placeholder="Deadline" />
                                </div>
                            }



                            <button className="btn btn-primary mt-4">Update Task</button>
                        </fieldset>
                    </form>

                </div>


            </div>
        </div>
    );
};

export default UpdatePage;