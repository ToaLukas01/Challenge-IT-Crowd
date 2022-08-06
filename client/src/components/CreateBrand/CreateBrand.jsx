
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { postBrands, getBrands } from '../../redux/actions';
//import { Link, useNavigate } from "react-router-dom";
import swal from 'sweetalert';
import style from './CreateBrand.module.css'


export default function CreateBrand(){
    const dispatch = useDispatch();
    const [activeBrand, setActiveBrand] = useState(true)
    const [errors, setErrors] = useState({
        name: "",
        logo_url: ""
    });
    const [brand, setBrand] = useState({
        name: "",
        logo_url: ""
    })
    
    const handelBrand = (e) => {
        if(e.target.name === "name"){
            setBrand({
                ...brand,
                [e.target.name]: e.target.value
            })
        }
        setBrand({
            ...brand,
            [e.target.name]: e.target.value
        })  
    };

    const handelBlurBrand = (e) => {
        //validar nombre
        if(e.target.name === "name"){
            if(e.target.value === ""){
                setErrors({
                    ...errors,
                    [e.target.name]: "Input the brand name"
                })
            }else if (!/^[a-zA-ZÀ-ÿ\s\d]*$/.test(e.target.value)){ //!/^[a-zA-ZÀ-ÿ\s\d]{1,40}$/.test(e.target.value)
                setErrors({
                    ...errors,
                    [e.target.name]: "Input a validate name"
                })
            } else {
                setErrors({
                    ...errors,
                    [e.target.name]: ""
                })
            }    
        };
        if(e.target.name === "logo_url"){
            if(e.target.value === ""){
                setErrors({
                    ...errors,
                    [e.target.name]: "Input the logo of the brand"
                })
            } else {
                setErrors({
                    ...errors,
                    [e.target.name]: ""
                })
            }    
        };
    }

    const handeSubmitBrand = async(e) => {
        e.preventDefault();
        if (errors.name !== "" || errors.logo_url !== ""){
            return swal({
                title: 'Género no cargado',
                text: "Ingrese un nombre con caracteres válidos",
                icon: 'warning',
                dangerMode:true})
        }
        if(brand.name === "" || brand.logo_url === ""){
            setErrors({
                name: brand.name === "" ? "Input the brand name" : "",
                logo_url: brand.logo_url === "" ? "Input the logo of the brand" : ""
            });
            return
        } 
        const brandCreated = await dispatch(postBrands(brand));
        console.log("NEW BRAND:",brandCreated.data)
        if(brandCreated.data){
            dispatch(getBrands());
            swal({
                text: "Brand added succesfuli",
                icon: 'success',
                })
            setBrand({
                name: "",
                logo_url: ""
            })
            setActiveBrand(!activeBrand)
        }
    };

    //k484vqmp codigo carpeta clodinari
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
        setBrand({...brand, [e.target.id]:file.secure_url });
    };

    return (<div>
            {activeBrand ? <div>
                <div>
                    <input 
                    name="name" 
                    value={brand.name}  
                    onChange={handelBrand}
                    onBlur={handelBlurBrand} 
                    type="text"
                    className={errors.name?.length > 0 ? style.error : style.inputText} 
                    placeholder={errors.name?.length > 0 ? errors.name : "Name new brand" }
                    />
                </div>

                {/* LOGO */}
                <div>
                    <div className={style.select}>
                        <label className={errors.logo_url?.length > 0 ? style.error : style.img}>
                            {errors.logo_url?.length > 0 ? errors.logo_url : "Brand Logo:"} 
                        </label>
                    </div>    
                    <div className={style.file}>
                        <input 
                            id="logo_url" 
                            name="file" 
                            onChange={(e) => uploadImage(e)} 
                            onBlur={handelBlurBrand} 
                            type="file"
                            className={errors.logo_url?.length > 0 ? style.error : style.img}/>
                    </div>
                    <div>{brand.logo_url ? <div><img className={style.imageRender} src={brand.logo_url}/></div> : null}</div>
                </div>

                <button onClick={handeSubmitBrand} className={style.buttonSubmit}>Add Brand</button>
            </div>:null }
        </div>)
}