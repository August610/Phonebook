import React from "react";
import "./styles.css";
import save from './img/save.svg'
import cn from 'classnames';

export const Card = ({name, price, discount, wigth, description, available, picture, tags}) => {
    const discount_price = Math.round(price - price * discount / 100);
  return (
    <div className="card">
       <div className="card__sticky card__sticky_type_top-left">
            {discount !== 0 && <span className="card__discount">
                {`-${discount}%`}
            </span>}
            {tags && tags.map((tag, i) => 
            <span key={i} className={cn('tag', {[`tag_type_${tag}`]: true})}>{tag}</span>
            )}
        </div>
        <div className="card__sticky card__sticky_type_top-right">
            <button className="card__favorite">
                <img src={save} alt="добавить в избранное" className="card__favorite-icon" />
            </button>
        </div>

        <a href="#" className="card__link">
            <img src={picture} alt={description} className="card__image"/>
            <div className="card__desc">
                {discount !== 0 && <span className="card__old-price">{price}₽</span>}
                <span className={cn('card__price', {'card__price_type_discount': discount !== 0})}>{price}₽</span>
                <span className="card__weight">{wigth}</span>
                <p className="card__name">{name}</p>
            </div>
        </a>
        <a href="#" className="card__cart btn btn_type_primary">
            В корзину
        </a>
    </div>
  );
};
