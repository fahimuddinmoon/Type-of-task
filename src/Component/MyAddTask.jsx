import { useQuery } from "@tanstack/react-query";
import UseAxios from "./UseAxios";
import CardDetail from "./CardDetail";
import { useContext } from "react";
import { AuthContext } from "./AuthProvider";
import { Link } from "react-router-dom";


const MyAddTask = () => {
    const { user } = useContext(AuthContext)
    const axiosSecure = UseAxios()
    const { data: information = [], isLoading, refetch } = useQuery({
        queryKey: ['information', user],
        queryFn: async () => {
            const { data } = await axiosSecure.get(`/taskAdded/${user?.email}`)
            return data
        }
    })
     const allTask =information.sort((first, second) => new Date(first.deadLine) - new Date(second.deadLine))
   
    return (
        <div className='pt-16 py-12 sm:px-8'>


            {
                allTask.length ?
                    <div>
                        <h3 className="text-2xl font-bold text-center my-16">My Add Task </h3>
                        <div className="lg:grid lg:grid-cols-2 my-12">
                            {
                                allTask.map(data => <CardDetail key={data._id} data={data} refetch={refetch}></CardDetail>)
                            }
                        </div>
                    </div>
                    :
                    <div className="flex flex-col items-center min-h-screen justify-center text-center p-8 text-gray-500">
                        <div className="text-6xl mb-4">📭</div>
                        <h2 className="text-xl font-semibold">No Data Found</h2>
                        <p className="text-sm mt-2">There’s nothing here yet. Please check back later.</p>
                        <Link to="/" className="btn mt-4">Back</Link>
                    </div>
            }
        </div>
    );
};

export default MyAddTask;