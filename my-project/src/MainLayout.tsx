import { Outlet} from "react-router-dom";
import Header from "./Components/Header.tsx";

export default function mainLayout() {


    return (
        <div className="min-h-screen flex flex-col bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50
            dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 ">
            <Header />
            <main className="flex-1">
                <Outlet />
            </main>
        </div>
    );
}
