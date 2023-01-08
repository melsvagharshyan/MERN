import postModel from '../../models/post.js';
import userModel from '../../models/user.js';
import Cloud from '../../middleware/cloudinary.js';


export const createPost = async (req, res) => {
    const {title, text, image} = req.body;

    try {
        const result = await Cloud.uploader.upload(image, {
            folder: "products"
        })
        const user = await userModel.findById(req.userId);
        const newPost = await postModel.create({
            username: user?.name,
            title,
            text,
            image: {
                public_id: result.public_id,
                url: result.secure_url
            },
            author: req.userId
        });
        await userModel.findByIdAndUpdate(req.userId, {
            $push: {posts: newPost}
        });
        res.status(200).json(newPost);
    } catch (err) {
        res.status(500).json({message: 'Something went wrong'});
        console.log(err);
    }

}





