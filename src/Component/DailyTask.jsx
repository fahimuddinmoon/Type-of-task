import { useQuery } from "@tanstack/react-query";
import UseAxios from "./UseAxios";
import Card from "./Card";
import { format } from "date-fns";



const DailyTask = () => {
    const axiosSecure = UseAxios()
    const date = new Date()
    const today = format(date, 'yyyy-MM-dd')
    const { data: tasks = [], isLoading, refetch } = useQuery({
        queryKey: ['tasks'],
        queryFn: async () => {
            const { data } = await axiosSecure.get('/taskAdded')
            return data
        }
    })
   
    const AllTasks = tasks.filter(task => task?.deadLine === today)

    return (
        <div className='pt-16 py-12 px-2 sm:px-8 min-h-screen'>
            {
                AllTasks.length ?
                    <div>
                        <h3 className="text-4xl font-bold text-center my-16"> Daily Task </h3>
                        <div className="lg:grid lg:grid-cols-2 my-5">
                            {
                                AllTasks.map(data => <Card key={data._id} data={data} refetch={refetch}></Card>)
                            }
                        </div>
                    </div>
                    :
                    <div className="flex flex-col items-center min-h-screen justify-center text-center p-8 text-gray-500">
                        <div className="text-6xl mb-4">📭</div>
                        <h2 className="text-xl font-semibold">No Data Found</h2>
                        <p className="text-sm mt-2">There’s nothing here yet. Please check back later.</p>

                    </div>
            }
        </div>
    );
};

export default DailyTask;