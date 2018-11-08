const joi = require('joi')

// Define config schema
const schema = {
  port: joi.number().default(3001),
  env: joi.string().valid('development', 'test', 'production').default('development'),
  postgresUser: joi.string().default('postgres'),
  postgresPassword: joi.string().default('postgres'),
  postgresDatabase: joi.string().required().default('iws'),
  postgresHost: joi.string().default('localhost'),
  postgresPort: joi.number().default(5432),
  dialect: joi.string().default('postgres')
}

// Build config
const config = {
  port: process.env.PORT,
  env: process.env.NODE_ENV,
  postgresUser: process.env.IWS_POSTGRES_IWS_USER,
  postgresPassword: process.env.IWS_POSTGRES_IWS_PASSWORD,
  postgresDatabase: process.env.IWS_POSTGRES_DATABASE,
  postgresHost: process.env.IWS_POSTGRES_HOST,
  postgresPort: process.env.IWS_POSTGRES_HOST_PORT,
  dialect: 'postgres'
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
