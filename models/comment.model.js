import { DataTypes } from "sequelize";
import { sequelize } from "../db/connection.js";

const Comment = sequelize.define(
  "Comment",
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: false,
      validate: {
        len: [1, 1000],
      },
    },
    postId: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    userId: {
      type: DataTypes.UUID,
      allowNull: true,
    },
    parentId: {
      type: DataTypes.UUID,
      allowNull: true,
    },
    guestName: {
      type: DataTypes.STRING(100),
      allowNull: true,
    },
    guestEmail: {
      type: DataTypes.STRING(255),
      allowNull: true,
      validate: {
        isEmail: true,
      },
    },
    ipAddress: {
      type: DataTypes.INET,
      allowNull: true,
    },
    status: {
      type: DataTypes.ENUM("pending", "approved", "rejected", "spam"),
      defaultValue: "pending",
      allowNull: false,
    },
    likeCount: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    replyCount: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
  },
  {
    tableName: "comments",
    timestamps: true,
    validate: {
      authorOrGuest() {
        if (!this.userId && (!this.guestName || !this.guestEmail)) {
          throw new Error(
            "Comment must have either a user or guest information"
          );
        }
      },
    },
  }
);

export default Comment;
