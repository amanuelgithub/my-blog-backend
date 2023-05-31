import { Request, Response } from "express";
import AppDataSource from "../config/app-data-source";
import { Blog } from "../entities/blog.entity";
import {
  createdRes,
  internalServerErrorRes,
  notFoundRes,
  successRes,
} from "../util/custom-response";

const BlogRepository = AppDataSource.getRepository(Blog);

export async function createBlog(req: Request, res: Response) {
  try {
    const blog = BlogRepository.create(req.body as Blog);

    await BlogRepository.save(blog);

    res.send(createdRes(blog));
  } catch (err: any) {
    res.send(internalServerErrorRes(err.message));
  }
}

export async function findBlogs(req: Request, res: Response) {
  try {
    const blogs = await BlogRepository.find();

    if (!blogs) {
      res.send(notFoundRes());
    } else {
      res.send(blogs);
    }
  } catch (err: any) {
    res.send(internalServerErrorRes(err.message));
  }
}

export async function findPublishedBlogs(req: Request, res: Response) {
  try {
    const publishedBlogs = await BlogRepository.find({
      where: { isPublished: true },
    });

    if (!publishedBlogs) {
      res.send(notFoundRes());
    } else {
      res.send(publishedBlogs);
    }
  } catch (err: any) {
    res.send(internalServerErrorRes(err.message));
  }
}

export async function publishBlog(req: Request, res: Response) {
  try {
    const blog = await BlogRepository.findOne({
      where: { id: req.params.blogId },
    });

    if (!blog) {
      res.send(notFoundRes());
    } else {
      blog.isPublished = req.body.isPublished;

      await BlogRepository.save(blog);

      res.send(successRes(blog));
    }
  } catch (err: any) {
    res.send(internalServerErrorRes(err.message));
  }
}
