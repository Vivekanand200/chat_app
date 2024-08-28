import express from 'express';
import { isAuthenticated } from '../middlewares/auth.js';
import { addMembers, deleteChat, getChatDetails, getMessages, getMyChats, getMyGroups, leaveGroup, newGroupChat, removeMember, renameGroup, sendAttachments } from '../controllers/chatController.js';
import { attachmentsMulter } from '../middlewares/multer.js';
import { addMemberValidator, deleteChatValidator, getChatDetailsValidator, getMessagesValidator, leaveGroupValidator, newGroupChatValidator, removeMemberValidator, renameGroupValidator, sendAttachmentsValidator, validateHandler } from '../lib/validators.js';

const router = express.Router();


//After  user is logged in access this routes
router.use(isAuthenticated);

router.post('/new',newGroupChatValidator(),validateHandler, newGroupChat)

router.get('/my',getMyChats)

router.get('/my/groups',getMyGroups)

router.put('/addmembers',addMemberValidator(),validateHandler, addMembers)

router.put('/removemember',removeMemberValidator(),validateHandler,removeMember)

router.delete('/leave/:id',leaveGroupValidator(),validateHandler, leaveGroup);

router.post('/message',attachmentsMulter,sendAttachmentsValidator(),validateHandler,sendAttachments);
//get messages
router.get('/messages/:id',getMessagesValidator(),validateHandler,getMessages);
//get chat details,rename,delete
router.route('/:id')
.get(getChatDetailsValidator(),validateHandler,getChatDetails)
.put(renameGroupValidator(),validateHandler,renameGroup)
.delete(deleteChatValidator(),validateHandler,deleteChat);

export default router;