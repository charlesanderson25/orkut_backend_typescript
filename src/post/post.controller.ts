import {
  JsonController,
  Get,
  Post,
  Delete,
  Put,
  QueryParam,
  Param,
  Body,
  HttpCode,
} from "routing-controllers";
import express from "express";
import {
  createPost,
  createPostComment,
  deletePost,
  listPostComments,
  listPosts,
  readPost,
  updatePost,
} from "./post.model.repository";
import cors from "cors";
import { PostRepository } from "./post.model.repository";
import { CreatePostDto } from "./dtos/create.post.dto";
import { UpdatePostDto } from "./dtos/update.post.dto";
import { CreatePostCommentDto } from "./dtos/create.post.comment.dto";

const app = express();
app.use(cors());
const postController = express.Router();

@JsonController("/posts")
export class PostController {
  constructor() {
    this.postRepository = new PostRepository();
  }

  postRepository: PostRepository;

  @Get()
  async getAll(
    @QueryParam("order_by") orderBy: string = "desc",
    // @QueryParam("search") search: string | null = null
    @QueryParam("search") search: string
  ) {
    const posts = await this.postRepository.listPosts(orderBy, search);
    // res.status(200).json(posts);
    return posts;
  }
  @Get("/:id")
  async getById(@Param("id") postId: number) {
    const post = await this.postRepository.readPost(postId);
    return post;
  }

  @HttpCode(201)
  @Post()
  async createPost(@Body() body: CreatePostDto) {
    // const postData = req.body;
    const post = await this.postRepository.createPost(body);
    return post;
  }

  @Delete("/:id")
  async deleteById(@Param("id") postId: number) {
    const post = await this.postRepository.deletePost(postId);
    return post;
  }

  @Put("/:id")
  async updateById(@Param("id") postId: number, @Body() body: UpdatePostDto) {
    const post = await this.postRepository.updatePost(postId, body);
    return post;
  }

  @Get("/:id/comments")
  async listPostComments(@Param("id") postId: number) {
    const comments = await this.postRepository.listPostComments(postId);
    return comments;
  }

  @HttpCode(201)
  @Post("/:id/comments")
  async createPostComment(
    @Param("id") postId: number,
    @Body() body: CreatePostCommentDto
  ) {
    const { userId, message } = body; // Desestruturação para obter userId e message do req.body
    const comment = await this.postRepository.createPostComment(
      postId,
      message,
      userId
    );
    return comment;
  }
}

// postController.get("/", async (req, res) => {
//   const orderBy = req.query.order_by || "desc";
//   const search = req.query.search || null;
//   const posts = await listPosts(orderBy, search);
//   res.status(200).json(posts);
// });

//Read Post
// postController.get("/:id", async (req, res) => {
//   const postId = req.params.id;
//   const post = await readPost(postId);
//   res.status(200).json(post);
// });

//Create Post

// postController.post("/", async (req, res) => {
//   const postData = req.body;
//   const post = await createPost(postData);
//   res.status(200).json(post);
// });

// Delete Post
// postController.delete("/:id", async (req, res) => {
//   const postId = req.params.id;
//   const post = await deletePost(postId);
//   res.status(200).json(post);
// });

// postController.put("/:id", async (req, res) => {
//   const postData = req.body;
//   const postId = req.params.id;
//   const post = await updatePost(postId, postData);
//   res.status(200).json(post);
// });

// Lista comentários
// postController.get("/:id/comments", async (req, res) => {
//   const postId = req.params.id;
//   const comments = await listPostComments(postId);
//   res.status(200).json(comments);
// });

//Adiciona comentários

// postController.post("/:id/comments", async (req, res) => {
//   const postId = req.params.id;
//   const commentData = req.body;
//   const comment = await createPostComment(postId, commentData);
//   res.status(201).json(comment);
// });

// postController.post("/:id/comments", async (req, res) => {
//   const postId = req.params.id;
//   const { userId, message } = req.body; // Desestruturação para obter userId e message do req.body
//   const comment = await createPostComment(postId, message, userId);
//   res.status(201).json(comment);
// });

export default postController;
