
import React from "react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllProducts } from "../../redux/actions";
import { Link } from "react-router-dom";
import ProductCard from "../ProductCard/ProductCard";
import Paginate from "../Paginate/Paginate";
import style from "./Home.module.css";
//import NavBar from "../NavBar/NavBar";

export default function Home (){
    const dispatch = useDispatch();
    const allProducts = useSelector((state) => state.allProducts);

    //Pagination
    const [actualPage, setActualPage] = useState(1);
    const [productsByPage, setProductsByPage] = useState(4);
    const indexLastProduct = actualPage * productsByPage;
    const indexFristProduct = indexLastProduct - productsByPage;
    const actualProducts = allProducts.slice(indexFristProduct, indexLastProduct);

    const paginate = (pagNumber) => {
        setActualPage(pagNumber)
    };

    useEffect(()=>{
        dispatch(getAllProducts())
    },[dispatch]);

    return(<div className={style.background}>
        <div className={style.title}><h2>Products IT Crowd</h2></div>

        <Link to="/products" ><button className={style.button}>Add new Product</button></Link>

        <Paginate
        productsByPage={productsByPage}
        allProducts={allProducts.length}
        paginate={paginate}
        />

        <div className={style.litlecontainer}>
        <React.Fragment>
            <div className={style.card}>
                {actualProducts?.map(p => {return(
                    <div key={p.id}>
                        <Link style={{ textDecoration: "none" }} to={`/detail/${p.id}`}>
                            <ProductCard name={p.name} image={p.image} price={p.price} id={p.id}/>
                        </Link>
                    </div>
                )})}
            </div>
        </React.Fragment>
        </div>

    </div>)
}