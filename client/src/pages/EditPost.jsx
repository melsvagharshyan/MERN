import { useParams } from "react-router-dom";
import { useForm } from 'react-hook-form';
import FileUploadOutlinedIcon from '@mui/icons-material/FileUploadOutlined';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updatePost } from '../app/Slices/postsSlice';
import { Base64 } from '../hooks/Base64';
import { useNavigate } from 'react-router-dom';
import { ImSpinner6 } from 'react-icons/im';
import axios from '../app/api';



const EditPost = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { loading } = useSelector(state => state.posts);
    const { id } = useParams();
    const [post, setPost] = useState();
    const [image, setImage] = useState();
    const [title, setTitle] = useState();
    const [text, setText] = useState();


    // ------ AJAX -----------

    const getSinglePost = async () => {
        try {
            const { data } = await axios.get(`/api/posts/user/${id}`);
            setPost(data);
            setTitle(data.title);
            setText(data.text);
            setImage(data.image.url);
        } catch (err) {
            console.log(err);
        };
    };


    useEffect(() => {
        getSinglePost();
    }, []);

    // ---------------------


    const { handleSubmit } = useForm({ mode: "onSubmit" });


    const uploadImage = async (e) => {
        const file = e.target.files[0];
        const base64 = await Base64(file);
        setImage(base64);
    };


    const onSubmit = handleSubmit(() => {
        let updateData
        if (image !== post.image.url) {
            updateData = { title, text, image };
            dispatch(updatePost({ id, updateData, navigate }));
        } else {
            updateData = { title, text }
            dispatch(updatePost({ id, updateData, navigate }));
        }
    });


    const Reset = () => {
        setTitle(post.title);
        setText(post.text);
        setImage(post.image.url);
    };





    return (
        <div className="px-5">
            <form onSubmit={onSubmit} className="mx-auto flex flex-col py-10  max-w-[400px] gap-3" >
                <label
                    className="flex justify-center items-center gap-2  max-w:20 bg-gray-600  text-gray-300  rounded-md py-2 cursor-pointer border-2 border-dotted">
                    <input
                        type="file"
                        onChange={uploadImage}
                        hidden
                    />
                    <FileUploadOutlinedIcon />
                    Choose a file...
                </label>
                {
                    image && <img src={image} alt="img" className="rounded border-solid border-2" />
                }
                <input
                    required
                    value={title}
                    placeholder='Title' type="text"
                    className="bg-slate-300 p-2 rounded-md outline-none"
                    onChange={(e) => setTitle(e.target.value)}
                />

                <textarea
                    required
                    value={text}
                    placeholder='Text'
                    className="bg-slate-300 p-2  h-40 rounded-md resize-none outline-none"
                    onChange={(e) => setText(e.target.value)}
                />


                {loading && <ImSpinner6 size={25} className=" mx-auto animate-spin fill-cyan-500" />}
                <input
                    type="submit"
                    value="UPDATE"
                    className="bg-cyan-500 text-white rounded-md py-2 cursor-pointer"
                />

                <div className="bg-red-400  text-white rounded-md py-2 cursor-pointer text-center"
                    onClick={Reset}
                >
                    RESET
                </div>
            </form>
        </div>
    )
}


export default EditPost;