import React, {useState} from "react";
import "./styles.css";
import  cn  from 'classnames';


export const Sort = ({ tabs, onChageSort }) => {
	const [currentSort, setCurrentSort] = useState("")

	return (
		<div className="sort content__sort">
			{tabs.map((tab) => {
				return (
					<button 
						key={tab.id}
						className={cn('sort__link', {
							'sort__link_selected': currentSort === tab.id
						})}
						onClick={()=> { onChageSort(tab.id); setCurrentSort(tab.id)}}
					>
						{tab.title}
					</button>
				)
			})}
		</div>
	);
};