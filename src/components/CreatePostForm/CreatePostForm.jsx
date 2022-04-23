import React from 'react';
import { useForm } from 'react-hook-form';
import s from "./styles.module.css"
import cn from "classnames";
import { Button } from '../../components/Button/Button';
// import { useNavigate } from "react-router-dom";
export function CreatePostForm({}) {

    const { register, handleSubmit, formState: { errors } } = useForm({
        mode: "onBlur"
    });
    // const navigate = useNavigate();
 

    function onSubmit(data) {
        // handleCreateNewPost(data, data.image, data.tags)
        // setTimeout(() => navigate("/"), 200); 
        console.log(data);
    }


    return (
        <form className={s.form_title} onSubmit={handleSubmit(onSubmit)}>
            <h3 className={s.title}>Create new post</h3>
            <input className={s.formd}
                type="text"
                {...register('title', {
                    required: 'Это поле обязательно'
                })}
                placeholder="title"
            />
            <div>
                {errors?.title && <p className={s.errorMessage}>{errors?.title?.message}</p>}
            </div>
            <textarea className={cn(s.form_area)}
                type="text"
                {...register('text', {
                    required: 'Это поле обязательно'
                })}
                placeholder="text"
            />
            <div>
                {errors?.text && <p className={s.errorMessage}>{errors?.text?.message}</p>}
            </div>
            <input className={s.formd}
                type="text"
                {...register('image', {

                })}
                placeholder="image url"
            />
            <input className={s.formd}
                type="text"
                {...register('tags', {

                })}
                placeholder="tags"
            />
            {/* <button className={s.button}>Submit</button> */}
            <Button>Submit</Button>
        </form>
    )
}