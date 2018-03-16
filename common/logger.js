/**
 * transport logs to kalfa when env is production
 */

const winston = require('winston')
winston.transports.Kafka = require('kafka-logger')
winston.level = 'info'

process.env.NODE_ENV == 'development' ? null : function () {
  winston.remove(winston.transports.Console)
  winston.add(winston.transports.Kafka, {
    topic: ''
  })
}()

