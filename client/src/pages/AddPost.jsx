import { useForm } from 'react-hook-form';
import FileUploadOutlinedIcon from '@mui/icons-material/FileUploadOutlined';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createPost } from '../app/Slices/postsSlice';
import { Base64 } from '../hooks/Base64';
import { useNavigate } from 'react-router-dom';
import { ImSpinner6 } from 'react-icons/im';

const AddPost = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [image, setImage] = useState("");
    const { loading, error } = useSelector(state => state.posts);
    const {
        register,
        reset,
        handleSubmit,
        formState: { isSubmitSuccessful }
    } = useForm({ mode: "onSubmit" });


    const uploadImage = async (e) => {
        const file = e.target.files[0];
        const base64 = await Base64(file);
        setImage(base64);
    };


    const onSubmit = handleSubmit(({ title, text }) => {
        const postData = { title, text, image };
        dispatch(createPost({ postData, navigate }));
    });


    const Clear = () => {
        reset();
        setImage("");
    };

    useEffect(() => {
        reset();
        setImage("");
    }, [isSubmitSuccessful]);


    return (
        <div className="px-5">
            <form onSubmit={onSubmit} className="mx-auto flex flex-col py-10  max-w-[400px] gap-3" >
                {
                    image && <img src={image} alt="img" className="rounded border-solid border-2" />
                }
                <label
                    className="flex justify-center items-center gap-2  max-w:20 bg-gray-600  text-gray-300  rounded-md py-2 cursor-pointer border-2 border-dotted">
                    <input
                        required
                        type="file"
                        onChange={uploadImage}
                        hidden
                    />
                    <FileUploadOutlinedIcon />
                    Choose a file...
                </label>
                <input
                    required
                    placeholder='Title' type="text"
                    className="bg-slate-300 p-2 rounded-md outline-none"
                    {...register("title")}
                />

                <textarea
                    required
                    placeholder='Text'
                    className="bg-slate-300 p-2  h-40 rounded-md resize-none outline-none"
                    {...register("text")}
                />

                {loading && <ImSpinner6 size={25} className=" mx-auto animate-spin fill-cyan-500" />}
                <input
                    type="submit"
                    value="Submit"
                    className={`bg-cyan-500 text-white rounded-md py-2 cursor-pointer ${loading && "animate-pulse"}`}
                />

                <div className="bg-red-400  text-white rounded-md py-2 cursor-pointer text-center"
                    onClick={Clear}
                >
                    Clear
                </div>
            </form>
        </div>
    )
}


export default AddPost;