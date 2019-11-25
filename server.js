import express from 'express'
import helmet from 'helmet'
import cors from 'cors'
import morgan from 'morgan'

import projectRouter from './routers/projectRouter'
import taskRouter from './routers/taskRouter'
import resourceRouter from './routers/resourceRouter'

const server = express()

server.use(express.json())
server.use(cors())
server.use(helmet())
server.use(morgan('dev'))

server.get('/', (req, res) => {
  res.end('Server is working')
})

server.use('/api/project', projectRouter)
server.use('/api/task', taskRouter)
server.use('/api/resource', resourceRouter)


export default server