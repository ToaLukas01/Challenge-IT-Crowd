
import React from "react";
import { useState, useEffect} from "react";
import { useDispatch, useSelector } from "react-redux";
import { postProduct, getBrands } from "../../redux/actions";
import { Link, useHistory } from "react-router-dom";
import style from "./CreateProduct.module.css";
import swal from "sweetalert";
import CreateBrand from "../CreateBrand/CreateBrand";

export default function CreateProduc(){
    const dispatch = useDispatch();
    const history = useHistory();
    const allBrands = useSelector((state)=>state.Brands);
    const [product, setProduct] = useState({
        name: "",
        description: "",
        image: "",
        price: "",
        brandId: ""
    });
    const [errors, setErrors] = useState({
        name: "",
        description: "",
        image: "",
        price: "",
        brandId: ""
    });
    const [activeBrand, setActiveBrand] = useState(false);

    useEffect(()=>{
        console.log("entrando al useEffect")
        dispatch(getBrands());
    },[dispatch]);
    console.log("BRANDS:",allBrands)

    const handelProduct = async(e) => {
        if(e.target.name === "price"){
            setProduct({
                ...product,
                [e.target.name]: Number(e.target.value)
            })
            return
        }
        if(e.target.name === "name"){
            setProduct({
                ...product,
                [e.target.name]: (e.target.value)
            })
            return
        }
        if(e.target.name === "description"){
            setProduct({
                ...product,
                [e.target.name]: (e.target.value)
            })
            return
        }
        if(e.target.name === "brandId"){
            setProduct({
                ...product,
                [e.target.name]: (e.target.value)
            })
            return
        }
        setProduct({
            ...product,
            [e.target.name]: e.target.vale
        });
    };

    async function handelBlur(e){
        if(e.target.name === "name"){
            if(e.target.value === ""){
                setErrors({
                    ...errors,
                    [e.target.name]: "Input the product name"
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
        if(e.target.name === "brandId"){
            if(e.target.value === ""){
                setErrors({
                    ...errors,
                    [e.target.name]: "Input the brand of the product"
                })
            } else {
                setErrors({
                    ...errors,
                    [e.target.name]: ""
                })
            }    
        };
        if(e.target.name === "image"){
            if(e.target.value === ""){
                setErrors({
                    ...errors,
                    [e.target.name]: "Input the image of the product"
                })
            } else {
                setErrors({
                    ...errors,
                    [e.target.name]: ""
                })
            }    
        };
        if(e.target.name === "description"){
            if(e.target.value === ""){
                setErrors({
                    ...errors,
                    [e.target.name]: "Input the description of the product"
                })
            } else {
                setErrors({
                    ...errors,
                    [e.target.name]: ""
                })
            }    
        };
        if(e.target.name === "price"){
            if(e.target.value === 0 || e.target.value === ""){
                setErrors({
                    ...errors,
                    [e.target.name]: "Input the price of the product"
                })
            }
            else if (!/^[0-9]*$/.test(e.target.value)){
                setErrors({
                    ...errors,
                    [e.target.name]: "Input a validate price"
                })
            }
            else {
                setErrors({
                    ...errors,
                    [e.target.name]: ""
                })
            }
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
        setProduct({...product, [e.target.id]:file.secure_url });
    };

    async function handelSubmitProduct(e){
        e.preventDefault();
        if( errors.name !== "" ||
            errors.description !== "" ||
            errors.image !== "" ||
            errors.price !== "" ||
            errors.brandId !== "" ){
                swal({ title: "Product not created",
                    text: "Fix errors",
                    icon: 'warning',
                    dangerMode:true })
        };
        if( product.name === "" ||
            product.description === "" ||
            product.image === "" ||
            product.price === "" ||
            product.brandId === "" ){
                setErrors({
                    name: product.name === "" ? "Input the product name" : "",
                    description: product.description === "" ? "Input the description of the product" : "",
                    image: product.image === "" ? "Input the image of the product" : "", 
                    price: product.price === "" ? "Input the price of the product" : "", 
                    brandId: product.brandId === "" ? "Input the brand of the product" : "", 
                });
                return
        };
        await dispatch(postProduct(product));
        swal({ text: "Product createt successfuli",
                icon: "success" });
        setProduct({
            name: "",
            description: "",
            image: "",
            price: "",
            brandId: ""
        });
        history.push("/home");
    };

    console.log("SETTING PRODUCT:", product)
    return (<div className={style.container}>
        <div className={style.card}>
            <div className={style.title}><h2>Create Product</h2></div>
            <form onSubmit={(e)=>handelSubmitProduct(e)}>
                {/* NAME */}
                <div> 
                    <input
                        name="name" 
                        value={product.name}  
                        onChange={handelProduct} 
                        onBlur={handelBlur} 
                        type="text"
                        className={errors.name?.length> 0 ? style.error : style.inputText}
                        placeholder={errors.name?.length> 0 ? errors.name : "Product name"}/>
                </div>

                {/* BRAND */}
                <div>
                <div className={style.select}>
                    <label className={errors.brandId?.length > 0 ? style.error : style.label}>
                        {errors.brandId?.length > 0 ? errors.brandId : "Selecct the brand:"} 
                    </label>
                </div>
                <div className={style.filter}>
                    <select name="brandId" onChange={handelProduct} className={style.buttonBrand}>
                        <option className={style.optionBrandBase}>Brands</option>
                        {allBrands.map(b =>(<option className={style.optionBrand} key={b.id} value={b.name}>{b.name}</option>))}
                    </select>
                    <button 
                        type="button" 
                        onClick={()=>setActiveBrand(!activeBrand)}
                        className={style.buttonNewBrand}
                        >Add new brand</button>
                </div>
                <div>{activeBrand ? <CreateBrand/>:null}</div>
                </div>

                {/* IMAGE */}
                <div>
                <div className={style.select}>
                    <label className={errors.image?.length > 0 ? style.error : style.img}>
                        {errors.image?.length > 0 ? errors.image : "Product image:"} 
                    </label>
                </div>    
                <div className={style.file}>
                    <input 
                        id="image" 
                        name="file" 
                        onChange={(e) => uploadImage(e)} 
                        onBlur={handelBlur} 
                        type="file"
                        className={errors.image?.length > 0 ? style.error : style.img}/>
                </div>
                <div>{product.image ? <div><img className={style.imageRender} src={product.image}/></div> : null}</div>
                </div>

                {/* PRICE */}
                <div> 
                    <input
                        name="price" 
                        value={product.price}  
                        onChange={handelProduct} 
                        onBlur={handelBlur} 
                        type="number"
                        className={errors.price?.length> 0 ? style.error : style.inputText}
                        placeholder={errors.price?.length> 0 ? errors.price : "Product price"}/>
                </div>

                {/* DESCRIPTION */}
                <div className={style.containerDescription}> 
                    <textarea 
                        name="description" 
                        value={product.description}  
                        onChange={handelProduct} 
                        type="text"
                        className={errors.description?.length> 0 ? style.error : style.description}  //className={style.description} 
                        placeholder={errors.description?.length> 0 ? errors.description : "Product description"} /> 
                </div>

                {/* BUTTONS */}
                <div containerBtn>
                    <Link to='/home'><button className={style.buttonHome}>Back to home</button></Link>
                    <button type="submit" className={style.buttonSubmit}>Create Product</button>
                </div>

            </form>
        </div>
    </div>)
}