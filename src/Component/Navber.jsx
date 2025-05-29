import { useContext } from "react";
import { Link, NavLink } from "react-router-dom";
import { AuthContext } from "./AuthProvider";
import UseAxios from "./UseAxios";
import { useQuery } from "@tanstack/react-query";


const Navber = () => {
    const { user, logout } = useContext(AuthContext)
    const axiosSecure = UseAxios()
    const { data: infos = {}, refetch } = useQuery({
        queryKey: ['infos', user],
        queryFn: async () => {
            const { data } = await axiosSecure.get(`/Change/${user?.email}`)
            return data
        }
    })

  

    const handlelight = async (id) => {

        try {

            await axiosSecure.patch(`/mode/update/${id}`)

        } catch {
            
        } finally {
           await refetch()
         
        }


    }

    const handledark = async (id) => {

        try {
            await axiosSecure.patch(`/mode/update/light/${id}`)

        } catch {

        } finally {
           await refetch()
           
        }


    }
    return (
        <div className={infos?.mode === 'dark'?'navbar bg-gray-800 text-white fixed pb-2  z-50 sm:px-10': 'navbar bg-gray-400 text-black fixed pb-2  z-50 sm:px-10'}>
            <div className="navbar-start p-0 m-0">

                <div >
                    <div className={infos?.mode === 'dark' ? 'bg-black text-white drawer' : 'drawer' || infos.mode === 'light' ? 'drawer' : 'drawer'}>
                        <input id="my-drawer" type="checkbox" className="drawer-toggle" />
                        <div className="drawer-content">
                            {/* Page content here */}
                            <label htmlFor="my-drawer" className="sm:btn drawer-button">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-6 w-6 sm:h-10 sm:w-10"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor">
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M4 6h16M4 12h8m-8 6h16" />
                                </svg>
                            </label>
                        </div>
                        <div className="drawer-side z-10">
                            <label htmlFor="my-drawer" aria-label="close sidebar" className="drawer-overlay"></label>
                            <ul className={infos.mode === 'dark' ? "menu bg-black text-white min-h-full w-80 p-4" : "menu bg-white text-black min-h-full w-80 p-4"}>
                                {/* Sidebar content here */}
                                <NavLink to='/' className='text-sm font-bold mx-2 py-2 px-3 '>Home</NavLink>
                                <NavLink to='/dailyTask' className='text-sm font-bold mx-2 py-2 px-3 '>Daily Task</NavLink>
                                <NavLink to='/addGoal' className='text-sm font-bold  mx-2 py-2 px-3'>Add Goal</NavLink>
                                <NavLink to='/addTask' className='text-sm font-bold  mx-2 py-2 px-3'>Add Task</NavLink>
                                <NavLink to="/myAddTask" className='text-sm font-bold  mx-2 py-2 px-3'>My Add Task</NavLink>
                                <NavLink to="/myAddGoal" className='text-sm font-bold  mx-2 py-2 px-3'>My Add Goal</NavLink>
                            </ul>
                        </div>
                    </div>
                </div>
                <Link to='/' className="  text-sm font-bold ml-3 sm:text-3xl sm:font-extrabold">Task Track Web</Link>
            </div>
            <div className="navbar-end pt3">

                {
                    user ?
                        <span className='flex justify-center items-center'>
                            <div className="dropdown dropdown-end justify-center items-center">
                                <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                                    <div className="w-10 hidden sm:block rounded-full ">
                                        <img

                                            referrerPolicy='noreferrer'
                                            title={user?.displayName}
                                            alt=""
                                            src={user?.photoURL} />
                                    </div>
                                </div>
                                <ul
                                    tabIndex={0}
                                    className={infos?.mode === 'dark'?'menu menu-sm dropdown-content bg-black text-white rounded-box z-[1] pt3 w-20 p-2 shadow':"menu menu-sm dropdown-content bg-white rounded-box z-[1] pt3 w-20 p-2 shadow"}>
                                    <li> <button className="font-bold"  onClick={() => handlelight(infos?._id)}>Dark</button ></li>
                                    <li> <button className="font-bold" onClick={() => handledark(infos?._id)}>Light</button></li>
                                </ul>
                            </div>
                            <Link onClick={logout} className="btn mx-1 text-sm font-bold text-gray-600">log Out</Link>
                        </span>
                        :
                        <Link to='/login' className="btn  text-sm font-bold text-gray-600">login</Link>
                }




            </div>
        </div>
    );
};

export default Navber;