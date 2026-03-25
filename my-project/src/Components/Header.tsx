import {Link} from "react-router-dom";
// import {useAppSelector} from "../app/store.ts";
import {ThemeToggleButton} from "../admin/components/common/ThemeToggleButton.tsx";

function Header() {
    //const user =
    //    useAppSelector(redux => redux.auth.user);
    //console.log(user)
    return (
        <header>
            <nav className="bg-white border-gray-200 px-4 lg:px-6 py-2.5 dark:bg-gray-900">
                <div className="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl">

                    <div className="flex items-center">
                        <ThemeToggleButton></ThemeToggleButton>
                        <h1 className="self-center font-semibold whitespace-nowrap p-3 dark:text-white">
                            PyReact
                        </h1>
                    </div>
                    <div className="justify-between items-center w-full sm:flex sm:w-auto ">
                        <ul className="flex flex-col mt-4 font-medium sm:flex-row sm:space-x-8 sm:mt-0">
                            <Link to="/" className="font-semibold hover:text-gray-200 flex items-center font-medium dark:text-white">
                                Міста
                            </Link>
                            <Link to="/add-city" className="font-semibold hover:text-gray-200 flex items-center font-medium dark:text-white">
                                Додати місто
                            </Link>
                        </ul>
                    </div>
                    <div className="flex items-center gap-4">
                        <Link to="/login" className="px-6 py-2 rounded-lg font-semibold text-white
                                bg-gradient-to-r from-gray-500 to-gray-600
                                hover:from-gray-600 hover:to-white-700
                                shadow-md transition-transform transform hover:scale-105">
                            Увійти
                        </Link>
                        <Link to="/register" className="px-6 py-2 rounded-lg font-semibold text-white
                                bg-gradient-to-r from-blue-500 to-indigo-600
                                hover:from-blue-600 hover:to-indigo-700
                                shadow-md transition-transform transform hover:scale-105">
                            Зареєструватись
                        </Link>
                    </div>
                </div>
            </nav>
        </header>
    );
}

export default Header;
