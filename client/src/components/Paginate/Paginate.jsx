
import React from "react";
import style from "./Paginate.module.css";

export default function Paginate({productsByPage, allProducts, paginate}){
    const pageNumber = [];
    for(let i=1; i<=Math.ceil(allProducts/productsByPage); i++){
        pageNumber.push(i)
    }

    return(<div className={style.paginate}>
        <div >
            {pageNumber?.map(n =>{return <button className={style.button} key={n} onClick={()=>paginate(n)}></button>})}      
        </div>
    </div>)
}

