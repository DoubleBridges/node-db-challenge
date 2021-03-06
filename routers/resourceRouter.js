import { Router } from 'express'
import { getAll, getOne, makeOne, changeOne, removeOne } from '../data/models/resource-model'
import { validateId, validatePost } from '../middleware/resourceMiddleware';

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