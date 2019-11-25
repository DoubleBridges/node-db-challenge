import db from '../db-config'
import { convertToBoolean } from '../helpers/projectHelpers';


export const getAll = async (req, res) => {
  try {
    let resources = await db('resource')
    resources = resources.map(resource => convertToBoolean(resource, 'resource'))
    res.status(200).json(resources)
  } catch (err) {
    console.log(err)
    res.status(500).json({
      errorMessage: `${err}`
    })
  }
}

export const getOne = async (req, res) => {
  let resource = req.resource
  res.status(200).json(resource)
}

export const makeOne = async (req, res) => {
  try {
    const resourceData = req.body;
    const newId = await db('resource').insert(resourceData)
    const newResource = await db('resource').where({ id: newId[0] })
    res.status(201).json(newResource)
  } catch (err) {
    console.log(err)
    res.status(500).json({
      errorMessage: `${err}`
    })
  } 
}

export const changeOne = async (req, res) => {
  const id = req.resource.id
  const changes = req.body
  try {
    await db('resource').where('id', id).update(changes)
    const updatedResource = await db('resource').first().where('id', id)
    res.status(200).json(updatedResource)
  } catch (err) {
    console.log(err)
    res.status(500).json({
      errorMessage: `${err}`
    })
  }
}

export const removeOne = async (req, res) => {
  const id = req.resource.id
  console.log(req.resource)
  try {
    await db('resource').where('id', id).del()
    const resource = await db('resource')
    res.status(200).json(resource);
  } catch (err) {
    console.log(err)
    res.status(500).json({
      errorMessage: `${err}`
    })
  }
}