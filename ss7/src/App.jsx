import { useState } from 'react'
import NavbarComponent from "./component/NavbarComponent.jsx";
import { Route, Routes } from "react-router";
import ListFacilities from "./component/ListFacilities.jsx";
import DetailFacilities from "./component/DetailFacilities.jsx";
import AddFacilities from "./component/AddFacilities.jsx";
import ListCustomer from "./component/ListCustomer.jsx";
import AddCustomer from "./component/AddCustomer.jsx";
import EditCustomer from "./component/EditCustomer.jsx";
import DetailCustomer from "./component/DetailCustomer.jsx";

import banner from "./assets/banner.png";
import {Toast} from "react-bootstrap";
import {ToastContainer} from "react-toastify";

function App() {
    const [count, setCount] = useState(0)

    return (
        <>
            <NavbarComponent />
            <Routes>
                <Route path={"/"} element={<ListFacilities />}></Route>
                <Route path={"/add-facilities"} element={<AddFacilities />}></Route>
                <Route path={"/detail-facilities/:id"} element={<DetailFacilities />}></Route>

                <Route path={"/customer"} element={<ListCustomer />}></Route>

                <Route path={"/add-customer"} element={<AddCustomer />}></Route>
                <Route path={"/edit-customer"} element={<EditCustomer />}></Route>
                <Route path={"/detail-customer"} element={<DetailCustomer />}></Route>
            </Routes>
            <ToastContainer/>
        </>
    )
}

export default App
