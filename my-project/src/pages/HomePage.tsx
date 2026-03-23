import { useEffect, useState } from "react";
import axios, {type AxiosError} from "axios";
import { useNavigate } from "react-router-dom";
import APP_ENV from "../env";
import type { ICity } from "../interfaces/City/ICity.ts";

function HomePage() {
    const [cities, setCities] = useState<ICity[]>([]);
    const [error, setError] = useState<string | null>(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchCities = async () => {
            try {
                const response = await axios.get<ICity[]>(`${APP_ENV.API_BASE_URL}/api/cities/`);
                setCities(response.data);
            } catch (err) {
                const error = err as AxiosError;
                setError(error.message);
                console.error("Помилка при отриманні міст:", error);
            }
        };
        fetchCities();
    }, []);

    const deleteCity = async (id: number) => {
        try {
            await axios.delete(`${APP_ENV.API_BASE_URL}/api/cities/${id}/`);
            setCities(prev => prev.filter(c => c.id !== id));
        } catch (error) {
            console.error("Помилка при видаленні країни:", error);
        }
    };

    return (
        <div className="p-5">
            <h1 className="text-3xl dark:text-white font-bold mb-6 text-center">Список міст</h1>
            {error && <p className="text-red-600 text-center mb-4">Помилка: {error}</p>}
        <div className="p-10 bg-transparent min-h-screen">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10">
                {Array.isArray(cities) && cities.map(city => (
                    <div
                        key={city.id}
                        className="bg-white/80 dark:bg-slate-900/80 rounded-2xl shadow-xl overflow-hidden transform transition duration-500 hover:scale-105 hover:shadow-xl border border-slate-200/50 dark:border-slate-700/50 hover:shadow-slate-200/20 dark:hover:shadow-slate-900/20"
                    >
                        <div className="relative h-60 w-full overflow-hidden">
                            <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
                            <div className="relative z-10 p-6">
                                <h2 className="mb-3 dark:text-white text-2xl font-semibold tracking-tight text-heading leading-8">
                                    {city.name}
                                </h2>
                                <p className="text-body dark:text-white mb-6" dangerouslySetInnerHTML={{ __html: city.description }}></p>
                            </div>
                        </div>
                        <div className="p-6 text-center">
                            <button type="button"
                                onClick={() => deleteCity(city.id)}
                                className="mt-2 px-5 py-2 text-sm font-semibold rounded-lg bg-red-600 hover:bg-red-700 cursor-pointer text-white transition-colors shadow-md"
                            >
                                Delete
                            </button>
                            <button
                                type="button"
                                onClick={() => {
                                    navigate(`/edit-city/${city.id}`);
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

export default HomePage;
