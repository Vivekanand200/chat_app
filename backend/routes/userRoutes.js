import express from 'express';
import { Logout, SearchUser, SignIn, SignUp, acceptFriendRequest, getAllNotifications, getMyFriends, getMyProfile, sendFriendRequest } from '../controllers/userController.js';
import { singalAvatar } from '../middlewares/multer.js';
import { isAuthenticated } from '../middlewares/auth.js';
import { acceptFriendRequestValidator, loginValidator, registerValidator, sendFriendRequestValidator, validateHandler } from '../lib/validators.js';

const router = express.Router();

router.post('/signup', singalAvatar, registerValidator(), validateHandler, SignUp);
router.post('/signin', loginValidator(), validateHandler, SignIn);
//After  user is logged in access this routes

router.get('/me', isAuthenticated, getMyProfile);

router.get('/logout', isAuthenticated, Logout);

router.get('/search', isAuthenticated, SearchUser);

router.put('/sendrequest', isAuthenticated, sendFriendRequestValidator(), validateHandler, sendFriendRequest);

router.put('/acceptrequest', isAuthenticated, acceptFriendRequestValidator(), validateHandler, acceptFriendRequest);

router.get('/notifications', isAuthenticated, getAllNotifications);

router.get('/friends', isAuthenticated, getMyFriends);
export default router;