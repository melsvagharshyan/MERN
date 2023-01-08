import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getPosts } from '../app/Slices/postsSlice';
import PostItem from '../components/PostItem';


const Main = () => {
    const { posts } = useSelector(state => state.posts);
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getPosts());
    }, [dispatch]);


    return (
        <div className="flex flex-col items-center gap-10  py-10 px-5 ">
            {posts?.map((post) =>  <PostItem post={post} key={post._id}/>)}
        </div>
    )
}


export default Main;