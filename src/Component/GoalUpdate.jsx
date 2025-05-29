import { useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import UseAxios from "./UseAxios";
import { useQuery } from "@tanstack/react-query";
import { AuthContext } from "./AuthProvider";
import Swal from "sweetalert2";


const GoalUpdate = () => {
    const { id } = useParams()
    const { user } = useContext(AuthContext)
    const navigate = useNavigate()
    const axiosSecure = UseAxios()
    const { data: allGoals = [], isLoading, refetch } = useQuery({
        queryKey: ['allGoals', id],
        queryFn: async () => {
            const { data } = await axiosSecure.get(`/GoalAdded/single/${id}`)
            return data
        }
    })
    console.log(allGoals)
    const { email, goal, goalType, month, time, year, _id } = allGoals
    const handleUpdate = async (e) => {
        e.preventDefault()
       const goal = e.target.goal.value
        const goalType = e.target.goalType.value
        const year = e.target.year.value
        const month = e.target.month.value
       
        const UpdateData = { goal,goalType,year,month, email }

        try {
            await axiosSecure.put(`/GoalUpdate/${_id}`, UpdateData)
            Swal.fire({
                title: "Updated Successfully!",
                icon: "success",
                draggable: true
            });
        } catch {

        } finally {
            navigate('/myAddGoal')
            refetch()

        }

    }
    return (
        <div className="pt-16">
            <h3 className="text-center mt-20 text-3xl font-bold">Update Goal</h3>
            <div className="w-10/12 mx-auto  text-black ">
                <div className="card  w-full sm:w-8/12 mx-auto my-24  ">
                    <form onSubmit={handleUpdate}>
                        <fieldset className="fieldset">

                            <label className="my-1 fieldset-label text-sm font-bold text-gray-700">Goal </label>
                            <input required type="text" name="goal" className="input w-full" defaultValue={goal} />

                            <label className="my-1 fieldset-label text-sm font-bold text-gray-700">Goal Type</label>
                            <select type="text" name="goalType" className="input w-full" defaultValue={goalType} required placeholder="">
                                <option value="Monthly">Monthly</option>
                            </select>

                            {
                                month &&
                                <div>
                                    <label className="my-1 fieldset-label text-sm font-bold text-gray-700">Select Month</label>
                                    <select type="text" name="month" className="input w-full" defaultValue={month} required placeholder="">
                                        <option value="January">January</option>
                                        <option value="February">February</option>
                                        <option value="March">March</option>
                                        <option value="April">April</option>
                                        <option value="May">May</option>
                                        <option value="June">June</option>
                                        <option value="July">July</option>
                                        <option value="August">August</option>
                                        <option value="September">September</option>
                                        <option value="October">October</option>
                                        <option value="November">November</option>
                                        <option value="December">December</option>
                                    </select>

                                </div>
                            }

                            <label className="my-1 fieldset-label text-sm font-bold text-gray-700">Year </label>
                            <input required type="number" name="year" defaultValue={year} className="input w-full" placeholder="Year" />


                            <button className="btn btn-primary mt-4">Update Goal</button>
                        </fieldset>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default GoalUpdate;