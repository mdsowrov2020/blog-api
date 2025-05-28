import { DataTypes } from "sequelize";
import { sequelize } from "../db/connection.js";
import slugify from "slugify";

const Post = sequelize.define(
  "Post",
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    title: {
      type: DataTypes.STRING(255),
      allowNull: false,
      validate: {
        len: [1, 255],
      },
    },
    excerpt: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    featuredImage: {
      type: DataTypes.STRING(500),
      allowNull: true,
    },
    status: {
      type: DataTypes.ENUM("draft", "published", "archived"),
      defaultValue: "draft",
      allowNull: false,
    },
    publishedAt: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    authorId: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    categoryId: {
      type: DataTypes.UUID,
      allowNull: true,
    },
    viewCount: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    commentCount: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    likeCount: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    readTime: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    seoTitle: {
      type: DataTypes.STRING(60),
      allowNull: true,
    },
    seoDescription: {
      type: DataTypes.STRING(160),
      allowNull: true,
    },
    seoKeywords: {
      type: DataTypes.ARRAY(DataTypes.STRING),
      defaultValue: [],
    },
    isFeatured: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    allowComments: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
  },
  {
    tableName: "posts",
    timestamps: true,
    indexes: [
      { fields: ["slug"] },
      { fields: ["status"] },
      { fields: ["authorId"] },
      { fields: ["categoryId"] },
      { fields: ["publishedAt"] },
      { fields: ["isFeatured"] },
    ],
    hooks: {
      beforeValidate: (post) => {
        if (post.title && !post.slug) {
          post.slug = slugify(post.title, { lower: true, strict: true });
        }
        if (post.status === "published" && !post.publishedAt) {
          post.publishedAt = new Date();
        }
        if (post.content && !post.readTime) {
          const wordCount = post.content.split(/\s+/).length;
          post.readTime = Math.ceil(wordCount / 200);
        }
      },
    },
  }
);

export default Post;
