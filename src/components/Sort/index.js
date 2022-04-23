import React from "react";
import "./styles.css";


export const Sort = () => {
	return (
		<div className="sort content__sort">
			<a href="#" className="sort__link sort__link_selected">Популярные</a>
			<a href="#" className="sort__link">Новинки</a>
			<a href="#" className="sort__link">Сначала дешёвые</a>
			<a href="#" className="sort__link">Сначала дорогие</a>
			<a href="#" className="sort__link">По рейтингу</a>
			<a href="#" className="sort__link">По скидке</a>
		</div>
	);
};