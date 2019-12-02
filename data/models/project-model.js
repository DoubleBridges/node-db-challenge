import db from '../db-config'
import { convertToBoolean } from '../helpers/helpers';


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
  let tasks = await db('task').where('task.project_id', project.id)
  let resources = await db.select('pr.id', 'pr.resource_id', 'r.resource_name', 'r.resource_description', 'pr.project_id')
    .from('resource as r')
    .join('project_resource as pr', function () {
      this.on(project.id, '=', 'pr.project_id')
      .andOn('pr.resource_id', '=', 'r.id')
    })
  const getContext = tasks.map(async task => {
    const contexts = await db.select('c.context_name', 'c.context_description')
      .from('context as c')
      .join('task_context as tc', function () {
        this.on(task.id, '=', 'tc.task_id')
        .andOn('tc.context_id', '=', 'c.id')
      })
    convertToBoolean(task, 'task')
    return { ...task, contexts: contexts }
  })
  Promise.all(getContext)
    .then(result => {
      project = { ...project, tasks: result, resources: resources  }
      res.status(200).json(convertToBoolean(project, 'project'))    
  })

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