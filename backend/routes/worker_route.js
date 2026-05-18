import express from 'express';
import { handleTranscodeComplete, getVideoStatus } from '../controller/worker_controller.js';

const router = express.Router();

router.post('/transcode-complete', handleTranscodeComplete);

router.get('/status/:videoId', getVideoStatus);

export default router;