import db from '../data/db-config.js'

export const validateId = async (req, res, next) => {
  try {
    const id = req.params.id;
    const context = await db('context').first().where('id', id)
    if (context) {
      req.context = context;
    }
    else {
      res.status(404).json({
        errorMessage: `ID: ${id} does not exist`
      });
    }
  }
  catch (err) {
    console.log(`validateId ${err}`);
    res.status(500).json({
      errorMessage: `${err}`
    });
  }
  next();
}

export const validatePost = (req, res, next) => {
  const post = req.body
  if (!post.VIN || !post.make || !post.model || !post.mileage) {
    res.status(400).json({
      errorMessage: `Post must contain a VIN, make, model, and mileage`
    })
  } else {
  next()
  }
}