import {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import {getAllPosition} from "../service/Position.js";
import {findById} from "../service/Player.js";

const DetailComponent = ()=>{
    const [detail,setDetail] = useState({});

    const {id}=useParams();
    useEffect(() => {
        const fetchData= async ()=>{
            let detail = await findById(id);
            setDetail(detail);
        }
        fetchData()
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