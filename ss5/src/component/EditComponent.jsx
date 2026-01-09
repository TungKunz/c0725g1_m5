import React, { useEffect, useState } from "react";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { Button } from "react-bootstrap";
import * as Yup from "yup";
import { findById, getAll, update } from "../service/Player.js";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
const EditComponent = ({ onSaveSuccess }) => {
    const [editPlayer, setEditPlayer] = useState({
        id: 1,
        playerCode: "",
        name: "",
        dob: "",
        transferValue: 1000001,
        position: "",
    });
    const { id } = useParams();
    useEffect(() => {
        const player = findById(id);
        if (player) {
            setEditPlayer(player);
        }
    }, [id]);
    const navigate = useNavigate();
    const handleSubmit = (value) => {
        console.log("----------------------------------------")
        console.log(value);
        update(value);
        console.log(getAll());
        toast.success("Sửa thành công", {
            theme: 'dark',
            autoClose: 2000
        });
        navigate("/");

    }
    const validate = Yup.object({
        playerCode: Yup.string().required("Yêu cầu nhập mã cầu thủ").matches(/PL-\d{4}/, "Nhập mã đúng định dạng PL-XXXX"),
        name: Yup.string().required("Yêu cầu nhập tên")
            .matches(/[A-z][a-z]*(\s[A-z][a-z]*)+/, "Tên phải đúng định dạng"),
        transferValue: Yup.number().typeError("Giá trị chuyển nhượng phải là số").required("Không được để trống").moreThan(1000000, "Giá trị chuyển nhượng không được bé hơn 1.000.000")
    })
    return (
        <Formik initialValues={editPlayer} onSubmit={handleSubmit} validationSchema={validate} enableReinitialize={true}>
            <Form>
                <div className={'row'}>
                    <div className={'col-md-4 mb-3'}>
                        <label className={'form-label'}>Mã cầu thủ</label>
                        <Field
                            type={'text'}
                            name={'playerCode'}
                            placeholder={'PL-XXXX'}
                            required
                        />
                        <ErrorMessage name={'playerCode'} component={'span'}></ErrorMessage>
                    </div>
                    <div className={'col-md-4 mb-3'}>
                        <label className={'form-label'}>Tên cầu thủ</label>
                        <Field
                            type={'text'}
                            name={'name'}
                            required
                        />
                        <ErrorMessage name={'name'} component={'span'}></ErrorMessage>
                    </div>
                    <div className={'col-md-4 mb-3'}>
                        <label className={'form-label'}>Ngày sinh</label>
                        <Field
                            type={'date'}
                            name={'dob'}
                            required
                        />
                        {/*<ErrorMessage name={'dob'} component={'span'}></ErrorMessage>*/}
                    </div>
                    <div className={'col-md-4 mb-3'}>
                        <label className={'form-label'}>Giá trị chuyển nhượng</label>
                        <Field
                            type={'number'}
                            name={'transferValue'}
                            required
                        />
                        <ErrorMessage name={'transferValue'} component={'span'}></ErrorMessage>
                    </div>
                    <div className={'col-md-4 mb-3'}>
                        <label className={'form-label'}>Vị trí</label>
                        <Field
                            type={'text'}
                            name={'position'}
                            required
                        />
                        {/*<ErrorMessage name={'position'} component={'span'}></ErrorMessage>*/}
                    </div>
                    <div className={'col-md-4 mb-3 d-flex align-items-end'}>
                        <Button variant={'primary'} type={'submit'} className={'w-100'}>
                            <i className={'bi bi-check-circle'}></i> Cập nhật
                        </Button>
                    </div>
                </div>
            </Form>
        </Formik>
    );
};

export default EditComponent;
