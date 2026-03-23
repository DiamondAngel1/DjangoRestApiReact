import './App.css'
import { Routes, Route } from "react-router-dom";
import MainLayout from "./MainLayout.tsx"
import HomePage from "./pages/HomePage.tsx";
import AddCity from "./pages/Cities/AddCity.tsx";
import EditCity from "./pages/Cities/EditCity.tsx";


function App() {
    return (
        <Routes>
            <Route path="/" element={<MainLayout />}>
                <Route index element={<HomePage />} />
                <Route path="add-city" element={<AddCity />} />
                <Route path="edit-city/:id" element={<EditCity />} />
            </Route>
        </Routes>
    )
}

export default App
 