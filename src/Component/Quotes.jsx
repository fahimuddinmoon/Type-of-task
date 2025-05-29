import { useQuery } from "@tanstack/react-query";
import UseAxios from "./UseAxios";
import Loading from "./Loading";


const Quotes = () => {
    const axiosSecure = UseAxios()
    const { data: allQuotes = {}, isLoading, refetch } = useQuery({
        queryKey: ['allQuotes'],
        queryFn: async () => {
            const { data } = await axiosSecure.get('/api/quote')
            return data
        }
    })
    if (isLoading) return <Loading></Loading>
    console.log(allQuotes)
    return (
        <div >
            <h4 className="text-3xl font-bold text-center my-6">Quotes</h4>
            <div className="border-4 border-gray-500  p-12 h-full text-center rounded-tr-full rounded-bl-full ">
                <h3 className="text-lg text-gray-500 mx-10 sm:mx-5 font-bold">"{allQuotes[0]?.q}"</h3>
                <p className="text-xl font-extrabold">{allQuotes[0]?.a}</p>
            </div>
        </div>
    );
};

export default Quotes;