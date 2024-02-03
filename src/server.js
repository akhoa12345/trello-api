/* eslint-disable no-console */
import express from 'express'
import exitHook from 'async-exit-hook'
import cors from 'cors'

import { CONNECT_DB, CLOSE_DB } from '~/config/mongodb'
import { env } from '~/config/environment'
import { APIs_V1 } from '~/routes/v1'
import { errorHandlingMiddleware } from '~/middlewares/errorHandlingMiddleware'
import { corsOptions } from '~/config/cors'

const START_SERVER = () => {
  const app = express()

  // Xử lí CORS
  app.use(cors(corsOptions))

  // Enable req.body json data
  app.use(express.json())

  // Use APIs v1
  app.use('/v1', APIs_V1)

  // Middleware xử lí lỗi tập trung
  app.use(errorHandlingMiddleware)

  app.listen(env.APP_PORT, env.APP_HOST, () => {
    // eslint-disable-next-line no-console
    console.log(`Hello ${env.AUTHOR}, I am running at http://${ env.APP_HOST }:${ env.APP_PORT }/`)
  })

  // Thực hiện các tác vụ cleanup trước khi dừng server
  // Đọc thêm ở đây: https://stackoverflow.com/questions/14031763/doing-a-cleanup-action-just-before-node-js-exits
  exitHook(async () => {
    console.log('Server is shutting down...')
    await CLOSE_DB()
    console.log('Disconnected server')
  })
}

// Chỉ khi kết nối tới Database thành công thì mới Start Server Back-end lên
// Immediately Invoked / Anonymous Async Function Expression (IIFE)
(async () => {
  try {
    await CONNECT_DB()
    console.log('Connected to MongoDB Atlas Cloud success!')

    // Khởi động server Back-end sau khi Connect Database thành công
    START_SERVER()
  } catch (error) {
    console.error(error)
    process.exit(0)
  }
})()

// Chỉ khi kết nối tới Database thành công thì mới Start Server Back-end lên
// CONNECT_DB()
//   .then(() => console.log('Connected to MongoDB Atlas Cloud success!'))
//   .then(() => START_SERVER())
//   .catch(error => {
//     console.error(error)
//     process.exit(0)
//   })
