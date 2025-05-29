import { useContext } from "react";
import AllTask from "./AllTask";
import Banner from "./Banner";
import { AuthContext } from "./AuthProvider";
import { useQuery } from "@tanstack/react-query";
import UseAxios from "./UseAxios";


const Home = () => {
     const { user } = useContext(AuthContext)
        const axiosSecure = UseAxios()
        const { data: infos = {},isPending, refetch } = useQuery({
            queryKey: ['infos', user],
            queryFn: async () => {
                const { data } = await axiosSecure.get(`/Change/${user?.email}`)
                return data
            }
        })
        refetch()
    return (
        <div  className={infos?.mode === 'dark'?'bg-black text-white pt-20 px-2 sm:px-10':'pt-20 px-2 sm:px-10' || infos.mode === 'light'?'pt-20 px-2 sm:px-10':'pt-20 px-2 sm:px-10'}>
            <Banner></Banner>
            <AllTask></AllTask>
        </div>
    );
};

export default Home;