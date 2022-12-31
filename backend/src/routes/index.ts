import { Router } from 'express';
import chatBot from './chatbot.routes';
import whatsAppRoutes from './WhatsApp.routes';

const routes = Router();

// Activate user routes
routes.use('/chatbot', chatBot);
routes.use('/v1/whatsAppBot', whatsAppRoutes.router)
export default routes;