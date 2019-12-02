import db from '../db-config'
import { convertToBoolean, getContext } from '../helpers/helpers';


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
  const tasks = await db('task').where('task.project_id', project.id)
  const resources = await db.select('r.id', 'r.resource_name', 'r.resource_description')
    .from('resource as r')
    .join('project_resource as pr', function () {
      this.on(project.id, '=', 'pr.project_id')
      .andOn('pr.resource_id', '=', 'r.id')
    })
  Promise.all(getContext(tasks, db))
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