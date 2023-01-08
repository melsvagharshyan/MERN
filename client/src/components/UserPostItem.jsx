import Moment from "react-moment";
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import edit from '../Images/edit.png';
import { useDispatch, useSelector } from 'react-redux';
import { deletePost } from "../app/Slices/postsSlice";
import { useNavigate } from 'react-router-dom';
import { ImSpinner6 } from 'react-icons/im';
import { useState } from "react";


const UserPostItem = ({ post }) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { loading } = useSelector(state => state.posts);
    const [id, setId] = useState(""); // FOR LOADING


    const DeletePost = (id) => {
        dispatch(deletePost({ id, navigate }));
        setId(id);
    };

    return <div className="flex flex-col gap-1 justify-between  max-w-[300px]   bg-[#0000004A] rounded-md overflow-hidden pb-2  hover:scale-95	transform: scale(.5) duration-700 shadow shadow-white hover:shadow-cyan-500/50 ">
        <div className="flex w-full max-h-80">
            <img
                src={post.image.url}
                alt="post"
                className="object-cover w-full"
            />
        </div>
        <div className="px-2 text-white">
            <p>{post.title}</p>
        </div>
        <div className="flex justify-between px-2 ">
            <Moment date={post.createdAt} format={'D MMM YYYY'} className="text-white" />
            <div className="flex items-center gap-1">
                <img src={edit} className="fill-[#c0c0c0be] cursor-pointer max-w-[20px]" onClick={() => navigate(`/edit/${post._id}`)} />
                {
                    loading && post._id === id ?
                        <ImSpinner6 size={20} className=" mx-auto animate-spin fill-cyan-500" />
                        :
                        <DeleteOutlineIcon sx={{ fill: "#FF0033FF", cursor: "pointer" }} onClick={() => DeletePost(post._id)} />
                }
            </div>
        </div>
    </div>
}


export default UserPostItem;