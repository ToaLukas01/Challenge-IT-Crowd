
import React from "react";
import style from "./ProductCard.module.css";

export default function ProductCard({name, image, price, id}){
    return(<React.Fragment>
        <div className = {style.container}>
            <div key={id}>
                <img className={style.image} src={image} alt="Imagen NO disponible" width="200px" height="200px" />
                <div className={style.name}>{name}</div>
                <div className={style.price}>Price: ${price}</div>
            </div>
        </div>
    </React.Fragment>)
}