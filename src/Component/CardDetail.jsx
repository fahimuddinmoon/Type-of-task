import { Link } from "react-router-dom";
import UseAxios from "./UseAxios";
import Swal from "sweetalert2";
import { format } from "date-fns";

const CardDetail = ({ data, refetch }) => {
    const { category, description, email, time,deadLine, title, _id } = data
    const axiosSecure = UseAxios()
    const handleDelete = async (id) => {
        try {
            await axiosSecure.delete(`/taskDelete/${id}`)
            Swal.fire({
                title: 'Deleted Successfully',
                icon: "success",
                draggable: true
            });
        } catch {

        } finally {
            refetch()
        }
    }

    return (
        <div className="m-3 border-2 border-gray-400 p-3 rounded-lg shadow-2xl">
            <div className="flex justify-between items-center">
                <div>
                    <h2 className="text-sm font-bold ">Email : - {email}</h2>
                    <h2 className="text-sm font-bold "> Deadline:  {format(new Date(deadLine), 'PPPP')}</h2>
                </div>
                <p className={
                    category === 'In-Complete' && 'text-sm font-bold  p-2 border-2 border-gray-500 text-orange-600 rounded-2xl' ||
                    category === 'Complete' && 'text-sm font-bold  p-2 border-2 border-gray-500 text-blue-600 rounded-2xl'
                }>{category}</p>
            </div>
            <p className="text-lg font-bold "> Title : - {title}</p>
            <p title={description} className="text-sm font-bold "> Description : - {description} </p>
            <div className="flex justify-between items-center mt-4 ">
                <button onClick={() => handleDelete(_id)} className="btn bg-red-500 text-white text-sm font-bold rounded-2xl">Delete</button>
                {
                    category === 'Done' ?
                        <p className="text-sm font-bold ">Complete Task</p> :
                        <button className="btn bg-blue-500 text-white text-sm font-bold rounded-2xl"><Link to={`/update/${_id}`}> Update </Link></button>

                }

            </div>
        </div>
    );
};

export default CardDetail;