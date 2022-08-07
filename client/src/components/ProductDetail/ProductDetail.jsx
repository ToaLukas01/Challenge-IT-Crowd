
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
import ModalEdit from "../ModalEdit/ModalEdit";

export default function RecetasDetail(){
    const dispatch = useDispatch();
    const history = useHistory();
    const { productsDetail } = useSelector((state) => state); 
    const { id } = useParams();
    console.log("PRODUCT DETAIL", productsDetail);

    const allBrands = useSelector((state)=>state.Brands)
    const [modalEdit, setModalEdit] = useState(false);
    const [update, setUpdate] = useState({
        id: "",//productsDetail.id ? productsDetail.id : "ID Undefinided",
        name: "",//productsDetail.name ? productsDetail.name : "Name Undefinided",
        description: "",//productsDetail.description ? productsDetail.description : "Description Undefinided",
        image: "",//productsDetail.image ? productsDetail.image : "Image Undefinided",
        price: "",//productsDetail.price ? productsDetail.price : "Price Undefinided",
        brandId: ""//productsDetail.brandId ? productsDetail.brandId : "BrandID Undefinided"
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

    const openCloseModal = () => {
        setModalEdit(!modalEdit);
    };

    const openUpdateModal = () => {
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
                [e.target.name]: (e.target.value) ? (e.target.value) : productsDetail.brandId
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
            [e.target.id]:file.secure_url //? file.secure_url : productsDetail.image 
        });
    };

    const submitUpdate = async(e) => {
        e.preventDefault();
        // if(update.id === ""){
        //     setUpdate({
        //         ...update,
        //         id: productsDetail.id
        //     })
        // }
        // if(update.name === ""){
        //     setUpdate({
        //         ...update,
        //         name: productsDetail.name
        //     })
        // }
        // if(update.description === ""){
        //     setUpdate({
        //         ...update,
        //         description: productsDetail.description
        //     })
        // }
        // if(update.image === ""){
        //     setUpdate({
        //         ...update,
        //         iamge: productsDetail.image
        //     })
        // }
        // if(update.price === ""){
        //     setUpdate({
        //         ...update,
        //         price: productsDetail.price
        //     })
        // }
        // if(update.brandId === ""){
        //     setUpdate({
        //         ...update,
        //         brandId: productsDetail.brandId
        //     })
        // }
        console.log("DATOS MODIFICADOS", update);
        await dispatch(putEditProduct(update));
        //if(updateProduct.data){
            openCloseModal();
            history.push(`/detail/${id}`);
            return swal({
                title: 'Product Updated',
                text: 'Product updated successfuli',
                icon: 'success',
            })
        //}
    };
    
    
    console.log("DATOS DE UPDATE", update);
    const bodyEditProduct = (<div className={style.container}>
        <div className={style.modaldetail}>
            <h3>Edit Product</h3>
            <TextField name="name" label="Name" className={style.text} onChange={handelUpdate} value={update && update.name}/>
            {/* <div>Name
                <input
                    name="name" 
                    value={update.name ? update.name : productsDetail.name}  
                    onChange={handelUpdate} 
                    type="text"
                    className={style.inputText}
                    placeholder={productsDetail && productsDetail.name}
                />
            </div> */}
            <br />

            <div>
            {/* <TextField name="image" label="Image" onChange={uploadImage} value={productsDetail && productsDetail.image}/> */}
            <div className={style.file}>Image
                <input 
                    id="image" 
                    name="file" 
                    onChange={(e) => uploadImage(e)}
                    //value={update.image ? update.image : productsDetail.image} 
                    type="file"
                    placeholder={productsDetail && productsDetail.image}  
                />
            </div>
            <p> <img className={style.imageRender} src={update.image? update.image : productsDetail.image} alt="Imagen NO disponible" width="300px" height="300px"/> </p>
            <br />
            </div>

            {/* <TextField name="price" label="Price" className={style.text} onChange={handelUpdate} value={productsDetail && productsDetail.price}/> */}
            <div>Price 
                <input
                    name="price" 
                    value={update.price ? update.price : productsDetail.price}  
                    onChange={handelUpdate}  
                    type="number"
                    className={style.inputText}
                    placeholder={productsDetail && productsDetail.price}
                />
            </div>
            <br />

            {/* <TextField name="description" label="Description" className={style.text} onChange={handelUpdate} value={productsDetail && productsDetail.description}/> */}
            <div className={style.containerDescription}> 
                <textarea 
                    name="description" 
                    value={update.description ? update.description : productsDetail.description}  
                    onChange={handelUpdate} 
                    type="text"
                    className={style.description}
                    placeholder={productsDetail && productsDetail.description} 
                /> 
            </div>
            <br />

            {/* <TextField className={style.text} name="brandId" label="Brand" onChange={handelUpdate} value={productsDetail && productsDetail.brandId}></TextField> */}
            <div className={style.filter}>
                <select name="brandId" onChange={handelUpdate} value={update.brandId ? update.brandId : productsDetail.brandId} className={style.buttonBrand}>
                    {allBrands.map(b =>(<option className={style.optionBrand} key={b.id} value={b.name}>{b.name}</option>))}
                </select>
                {/* <button 
                    type="button" 
                    onClick={()=>setActiveBrand(!activeBrand)}
                    className={style.buttonNewBrand}
                    >Add new brand</button>
                </div>
                <div>{activeBrand ? <CreateBrand/>:null}</div> */}
            </div>
            <br />

            <div align="right">
                <button className={style.cancel} onClick={openCloseModal}>Cancel</button>
                <button className={style.buttonUpdate} type="button" onClick={submitUpdate}>Update</button>
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
                <button className={style.update} onClick={openUpdateModal}>Edit Product</button>
                <Link to="/home"><button className={style.button}>Back to Home</button></Link>
            </div>
            </div>
        </div> 
        : <h4>Loading...</h4>}

        <Modal open={modalEdit} onClose={openCloseModal}>
            {bodyEditProduct}
        </Modal>

    </div>)
}