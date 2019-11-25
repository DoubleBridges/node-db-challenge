import db from '../db-config'
import { convertToBoolean } from '../helpers/projectHelpers';


export const getAll = async (req, res) => {
  try {
    let projects = await db('project')
    projects = projects.map(project => convertToBoolean(project, 'project'))
    res.status(200).json(projects)
  } catch (err) {
    console.log(err)
    res.status(500).json({
      errorMessage: `${err}`
    })
  }
}

export const getOne = async (req, res) => {
  let project = req.project
  let tasks = await db('task').where('project_id', project.id)
  let resources = await db('resource').where('project_id', project.id)
  tasks = tasks.map(task => convertToBoolean(task, 'task'))
  project = { ...project, tasks: tasks, resources: resources  }
  res.status(200).json(convertToBoolean(project, 'project'))
}

export const makeOne = async (req, res) => {
  try {
    const projectData = req.body;
    const newId = await db('project').insert(projectData)
    const newProject = await db('project').where({ id: newId[0] })
    res.status(201).json(newProject)
  } catch (err) {
    console.log(err)
    res.status(500).json({
      errorMessage: `${err}`
    })
  } 
}

export const changeOne = async (req, res) => {
  const id = req.project.id
  const changes = req.body
  try {
    await db('project').where('id', id).update(changes)
    const updatedProject = await db('project').first().where('id', id)
    res.status(200).json(updatedProject)
  } catch (err) {
    console.log(err)
    res.status(500).json({
      errorMessage: `${err}`
    })
  }
}

export const removeOne = async (req, res) => {
  const id = req.project.id
  console.log(req.project)
  try {
    await db('project').where('id', id).del()
    const project = await db('project')
    res.status(200).json(project);
  } catch (err) {
    console.log(err)
    res.status(500).json({
      errorMessage: `${err}`
    })
  }
}