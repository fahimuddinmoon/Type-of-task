import Swal from "sweetalert2";
import UseAxios from "./UseAxios";
import { format } from "date-fns";

const Card = ({ data, refetch }) => {
    const { category, description, email, deadLine, title, _id } = data
    const axiosSecure = UseAxios()
    const handleProgress = async (id) => {
        try {
            await axiosSecure.patch(`/category/update/${id}`)
            Swal.fire({
                title: 'Task Complete successfully!',
                icon: "success",
                draggable: true
            });
        } catch {

        } finally {
            refetch()
        }
    }


    return (
        <div className="sm:m-3 my-3 border-2 border-gray-400 p-3 rounded-lg shadow-xl">
            <div className="flex justify-between items-center">
                <div>
                    <h2 className="text-sm font-bold ">Email : - {email}</h2>
                    <h2 className="text-sm font-bold "> Deadline:  {format(new Date(deadLine), 'PPPP')}</h2>
                </div>
                <p className={
                    category === 'In-Complete' && 'text-sm font-bold  p-2 border-gray-500 border-2 text-orange-600 rounded-2xl' ||
                    category === 'Complete' && 'text-sm font-bold  p-2 border-gray-500 border-2 text-blue-600 rounded-2xl'
                }>{category}</p>
            </div>
            <p className="text-lg font-bold "> Title : - {title}</p>
            <p title={description} className="text-sm font-bold "> Description : - {description.slice(0, 100)} .....</p>
            <div className="flex justify-evenly items-center my-2">
                {
                    category === 'In-Complete' &&
                    <button onClick={() => handleProgress(_id)} className="btn bg-blue-500 text-white text-sm font-bold rounded-2xl">Complete Task</button>
                }
                {
                    category === 'Complete' &&
                    <p className="text-sm font-bold ">Complete Task</p>
                }


            </div>
        </div>
    );
};

export default Card;