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
import EditFacilities from "./component/EditFacilities.jsx";
import AddContract from "./component/AddContract.jsx";
import ListContract from "./component/ListContract.jsx";
import DetailContract from "./component/DetailContract.jsx";
import EditContract from "./component/EditContract.jsx";

function App() {
    const [count, setCount] = useState(0)

    return (
        <>
            <NavbarComponent />
            <Routes>
                <Route path={"/"} element={<ListFacilities />}></Route>
                <Route path={"/add-facilities"} element={<AddFacilities />}></Route>
                <Route path={"/edit-facilities/:id"} element={<EditFacilities />}></Route>
                <Route path={"/detail-facilities/:id"} element={<DetailFacilities />}></Route>

                <Route path={"/customer"} element={<ListCustomer />}></Route>

                <Route path={"/add-customer"} element={<AddCustomer />}></Route>
                <Route path={"/edit-customer/:id"} element={<EditCustomer />}></Route>
                <Route path={"/detail-customer/:id"} element={<DetailCustomer />}></Route>

                <Route path={"/contract"} element={<ListContract />}></Route>
                <Route path={"/add-contract/:id"} element={<AddContract />}></Route>
                <Route path={"/detail-contract/:id"} element={<DetailContract />}></Route>
                <Route path={"/edit-contract/:id"} element={<EditContract />}></Route>
            </Routes>
            <ToastContainer/>
        </>
    )
}

export default App
