import {Router} from 'express';
import {checkAuth} from "../middleware/checkAuth.js";
import {createPost} from "../controllers/posts/create-post.js";
import {deletePost} from "../controllers/posts/delete-post.js";
import {getPosts, getUserSinglePost, getUserPosts, getSinglePost} from "../controllers/posts/get-post.js";
import {updatePost} from "../controllers/posts/update-post.js";

const router =  Router();

router.post("/", checkAuth, createPost);
router.get("/", checkAuth, getPosts);
router.get("/user", checkAuth, getUserPosts);
router.get("/single/:id", checkAuth, getSinglePost);
router.get("/user/:id", checkAuth, getUserSinglePost);
router.put("/update/:id", checkAuth, updatePost);
router.delete("/remove/:id", checkAuth, deletePost);

export default router;