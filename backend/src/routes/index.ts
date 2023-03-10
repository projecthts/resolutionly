import { Router } from 'express';
import chatBot from './chatbot.routes';
import whatsAppRoutes from './WhatsApp.routes';
import sentimentAnalysisRoute from './sentimentAnalysis.routes';
import meme from './memes.routes';

const routes = Router();

// Activate user routes
routes.use('/chatbot', chatBot);
routes.use('/v1/whatsAppBot', whatsAppRoutes.router)
routes.use('/sentimentAnalysis', sentimentAnalysisRoute);
routes.use('/meme', meme);

export default routes;