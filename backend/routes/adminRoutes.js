import express from 'express';
import { adminLogin, adminLogout, getAdminData, getAllChats, getAllMessages, getAllUsers, getDashboardStats } from '../controllers/adminController.js';
import { adminLoginValidator, validateHandler } from '../lib/validators.js';
import { AdminOnly } from '../middlewares/auth.js';

const router = express.Router();




router.post('/verify',adminLoginValidator(),validateHandler,adminLogin);

router.get('/logout',adminLogout);

//Only Admin access these routes

router.use(AdminOnly)

router.get('/',getAdminData);
router.get('/users', getAllUsers);
router.get('/chats', getAllChats);
router.get('/messages',getAllMessages);

router.get('/stats',getDashboardStats);


export default router;