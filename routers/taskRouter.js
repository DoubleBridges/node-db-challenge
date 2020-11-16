import { Router } from 'express'
import { getAll, getOne, makeOne, changeOne, removeOne } from '../data/models/task-model'
import { validateId, validatePost } from '../middleware/taskMiddleWare';

const router = Router()

router
  .route('/')
  .get(getAll)
  .post(validatePost, makeOne)

router
  .route('/:id')
  .all(validateId)
  .get(getOne)
  .put(validatePost, changeOne)
  .delete(removeOne)

export default router