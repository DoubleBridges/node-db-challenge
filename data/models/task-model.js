import db from '../db-config'
import { convertToBoolean } from '../helpers/helpers';


export const getAll = async (req, res) => {
  try {
    let tasks = await db('task')
    tasks = tasks.map(task => convertToBoolean(task, 'task'))
    res.status(200).json(tasks)
  } catch (err) {
    console.log(err)
    res.status(500).json({
      errorMessage: `${err}`
    })
  }
}

export const getOne = async (req, res) => {
  let task = req.task
  let contexts = await db('context').where
  res.status(200).json(convertToBoolean(task, 'task'))
}

export const makeOne = async (req, res) => {
  try {
    const taskData = req.body;
    const newId = await db('task').insert(taskData)
    const newTask = await db('task').where({ id: newId[0] })
    res.status(201).json(newTask)
  } catch (err) {
    console.log(err)
    res.status(500).json({
      errorMessage: `${err}`
    })
  } 
}

export const changeOne = async (req, res) => {
  const id = req.task.id
  const changes = req.body
  try {
    await db('task').where('id', id).update(changes)
    const updatedTask = await db('task').first().where('id', id)
    res.status(200).json(updatedTask)
  } catch (err) {
    console.log(err)
    res.status(500).json({
      errorMessage: `${err}`
    })
  }
}

export const removeOne = async (req, res) => {
  const id = req.task.id
  console.log(req.task)
  try {
    await db('task').where('id', id).del()
    const task = await db('task')
    res.status(200).json(task);
  } catch (err) {
    console.log(err)
    res.status(500).json({
      errorMessage: `${err}`
    })
  }
}