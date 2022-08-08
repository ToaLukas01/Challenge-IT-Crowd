
import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProductID, clearID, deleteProduct, getBrands, putEditProduct } from "../../redux/actions";
import { Link, useHistory } from "react-router-dom";
import { useParams } from "react-router";
import style from "./ProductDetail.module.css";
import swal from "sweetalert";
import { Modal, TextField } from "@material-ui/core";
import { useState } from "react";
import CreateBrand from "../CreateBrand/CreateBrand";

export default function RecetasDetail(){
    const dispatch = useDispatch();
    const history = useHistory();
    const { productsDetail } = useSelector((state) => state); 
    const { id } = useParams();
    console.log("PRODUCT DETAIL", productsDetail);

    const allBrands = useSelector((state)=>state.Brands);
    const [activeBrand, setActiveBrand] = useState(false);
    const [modalEdit, setModalEdit] = useState(false);
    const [update, setUpdate] = useState({
        id: "",
        name: "",
        description: "",
        image: "",
        price: "",
        brandId: ""
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

    const closeModal = () => {
        setUpdate({
            id: "",
            name: "",
            description: "",
            image: "",
            price: "",
            brandId: ""
        })
        setModalEdit(!modalEdit);
    };

    const openModal = () => {
        setUpdate({
            id: productsDetail.id,
            name: productsDetail.name,
            description: productsDetail.description,
            image: productsDetail.image,
            price: productsDetail.price,
            brandId: productsDetail.brandId 
        });
        setModalEdit(!modalEdit);
    }

    const handelUpdate = (e) => {
        if(e.target.name === "price"){
            setUpdate({
                ...update,
                id: productsDetail.id,
                [e.target.name]: Number(e.target.value) ? Number(e.target.value) : productsDetail.price
            })
            return
        }
        if(e.target.name === "name"){
            setUpdate({
                ...update,
                id: productsDetail.id,
                [e.target.name]: (e.target.value) ? (e.target.value) : productsDetail.name
            })
            return
        }
        if(e.target.name === "description"){
            setUpdate({
                ...update,
                id: productsDetail.id,
                [e.target.name]: (e.target.value) ? (e.target.value) : productsDetail.description
            })
            return
        }
        if(e.target.name === "brandId"){
            setUpdate({
                ...update,
                id: productsDetail.id,
                [e.target.name]: Number(e.target.value) ? Number(e.target.value) : productsDetail.brandId
            })
            return
        }
        setUpdate({
            ...update,
            id: productsDetail.id,
            [e.target.name]: e.target.vale ? e.target.vale : productsDetail[e.target.name]
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
        setUpdate({
            ...update, 
            [e.target.id]:file.secure_url  
        });
    };

    const submitUpdate = async(e) => {
        e.preventDefault();
        console.log("DATOS MODIFICADOS", update);
        await dispatch(putEditProduct(update));
        closeModal();
        swal({
            title: 'Product Updated',
            text: 'Product updated successfuli',
            icon: 'success',
        })
        return dispatch(getProductID(update.id))
    };
    
    
    console.log("DATOS DE UPDATE", update);
    const bodyEditProduct = (<div className={style.container}>
        <div className={style.modaldetail}>
            <h3 className={style.title}>Edit Product</h3>

            <label className={style.title}>Name</label>
            <TextField name="name" className={style.title} onChange={handelUpdate} value={update && update.name}/>
            <br />

            <div>
            <div className={style.title}>Image
                <input 
                    id="image" 
                    name="file" 
                    onChange={(e) => uploadImage(e)} 
                    type="file"
                    placeholder={update && update.image}  
                />
            </div>
            <p> <img className={style.imageRender} src={update.image? update.image : productsDetail.image} alt="Imagen NO disponible" width="300px" height="300px"/> </p>
            <br />
            </div>

            <label className={style.title}>Price</label>
            <TextField name="price" className={style.text} onChange={handelUpdate} value={update && update.price}/>
            <br />

            <label className={style.title}>Description</label>
            <div className={style.containerDescription}> 
                <textarea 
                    name="description" 
                    value={update.description && update.description}  
                    onChange={handelUpdate} 
                    type="text"
                    className={style.description}
                /> 
            </div>
            <br />

            <div className={style.filter}>
                <p className={style.title}>Brand</p>
                <select name="brandId" onChange={handelUpdate} selected={update.brandId} className={style.buttonBrand}>
                    {allBrands.map(b =>(<option className={style.optionBrand} selected={b.id === update.brandId ? "true" : "false"} key={b.id} value={b.id}>{b.name}</option>))}
                </select>
                <button type="button" onClick={()=>setActiveBrand(!activeBrand)}className={style.buttonNewBrand}>Add new brand</button>
            </div>
            <div>{activeBrand ? <CreateBrand/>:null}</div>
            <br />

            <div align="right">
                <button className={style.cancel} onClick={closeModal}>Cancel</button>
                <button className={style.buttonUpdate} type="button" onClick={submitUpdate}>Update</button>
            </div>
            </div>
        </div>);

        const findBrand = allBrands.find(b => b.id === productsDetail.brandId);
        console.log("la marca es: ", findBrand);

    return (<div className={style.container}>
          {productsDetail ?
        <div>
            <div className={style.carddetail}>
            <h2 className={style.title}>{productsDetail.name? productsDetail.name : "No se encontro el nombre"}</h2>
            <img className={style.image} src={productsDetail.image?productsDetail.image : "No hay iamgen"} alt="Imagen NO disponible" width="300px" height="300px"/>
            <div className={style.text}>Price: ${productsDetail.price? productsDetail.price : "No se encontro el precio"}</div>
            <div className={style.text}>Description:{productsDetail.description? productsDetail.description : "No se encontro descripcion"}</div>
            
            <div>{findBrand ? <div>
            <div className={style.title}>Brand: {findBrand.name}</div>
            <img className={style.logoRender} src={findBrand.logo_url ? findBrand.logo_url : "NO LOGO"} alt="NO LOGO"/>
            </div> : null}</div>
            
            <div>
                <button className={style.delete} onClick={handeDelete}>Delete Product</button>
                <button className={style.update} onClick={openModal}>Edit Product</button>
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