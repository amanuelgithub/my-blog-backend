import { Request, Response } from "express";
import AppDataSource from "../config/app-data-source";
import { Blog } from "../entities/blog.entity";
import { Tag } from "../entities/tag.entity";
import {
  createdRes,
  internalServerErrorRes,
  notFoundRes,
  successRes,
} from "../util/custom-response";

const TagRepository = AppDataSource.getRepository(Tag);
const BlogRepository = AppDataSource.getRepository(Blog);

export async function createTag(req: Request, res: Response) {
  try {
    const tag = TagRepository.create(req.body as Tag);

    await TagRepository.save(tag);

    res.send(createdRes(tag));
  } catch (err: any) {
    res.send(internalServerErrorRes(err.message));
  }
}

export async function findTags(req: Request, res: Response) {
  const tags = await TagRepository.find();
  if (!tags) {
    res.send(notFoundRes());
  }

  res.send(successRes(tags));
}

export async function updateTag(req: Request, res: Response) {
  const { id } = req.params;
  const { name, description } = req.body;

  const tag = await TagRepository.findOne({ where: { id } });
  if (!tag) {
    res.send(notFoundRes());
  } else {
    tag.name = name;
    tag.description = description;

    res.send(await TagRepository.save(tag));
  }
}

export async function deleteTag(req: Request, res: Response) {
  const { id } = req.params;

  const tag = await TagRepository.delete(id);
  if (tag.affected === 0) {
    res.send(notFoundRes());
  } else {
    res.send(successRes());
  }
}

export async function addTagToBlog(req: Request, res: Response) {
  const tag = await TagRepository.findOne({ where: { id: req.body.tagId } });
  const blog = await BlogRepository.findOne({ where: { id: req.body.blogId } });

  if (!tag || !blog) {
    return notFoundRes();
  } else {
    blog.tags = [...blog.tags, tag];

    await BlogRepository.save(blog);

    res.send(successRes(blog));
  }
}
