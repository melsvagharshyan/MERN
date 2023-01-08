import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getUserPosts } from '../app/Slices/postsSlice';
import UserPostItem from '../components/UserPostItem';




const UserPosts = ()=> {
    const dispatch = useDispatch();
    const {userPosts} = useSelector(state=> state.posts);

    
    useEffect(()=>{
        dispatch(getUserPosts());
    },[dispatch]);

    if(!userPosts.length) return <div className="text-white text-xl text-center w-full mt-5">No Posts Yet</div>

    return (
        <div className="flex flex-wrap py-10 px-5 gap-5">
            {userPosts.map(post=> <UserPostItem key={post._id} post={post}/>)}
        </div>
    )
}


export default UserPosts;

