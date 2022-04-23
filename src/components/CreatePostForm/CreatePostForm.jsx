import React from 'react';
import { useForm } from 'react-hook-form';
import s from "./styles.module.css"
import cn from "classnames";
import { Button } from '../../components/Button/Button';
import { useNavigate } from "react-router-dom";
export function CreatePostForm({active, handleCreateNewPhone}) {

    const { register, handleSubmit, formState: { errors } } = useForm({
        mode: "onBlur"
    });
 
    function onSubmit(data) {
        handleCreateNewPhone(data)
        console.log(data);
    }


    return (
        <>
        <form className={s.form_title} onSubmit={handleSubmit(onSubmit)}>
            <h3 className={s.title}>Добавить пользователя</h3>
            <input className={s.formd}
                type="text"
                {...register('name', {
                    required: 'Это поле обязательно'
                })}
                placeholder="Имя"
            />
            <div>
                {errors?.title && <p className={s.errorMessage}>{errors?.title?.message}</p>}
            </div>
            <input className={cn(s.formd)}
                type="text"
                {...register('number', {
                    required: 'Это поле обязательно'
                })}
                placeholder="Номер"
            />
            <div>
                {errors?.text && <p className={s.errorMessage}>{errors?.text?.message}</p>}
            </div>
            <input className={s.formd}
                type="text"
                {...register('email', {

                })}
                placeholder="Электронная почта"
            />
            <input className={s.formd}
                type="text"
                {...register('the address', {

                })}
                placeholder="Адрес"
            />
            {/* <button className={s.button}>Submit</button> */}
            <button className={s.button_com}>Сохранить</button>
           
        </form>
        <button className={s.button_com} onClick={() => {active(false)}}>Отмена</button>
        </>
    )
}