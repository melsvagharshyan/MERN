import Moment from "react-moment";
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import { useNavigate } from 'react-router-dom';

const PostItem = ({ post }) => {
    const navigate = useNavigate()

    return <div className="flex flex-col max-w-[500px] flex-grow  cursor-pointer gap-3 bg-[#0000004A] rounded-md overflow-hidden pb-3">
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
        <hr className="w-[95%] mx-auto border-blue-500 "/>
        <p className="pl-3 text-xs text-white">{post.title}</p>
        <Stack direction="row" spacing={2}>
            <Button
                variant="outlined"
                sx={{ml:"10px"}}
                onClick={() => navigate(`/${post._id}`)}>
                More
            </Button>
        </Stack>
    </div>
}


export default PostItem;