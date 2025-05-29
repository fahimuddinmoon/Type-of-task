import { useContext } from "react";
import { AuthContext } from "./AuthProvider";
import UseAxios from "./UseAxios";
import { useQuery } from "@tanstack/react-query";
import { CiEdit } from "react-icons/ci";
import { MdDeleteForever } from "react-icons/md";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";
const MyAddGoal = () => {
    const { user } = useContext(AuthContext)
    const axiosSecure = UseAxios()
    const { data: goals = [], isLoading, refetch } = useQuery({
        queryKey: ['goals', user],
        queryFn: async () => {
            const { data } = await axiosSecure.get(`/GoalAdded/${user?.email}`)
            return data
        }
    })
    const allGoals = goals.sort((first, second) => new Date(second.year) - new Date(first.year))
    const handleDelete = (id) => {
        try {
           Swal.fire({
                title: "Are you sure?",
                text: "Are You Sure? You Delete This Goal!",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "Yes, Delete it!"
            }).then(async (result) => {
                if (result.isConfirmed) {
                    await axiosSecure.delete(`/GoalDelete/${id}`)
                    Swal.fire({
                        title: "Deleted This Goal!",
                        icon: "success",
                        draggable: true
                    });
                    refetch()
                }
            });
        }
        catch {

        }
        finally {
            refetch()
        }
    }
    const handleEdit = (id) => {
        try {

        }
        catch {

        }
        finally {
            refetch()
        }
    }
    return (
        <div className="pt-16 py-12 px-8 min-h-screen">
            <h3 className="text-2xl font-bold text-center my-16">My Add Goal </h3>
            <div className=" my-12">
                <div className="overflow-x-auto rounded-box border border-black ">
                    <table className="table">
                        {/* head */}
                        <thead>
                            <tr>
                                <th className="text-gray-500">Monthly Goal</th>
                                <th className="text-gray-500">Month & Year</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {/* row 1 */}
                            {
                                allGoals.map(goal =>
                                    <tr key={goal._id}>
                                        <th>{goal.goal}</th>
                                        <th>{goal.month},{goal.year}</th>
                                        <td className="">
                                            <p  onClick={() => handleEdit(goal._id)} className="text-2xl bg-black text-white p-1 rounded-lg my-1 "><Link to={`/goalUpdatePage/${goal._id}`}><CiEdit /></Link></p>
                                            <p onClick={() => handleDelete(goal._id)} className="text-2xl bg-black text-white p-1 rounded-lg my-1"><MdDeleteForever /></p>
                                        </td>
                                    </tr>
                                )
                            }

                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};
// className={information.length < 3 ? 'h-screen pt-16 py-12 px-8':'pt-16 py-12 px-8'}
export default MyAddGoal;
