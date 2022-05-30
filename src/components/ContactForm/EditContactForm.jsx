import React, { useState, useContext, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { AppContext } from '../context/appContext';
import { ModalForm } from '../ModalForm/ModalForm';
import { ReactComponent as Out } from './img/Out1.svg'
import { Upload } from "upload-js";


import s from "./styles.module.css"

export function EditContactForm({ name, address, email, number, image, setActive, id }) {

    const { register, handleSubmit, formState: { errors } } = useForm({
        mode: "onBlur"
    });

    const { handleUpdateNewPhone } = useContext(AppContext);

    const [info, setinfo] = useState({
        name: ((name.first !== undefined ? name.first : "") + " " + (name.last !== undefined ? name.last : "")),
        number: number,
        address: address,
        email: email,
    })

    const [imageEdit, setImageEdit] = useState(image);

    // console.log(imageEdit);

    useEffect(() => {
        setinfo({
            name: ((name.first !== undefined ? name.first : "") + " " + (name.last !== undefined ? name.last : "")),
            number: number,
            address: address,
            email: email,
        });
        setImageEdit(image);
    }, [name, address, email, number, image, id]);

    const [modalActive, setModalActive] = useState(false);

    function onSubmit(data) {
        handleUpdateNewPhone(data, id, imageEdit)
        // console.log(data);
    }

    function onSubmitImg(data) {
        setImageEdit(data)
    }

    function handleChange(event) {
        setinfo({ ...info, [event.target.name]: event.target.value })
    }

    



    // class ImageUpload extends React.Component {
    //     constructor(props) {
    //         super(props);
    //         this.state = { file: '', imagePreviewUrl: '' };
    //     }

    //     _handleSubmit(e) {
    //         e.preventDefault();
    //         // console.log('handle uploading-', this.state.file);
    //         onSubmitImg(this.state.imagePreviewUrl)
    //     }

    //     _handleImageChange(e) {
    //         e.preventDefault();

    //         let reader = new FileReader();
    //         let file = e.target.files[0];

    //         reader.onloadend = () => {
    //             this.setState({
    //                 file: file,
    //                 imagePreviewUrl: reader.result
    //             });
    //         }

    //         reader.readAsDataURL(file)
    //     }

    //     render() {
    //         let { imagePreviewUrl } = this.state;
    //         let $imagePreview = null;
    //         if (imagePreviewUrl) {
    //             $imagePreview = (<img src={imagePreviewUrl} />);
    //         } else {
    //             $imagePreview = (<div className={s.previewText}>Пожалуйста, загрузите изображение</div>);
    //         }

    //         return (
    //             <div className={s.previewComponent}>
    //                 <form onSubmit={(e) => this._handleSubmit(e)}>
    //                     <input className={s.fileInput}
    //                         type="file"
    //                         onChange={(e) => this._handleImageChange(e)} />
    //                     <button className={s.submitButton}
    //                         type="submit"
    //                         onClick={(e) => this._handleSubmit(e)}>Загрузить изображение</button>
    //                 </form>
    //                 {/* <div className={s.imgPreview}>
    //                     {$imagePreview}
    //                 </div> */}
    //             </div>
    //         )
    //     }
    // }



const upload = new Upload({ apiKey: "free" });

const FileUploadButton = () => {
  const [progress, setProgress] = useState(null);
  const [fileUrl, setFileUrl]   = useState(null);
  const [error, setError]       = useState(null);
//   onSubmitImg(fileUrl);
  
  if (fileUrl  !== null) return fileUrl;
  if (error    !== null) return error.message;
  if (progress !== null) return <>File uploading... {progress}%</>;

  return <input type="file"
                onChange={upload.createFileInputHandler({
                  onBegin:    ({ cancel })   => setProgress(0),
                  onProgress: ({ progress }) => setProgress(progress),
                  onUploaded: ({ fileUrl })  => setFileUrl(fileUrl),
                  onError:    (error)        => setError(error)
                })} />;
};


    return (
        <>
            <ModalForm active={modalActive} setActive={setModalActive}>
                {FileUploadButton()}
                <button onClick={() => { setModalActive(false) }}>Закрыть</button>
            </ModalForm>
            <h3>Редактировать пользователя</h3>
            <div onClick={() => { setModalActive(true) }}> {imageEdit ? <img src={imageEdit} className={s.imagee} alt="img" /> : <Out className={s.image} />}</div>
            <form className={s.form_title} onSubmit={handleSubmit(onSubmit)}>
                <input className={s.formd}
                    type="text"
                    {...register('name', {
                        required: 'Это поле обязательно'
                    })}
                    placeholder="Имя"
                    value={info.name}
                    onChange={handleChange}
                />
                <div>
                    {errors?.title && <p className={s.errorMessage}>{errors?.title?.message}</p>}
                </div>
                <input className={s.formd}
                    type="text"
                    {...register('number', {
                        required: 'Это поле обязательно'
                    })}
                    placeholder="Телефон"
                    value={info.number}
                    onChange={handleChange}
                />
                <div>
                    {errors?.text && <p className={s.errorMessage}>{errors?.text?.message}</p>}
                </div>
                <input className={s.formd}
                    type="text"
                    {...register('address', {

                    })}
                    placeholder="Адрес"
                    value={info.address}
                    onChange={handleChange}
                />
                <input className={s.formd}
                    type="text"
                    {...register('email', {

                    })}
                    placeholder="Электронный адрес"
                    value={info.email}
                    onChange={handleChange}
                />
                <button className={s.button_com} onClick={() => { setTimeout(() => setActive(false), 100);  }}> Сохранить </button>
                <button type='reset' className={s.button_com} onClick={() => {
                    setActive(false), setinfo({
                        name: [name.first || name.last],
                        number: number,
                        address: address,
                        email: email,
                    });
                }}> Закрыть </button>
            </form>

        </>
    )
}