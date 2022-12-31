import { Router } from 'express';
import chatBot from './chatbot.routes';
import sentimentAnalysisRoute from './sentimentAnalysis.routes';

const routes = Router();

// Activate user routes
routes.use('/chatbot', chatBot);
routes.use('/sentimentAnalysis', sentimentAnalysisRoute);

export default routes;