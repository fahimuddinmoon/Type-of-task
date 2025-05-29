import { Outlet } from "react-router-dom";
import Navber from "./Navber";
import Footer from "./Footer";
import { useContext } from "react";
import { AuthContext } from "./AuthProvider";
import UseAxios from "./UseAxios";
import { useQuery } from "@tanstack/react-query";



const MainLayout = () => {
    const { user } = useContext(AuthContext)
    const axiosSecure = UseAxios()
    const { data: infos = {},isPending, refetch } = useQuery({
        queryKey: ['infos', user],
        queryFn: async () => {
            const { data } = await axiosSecure.get(`/Change/${user?.email}`)
            return data
        }
    })
   
    console.log(infos?.mode)
    return (
        <div className={infos?.mode === 'dark'?'bg-black text-white ':'' || infos.mode === 'light'?'':''}>
            <div>
                <Navber></Navber>
            </div>
            <div className="">
                <Outlet></Outlet>
            </div>
            <div>
             <Footer mode={infos.mode}></Footer>
            </div>
         
        </div>
    );
};

export default MainLayout;