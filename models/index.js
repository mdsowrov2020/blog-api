import Comment from "./comment.model.js";
import Post from "./post.model.js";
import User from "./user.model.js";
import Category from "./category.model.js";

User.hasMany(Post, { foreignKey: "authorId", as: "posts" });
User.hasMany(Comment, { foreignKey: "userId", as: "comments" });

Post.belongsTo(User, { foreignKey: "authorId", as: "author" });
Post.belongsTo(Category, { foreignKey: "categoryId", as: "category" });
Post.hasMany(Comment, { foreignKey: "postId", as: "comments" });

Category.hasMany(Post, { foreignKey: "categoryId", as: "posts" });

Comment.belongsTo(User, { foreignKey: "userId", as: "author" });
Comment.belongsTo(Post, { foreignKey: "postId", as: "post" });
Comment.belongsTo(Comment, { foreignKey: "parentId", as: "parent" });
Comment.hasMany(Comment, { foreignKey: "parentId", as: "replies" });

export { User, Post, Category, Comment };
