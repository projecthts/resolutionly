import { Router } from 'express';
import chatBot from './chatbot.routes';

const routes = Router();

// Activate user routes
routes.use('/chatbot', chatBot);

export default routes;