import {Router} from 'express';
import {protect,adminOnly} from '../middleware/authMiddleware.js';
import {deleteRoom,deleteUser} from '../controllers/adminController.js';
const router=Router(); router.use(protect,adminOnly);
router.delete('/rooms/:id',deleteRoom); router.delete('/users/:id',deleteUser);
export default router;
