import { Video } from "../models/video_model.js";

export const handleTranscodeComplete = async (req, res) => {
  try {
    const { videoId, status, outputUrl, error } = req.body;

    if (!videoId) {
      return res.status(400).json({ success: false, message: "videoId is required" });
    }

    const video = await Video.findById(videoId);

    if (!video) {
      return res.status(404).json({ success: false, message: "Video not found" });
    }

    if (status === "processing") {
      video.status = "processing";
      await video.save();

      return res.status(200).json({
        success: true,
        message: "Processing started",
      });
    }

    if (status === "completed" && outputUrl) {
      video.transcodedUrl = outputUrl;
      video.status = "ready";
      await video.save();

      return res.status(200).json({
        success: true,
        message: "Transcoding completed successfully",
      });
    }

    if (status === "failed") {
      video.status = "transcode_failed";
      video.errorMessage = error || "Transcoding failed";
      await video.save();

      return res.status(200).json({
        success: true,
        message: "Transcoding failure recorded",
      });
    }

    return res.status(400).json({ success: false, message: "Invalid status" });
  } catch (error) {
    console.error("Worker webhook error:", error);
    return res.status(500).json({ success: false, message: "Internal server error" });
  }
};

export const getVideoStatus = async (req, res) => {
  try {
    const { videoId } = req.params;

    const video = await Video.findById(videoId);

    if (!video) {
      return res.status(404).json({ success: false, message: "Video not found" });
    }

    return res.status(200).json({
      success: true,
      status: video.status,
      transcodedUrl: video.transcodedUrl || null,
      errorMessage: video.errorMessage || null,
    });
  } catch (error) {
    console.error("Status check error:", error);
    return res.status(500).json({ success: false, message: "Internal server error" });
  }
};