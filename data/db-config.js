import knex from 'knex'
import config from '../knexfile'

const dbConfig = knex(config.development)

export default dbConfig