import Moment from "react-moment";
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { useEffect } from 'react';
import { getSinglePost } from '../app/Slices/postsSlice';


const SinglePost = () => {
    const { post } = useSelector(state => state.posts);
    const disptach = useDispatch();
    const { id } = useParams();

    useEffect(() => {
        disptach(getSinglePost(id));
    }, []);


    return (
        <div className="px-5">
            {post && (<div className="mx-auto mt-10 flex flex-col max-w-[600px] flex-grow gap-3 bg-[#0000004A] rounded-md overflow-hidden pb-3 shadow shadow-white">
            <div className="flex w-full max-h-80">
                <img
                    src={post.image.url}
                    alt="post"
                    className="object-cover w-full"
                />
            </div>

            <div className="flex justify-between items-center px-3">
                <p className="text-white text-sm">{post.username}</p>
                <Moment date={post.createdAt} format={'D MMM YYYY'} className="text-white text-xs" />
            </div>
            <hr className="w-[95%] mx-auto border-blue-500 " />
            <p className="pl-3 text-center text-yellow-50 ">{post.title}</p>
            <p className="text-white text-center px-3">{post.text}</p>
        </div>)}
        </div>
    )
}


export default SinglePost;