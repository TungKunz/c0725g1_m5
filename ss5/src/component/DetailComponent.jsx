import {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import {findById} from "../service/Player.js";

const DetailComponent = ()=>{
    const [detail,setDetail] = useState({});
    const {id}=useParams();
    useEffect(() => {
        setDetail(findById(id))
    }, [id]);
    return(
        <>
            <h2>Chi tiết</h2>
            <p>id: {detail.id}</p>
            <p>Name: {detail.name}</p>
            <p>Giá trị: {detail.transferValue}</p>
        </>
    )
}
export default DetailComponent;