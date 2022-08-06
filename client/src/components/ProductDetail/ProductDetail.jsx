
import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProductID, clearID, deleteProduct, getBrands, putEditProduct } from "../../redux/actions";
import { Link, useHistory } from "react-router-dom";
import { useParams } from "react-router";
import style from "./ProductDetail.module.css";
import swal from "sweetalert";
import { Modal, Button, TextField } from "@material-ui/core";
import { useState } from "react";

export default function RecetasDetail(){
    const dispatch = useDispatch();
    const history = useHistory();
    const { productsDetail } = useSelector((state) => state); 
    const { id } = useParams();
    
    const allBrands = useSelector((state)=>state.Brands)
    const [modalEdit, setModalEdit] = useState(false);
    const [update, setUpdate] = useState({
        id: productsDetail.id,
        name: productsDetail.name,
        description: productsDetail.description,
        image: productsDetail.image,
        price: productsDetail.price,
        brandId: productsDetail.price
    })

    useEffect(() => {
        dispatch(getBrands());
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

    // const findBrand = allBrands.find(b => b.id === productsDetail.brandId);
    // console.log("la marca es: ", findBrand);

    const closeModal = () => {
        setModalEdit(!modalEdit);
    };

    const handelUpdate = (e) => {
        setUpdate({
            ...update,
            [e.target.name]: e.target.vale
        })
    };

    const uploadImage = async (e) => {
        //console.log(e.target.id)
        const files = e.target.files;
        const data = new FormData();
        data.append("file", files[0]);
        data.append("upload_preset", "k484vqmp");
        const res = await fetch(
          "https://api.cloudinary.com/v1_1/dqrirzlrv/image/upload",
          { method: "POST", body: data }
        );
        const file = await res.json();
        setUpdate({...update, [e.target.name]:file.secure_url });
    };

    const submitUpdate = async(e) => {
        e.preventDefault();
        console.log("DATOS MODIFICADOS", update);
        await dispatch(putEditProduct(update));
        //if(updateProduct.data){
            closeModal();
            return swal({
                title: 'Product Updated',
                text: 'Product updated successfuli',
                icon: 'success',
            })
        //}
    };
    
    const bodyEditProduct = (<div className={style.container}>
        <div className={style.modaldetail}>
            <h3>Edit Product</h3>
            <TextField name="name" label="Name" className={style.text} onChange={handelUpdate} value={productsDetail && productsDetail.name}/>
            <br />

            <div>
            <TextField name="image" label="Image" onChange={uploadImage} value={productsDetail && productsDetail.image}/>
            <p>
                <img className={style.imageRender} src={productsDetail.image?productsDetail.image : "No hay iamgen"} alt="Imagen NO disponible" width="300px" height="300px"/>
            </p>
            <br />
            </div>

            <TextField name="price" label="Price" className={style.text} onChange={handelUpdate} value={productsDetail && productsDetail.price}/>
            <br />

            <TextField name="description" label="Description" className={style.text} onChange={handelUpdate} value={productsDetail && productsDetail.description}/>
            <br />

            <TextField className={style.text} name="brandId" label="Brand" onChange={handelUpdate} value={productsDetail && productsDetail.brandId}>
                <select name="brandId" label="Brand" onChange={handelUpdate} value={productsDetail && productsDetail.brandId}>
                    {allBrands.map(b=>(<option key={b.id} value={b.name}>{b.name}</option>))}
                </select>
            </TextField>
            <br />

            <div align="right">
                <button className={style.cancel} onClick={closeModal}>Cancel</button>
                <button className={style.buttonUpdate} onClick={submitUpdate}>Update</button>
            </div>
            </div>
        </div>);

    return (<div className={style.container}>
          {productsDetail ?
        <div>
            <div className={style.carddetail}>
            <h2 className={style.title}>{productsDetail.name? productsDetail.name : "No se encontro el nombre"}</h2>
            <img className={style.image} src={productsDetail.image?productsDetail.image : "No hay iamgen"} alt="Imagen NO disponible" width="300px" height="300px"/>
            <div className={style.text}>Price: ${productsDetail.price? productsDetail.price : "No se encontro el precio"}</div>
            <div className={style.text}>Description:{productsDetail.description? productsDetail.description : "No se encontro descripcion"}</div>
            
            {/* <div>Marca: {productsDetail.brandId}</div> */}
            {/* <div>
                <div className={style.title}><h4>{findBrand.name}</h4></div>
                <div><img className={style.imageRender} src={findBrand.logo_url}/></div>
            </div> */}
            
            <div>
                <button className={style.delete} onClick={handeDelete}>Delete Product</button>
                <button className={style.update} onClick={closeModal}>Edit Product</button>
                <Link to="/home"><button className={style.button}>Back to Home</button></Link>
            </div>
            </div>
        </div> 
        : <h4>Loading...</h4>}

        <Modal open={modalEdit} onClose={closeModal}>
            {bodyEditProduct}
        </Modal>

    </div>)
}