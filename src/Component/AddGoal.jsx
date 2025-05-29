import { useContext, useState } from "react";
import { AuthContext } from "./AuthProvider";
import UseAxios from "./UseAxios";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";


const AddGoal = () => {
     const navigate = useNavigate()
    const [goalType, setGoalType] = useState('Weekly');
    const handleSelectChange = (event) => {
        setGoalType(event.target.value);
    };
    const { user } = useContext(AuthContext)
    const axiosSecure = UseAxios()
    const handleSubmit = async e => {
        e.preventDefault()
        const goal = e.target.goal.value
        const goalType = e.target.goalType.value
        const year = e.target.year.value
        const month = e.target.month.value
        const time = new Date()
        const email = user?.email

        const task = { goal, goalType, month, time, email,year }

        try {
            await axiosSecure.post('/goalAdded', task)
            Swal.fire({
                title: "Goal Added SuccessFully!",
                icon: "success",
                draggable: true
            });
        } catch {

        } finally {
      navigate('/myAddGoal')
        }
    }
    return (
        <div className="pt-16">
            <h3 className="text-center mt-20 text-3xl font-bold">Add Goal</h3>
            <div className="w-10/12 mx-auto  text-black ">
                <div className="card a w-full sm:w-8/12 mx-auto my-24  ">
                    <form onSubmit={handleSubmit}>
                        <fieldset className="fieldset">

                            <label className="my-1 fieldset-label text-sm font-bold text-gray-700">Goal </label>
                            <input required type="text" name="goal" className="input w-full" placeholder="Title" />

                            <label className="my-1 fieldset-label text-sm font-bold text-gray-700">Goal Type</label>
                            <select type="text" name="goalType" className="input w-full" required placeholder="">
                                <option value="Monthly">Monthly</option>
                            </select>


                            <label className="my-1 fieldset-label text-sm font-bold text-gray-700">Select Month</label>
                            <select type="text" name="month" className="input w-full" required placeholder="">
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

                            <label className="my-1 fieldset-label text-sm font-bold text-gray-700">Year </label>
                            <input required type="number" name="year" className="input w-full" placeholder="Year" />


                            <button className="btn btn-primary mt-4">Add Goal</button>
                        </fieldset>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default AddGoal;