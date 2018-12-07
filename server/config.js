const joi = require('joi')

// Define config schema
const schema = {
  servicePort: joi.number().default(3001),
  env: joi.string().valid('development', 'test', 'production').default('development'),
  host: joi.string().default('127.0.0.1'),
  port: joi.number().default(5432),
  database: joi.string().required(),
  dialect: joi.string().default('postgres'),
  username: joi.string().required(),
  password: joi.string().required()
}

// Build config
const config = {
  servicePort: process.env.PORT,
  env: process.env.NODE_ENV,
  host: process.env.IWS_POSTGRES_HOST,
  port: process.env.IWS_POSTGRES_PORT,
  database: process.env.IWS_POSTGRES_IWS_DATABASE,
  dialect: process.env.IWS_DATABASE_DIALECT,
  username: process.env.IWS_POSTGRES_IWS_USER,
  password: process.env.IWS_POSTGRES_IWS_PASSWORD
}

// Validate config
const result = joi.validate(config, schema, {
  abortEarly: false
})

// Throw if config is invalid
if (result.error) {
  throw new Error(`The server config is invalid. ${result.error.message}`)
}

// Use the joi validated value
const value = result.value

// Add some helper props
value.isDev = value.env === 'development'
value.isProd = value.env === 'production'

module.exports = Object.freeze(value)
