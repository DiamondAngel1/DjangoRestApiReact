import {useState} from "react";
import {useNavigate} from "react-router-dom";
import type {ICityCreate} from "../../types/city/ICityCreate";
import {Editor} from "@tinymce/tinymce-react";
import {useCreateCityMutation} from "../../services/cityApi.ts";

function AddCityPage() {
    const [name, setName] = useState("");
    const [description, setDescription] = useState<string>("");
    const [createCategory] = useCreateCityMutation();

    const [showEditor, setShowEditor] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const model : ICityCreate = {
                name,
                description,
            };
            await createCategory(model).unwrap();
            // await axios.post(`${APP_ENV.API_BASE_URL}/api/cities/`, model, {
            //     headers: { "Content-Type": "application/json" },
            // });
            navigate(-1);
        } catch (err) {
            console.log(err);
            // if (axios.isAxiosError(err) && err.response?.data?.errors) {
            //     setErrors(err.response.data.errors);
            // } else {
            //     setErrors({ General: ["Помилка при додаванні міста"] });
            // }
        }
    };

    return (
        <div className="flex justify-center items-center bg-transparent flex-col p-6">
            <h1 className="text-2xl font-bold mb-6 text-center text-gray-800 dark:text-white">
                Додати місто
            </h1>
            <form
                onSubmit={handleSubmit}
                className="bg-white dark:bg-slate-900 shadow-lg rounded-xl p-8 w-full max-w-xl
                 border border-gray-200 dark:border-slate-700"
            >


                {/*{errors.General && (*/}
                {/*    <p className="text-red-600 mb-4 text-center font-medium">{errors.General[0]}</p>*/}
                {/*)}*/}



                <div className="mb-5">
                    <label className="block text-sm font-medium text-gray-700 dark:text-slate-300 mb-1">
                        Назва
                    </label>
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full border border-gray-300 dark:border-slate-600 rounded-lg px-4 py-2 focus:ring-2 focus:ring-green-400 focus:border-green-400 dark:bg-slate-800 dark:text-white transition"
                    />
                    {/*{errors.Name && <p className="text-red-600 text-sm">{errors.Name[0]}</p>}*/}
                </div>

                <div className="mb-5">
                    <label className="block text-sm font-medium text-gray-700 dark:text-slate-300 mb-1">
                        Опис
                    </label>
                    <div
                        onClick={() => setShowEditor(true)}
                        className="w-full border border-gray-300 dark:border-slate-600 rounded-lg px-4 py-2 bg-gray-50 dark:bg-slate-800 cursor-pointer"
                    >
                        {description ? (
                            <div
                                className="prose dark:prose-invert max-w-none"
                                dangerouslySetInnerHTML={{ __html: description }}
                            />
                        ) : (
                            <span className="text-gray-400 dark:text-slate-500">Натисніть, щоб додати опис...</span>
                        )}
                    </div>
                    {/*{errors.Description && (*/}
                    {/*    <p className="text-red-600 text-sm">{errors.Description[0]}</p>*/}
                    {/*)}*/}
                </div>


                <button
                    type="submit"
                    className="w-full btn rounded-lg px-6 py-2 text-white bg-gradient-to-r from-cyan-400 via-cyan-500 to-cyan-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-base px-4 py-2.5 text-center leading-5"
                >
                    Зберегти
                </button>
            </form>
            {showEditor && (
                <div className="fixed inset-0 bg-black/50 dark:bg-black/70 flex items-center justify-center z-50">
                    <div className="bg-white dark:bg-slate-900 rounded-lg shadow-lg w-full max-w-3xl p-6 border border-gray-200 dark:border-slate-700">
                        <Editor
                            apiKey='0xky1zwyw6l6500xb89qg355iwjolt8lpsq5kx8it0rl3c71'
                            value={description}
                            onEditorChange={(content) => setDescription(content)}
                            init={{
                                height: 400,
                                menubar: true,
                                plugins: [
                                    "advlist", "autolink", "lists", "link", "image", "charmap", "preview", "anchor",
                                    "searchreplace", "visualblocks", "code", "fullscreen",
                                    "insertdatetime", "media", "table", "code",
                                ],
                                toolbar:
                                    "undo redo | formatselect | bold italic backcolor |\
                                    alignleft aligncenter alignright alignjustify | \
                                    bullist numlist outdent indent | removeformat | image",
                                skin: document.documentElement.classList.contains("dark")?"oxide-dark" : "oxide",
                                content_css: document.documentElement.classList.contains("dark")?"dark":"default"
                            }}
                        />
                        <div className="flex justify-end mt-4">
                            <button
                                onClick={() => setShowEditor(false)}
                                className="px-6 py-2 rounded-lg btn rounded-full px-6 py-2 text-white bg-gradient-to-r from-cyan-400 via-cyan-500 to-cyan-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-base px-4 py-2.5 text-center leading-5"
                            >
                                Зберегти опис
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default AddCityPage;