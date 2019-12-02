import db from '../db-config'


export const getAll = async (req, res) => {
  try {
    let contexts = await db('context')
    res.status(200).json(contexts)
  } catch (err) {
    console.log(err)
    res.status(500).json({
      errorMessage: `${err}`
    })
  }
}

export const getOne = async (req, res) => {
  let context = req.context
  res.status(200).json(context)
}

export const makeOne = async (req, res) => {
  try {
    const contextData = req.body;
    const newId = await db('context').insert(contextData)
    const newContext = await db('context').where({ id: newId[0] })
    res.status(201).json(newContext)
  } catch (err) {
    console.log(err)
    res.status(500).json({
      errorMessage: `${err}`
    })
  } 
}

export const changeOne = async (req, res) => {
  const id = req.context.id
  const changes = req.body
  try {
    await db('context').where('id', id).update(changes)
    const updatedContext = await db('context').first().where('id', id)
    res.status(200).json(updatedContext)
  } catch (err) {
    console.log(err)
    res.status(500).json({
      errorMessage: `${err}`
    })
  }
}

export const removeOne = async (req, res) => {
  const id = req.context.id
  console.log(req.context)
  try {
    await db('context').where('id', id).del()
    const context = await db('context')
    res.status(200).json(context);
  } catch (err) {
    console.log(err)
    res.status(500).json({
      errorMessage: `${err}`
    })
  }
}