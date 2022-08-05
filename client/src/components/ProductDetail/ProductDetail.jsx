
import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProductID, clearID, deleteProduct } from "../../redux/actions";
import { Link, useHistory } from "react-router-dom";
import { useParams } from "react-router";
import style from "./ProductDetail.module.css";
import swal from "sweetalert";

export default function RecetasDetail(){
    const dispatch = useDispatch();
    const history = useHistory();
    const { productsDetail } = useSelector((state) => state); 
    const { id } = useParams();

    useEffect(() => {
        dispatch(clearID()); 
        dispatch(getProductID(id))
    }, [dispatch, id] );
    
    async function handeDelete(){
        await dispatch(deleteProduct(id));
        history.push("/home");
        return swal({
            title: 'Product Deleted',
            text: 'Product Deleted successfuli',
            icon: 'success',
            dangerMode: true
        })
    };
    
    return (<div className={style.container}>
          {productsDetail ?
        <div className={style.card}>
            <div className={style.carddetail}>
            <h2>{productsDetail.name? productsDetail.name : "No se encontro el nombre"}</h2>
            <img className={style.image} src={productsDetail.image?productsDetail.image : "No hay iamgen"} alt="Imagen NO disponible" width="300px" height="300px"/>
            <div>Price: ${productsDetail.price? productsDetail.price : "No se encontro el precio"}</div>
            <div>Description:{productsDetail.description? productsDetail.description : "No se encontro descripcion"}</div>
            <div>
                <button className={style.delete} onClick={handeDelete}>Delete Product</button>
                <Link to="/home"><button className={style.button}>Back to Home</button></Link>
            </div>
            </div>
        </div> 
        : <h4>Loading...</h4>}
    </div>)
}