import { useNavigate } from "react-router-dom";
import {useDeleteDepartmentMutation, useGetDepartmentQuery} from "../../services/departmentApi.ts";


function DepartmentsList() {

    const navigate = useNavigate();
    const deleteDepartmentHandler = async (id: number) => {
        try {
            await deleteDepartment(id).unwrap();
        } catch (error) {
            console.error("Помилка при видаленні відділення:", error);
        }
    };

    const {data: departments, isLoading, error} = useGetDepartmentQuery();
    const [deleteDepartment] = useDeleteDepartmentMutation();
    if (isLoading)
        return (
            <>Loading ...</>
        );

    return (

        <div className="p-5">
            <h1 className="text-3xl dark:text-white font-bold mb-6 text-center">Список відділень</h1>
            {error && <p className="text-red-600 text-center mb-4">Помилка: {error.toString()}</p>}
            <div className="p-10 bg-transparent min-h-screen">
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10">
                    {Array.isArray(departments) && departments.map(department => (
                        <div key={department.id}
                             className="bg-white/80 dark:bg-slate-900/80 rounded-2xl shadow-xl overflow-hidden transform transition duration-500 hover:scale-105 hover:shadow-xl border border-slate-200/50 dark:border-slate-700/50 hover:shadow-slate-200/20 dark:hover:shadow-slate-900/20"
                        >
                            <div className="relative h-60 w-full overflow-hidden bg-cover bg-center">
                                <div className="absolute inset-0 bg-black/60"></div>
                                <div className="relative z-10 p-6">
                                    <h2 className="mb-3 text-white text-2xl font-semibold tracking-tight text-heading leading-8">
                                        {department.name}
                                    </h2>
                                    <p className="text-body text-white mb-6" dangerouslySetInnerHTML={{ __html: department.description }}></p>
                                    <p className="text-body text-white mb-6">
                                        {department.city_name}
                                    </p>
                                    <p className="text-body text-white mb-6">
                                        {department.user_name}
                                    </p>
                                    <p className="text-body text-gray-400 mb-6">
                                        {department.created_at}
                                    </p>

                                </div>
                            </div>
                            <div className="p-6 text-center">
                                <button type="button"
                                        onClick={() =>{
                                            console.log("delete item", department.id);
                                            deleteDepartmentHandler(department.id);
                                        }}
                                        className="mt-2 px-5 py-2 text-sm font-semibold rounded-lg bg-red-600 hover:bg-red-700 cursor-pointer text-white transition-colors shadow-md"
                                >
                                    Delete
                                </button>
                                <button
                                    type="button"
                                    onClick={() => {
                                        navigate(`/edit-department/${department.id}`);
                                    }}
                                    className="mt-2 ml-2 px-5 py-2 text-sm font-semibold rounded-lg bg-amber-300 hover:bg-amber-400 cursor-pointer text-black transition-colors shadow-md"
                                >
                                    Edit
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default DepartmentsList;