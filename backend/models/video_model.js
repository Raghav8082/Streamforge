import mongoose from "mongoose";

const variantSchema = new mongoose.Schema(
  {
    quality: {
      type: String, // e.g., "1080p", "720p"
      required: true,
    },
    bitrate: {
      type: Number, // in bits per second
      required: true,
    },
    playlistKey: {
      type: String, // processed/videoId/720p/index.m3u8
      required: true,
    },
    width: Number,
    height: Number,
  },
  { _id: false }
);

const videoSchema = new mongoose.Schema(
  {
    // --------------------------- 
    // Core Metadata
    // ---------------------------
    title: {
      type: String,
      required: true,
      trim: true,
      maxlength: 200,
    },
    description: {
      type: String,
      trim: true,
      maxlength: 5000,
    },
    producerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },
    category: {
      type: String,
      index: true,
    },
    tags: [
      {
        type: String,
        trim: true,
      },
    ],
    visibility: {
      type: String,
      enum: ["public", "private", "unlisted"],
      default: "private",
    },

    // ---------------------------
    // Upload & Processing State
    // ---------------------------
    status: {
      type: String,
      enum: [
        "draft",
        "pending_upload",
        "uploaded",
        "processing",
        "ready",
        "failed",
        "transcode_failed",
      ],
      default: "draft",
      index: true,
    },
    uploadType: {
      type: String,
      enum: ["direct", "multipart"],
      default: "direct",
    },
    fileSize: Number, // in Gigabytes
    watchTime: {
      type: Number,
      default: 0, // total seconds watched
    },
     file:{
      type:String
    },
    transcodedUrl: {
      type: String,
    },
    errorMessage: {
      type: String,
    },

    publishedAt: Date,
  },
  {
    timestamps: true, // adds createdAt and updatedAt
  }
);

// // Compound index for producer dashboard queries
// videoSchema.index({ producerId: 1, createdAt: -1 });

export const Video = mongoose.model("Video", videoSchema);