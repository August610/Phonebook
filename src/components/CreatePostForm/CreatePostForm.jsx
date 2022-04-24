import React, {useState} from 'react';
import { useForm } from 'react-hook-form';
import s from "./styles.module.css"
import cn from "classnames";
import { Button } from '../../components/Button/Button';
import { useNavigate } from "react-router-dom";
import { ReactComponent as Out } from './img/Out1.svg'
import { FormMod } from '../FormMod/FormMod';
export function CreatePostForm({ active, handleCreateNewPhone, cards }) {

    const { register, handleSubmit, formState: { errors } } = useForm({
        mode: "onBlur"
    });
    const [modalActive, setModalActive] = useState(false);
    const [file, setfile] = useState([]);
    const [image, setImage] = useState(cards.image);


    function onSubmit(data) {
        handleCreateNewPhone(data)
        console.log(data);
    }

    function onSubmitImg(data) {
    //    dataImg.push({...data})
        console.log(data);
        setImage(data)
    }

    // console.log(dataImg);
    

    class ImageUpload extends React.Component {
        constructor(props) {
            super(props);
            this.state = { file: '', imagePreviewUrl: '' };
        }

        _handleSubmit(e) {
            e.preventDefault();
            console.log('handle uploading-', this.state.file);
            onSubmitImg(this.state.file)
        }

        _handleImageChange(e) {
            e.preventDefault();

            let reader = new FileReader();
            let file = e.target.files[0];

            reader.onloadend = () => {
                this.setState({
                    file: file,
                    imagePreviewUrl: reader.result
                });
            }

            reader.readAsDataURL(file)
        }

        render() {
            let { imagePreviewUrl } = this.state;
            let $imagePreview = null;
            if (imagePreviewUrl) {
                $imagePreview = (<img src={imagePreviewUrl} />);
            } else {
                $imagePreview = (<div className={s.previewText}>Please select an Image for Preview</div>);
            }

            return (
                <div className={s.previewComponent}>
                    <form onSubmit={(e) => this._handleSubmit(e)}>
                        <input className={s.fileInput}
                            type="file"
                            onChange={(e) => this._handleImageChange(e)} />
                        <button className={s.submitButton}
                            type="submit"
                            onClick={(e) => this._handleSubmit(e)}>Upload Image</button>
                    </form>
                    <div className={s.imgPreview}>
                        {$imagePreview}
                    </div>
                </div>
            )
        }
    }

    return (
        <>
            <h3 className={s.title}>Добавить пользователя</h3>
            {image ? <img src={image} /> : <Out className={s.imagee} onClick={() => { setModalActive(true) }} />}
            <FormMod active={modalActive} setActive={setModalActive}>
                <ImageUpload />
                <button onClick={() => { setModalActive(false) }}>Отмена</button>
            </FormMod>

            {/* <Image/> */}
            <form className={s.form_title} onSubmit={handleSubmit(onSubmit)}>
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
                    {...register('address', {

                    })}
                    placeholder="Адрес"
                />
                {/* <button className={s.button}>Submit</button> */}
                <button className={s.button_com} onClick={() => { active(false) }}>Сохранить</button>
                <button type='reset' className={s.button_com} onClick={() => { active(false) }}>Отмена</button>
            </form>
        </>
    )
}