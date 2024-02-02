import { StatusCodes } from 'http-status-codes'

import { slugify } from '~/utils/formatters'
import { boardModel } from '~/models/boardModel'
import ApiError from '~/utils/ApiError'

const createNew = async (reqBody) => {
  // eslint-disable-next-line no-useless-catch
  try {
    const newBoard = {
      ...reqBody,
      slug: slugify(reqBody.title)
    }

    // Gọi tới tầng Model để xử lí lưu bản ghi newBoard vào trong Database
    const createdBoard = await boardModel.createNew(newBoard)

    const getNewBoard = await boardModel.findOneById(createdBoard.insertedId)

    // Làm thêm các xử lí logic khác với các Collection khác tùy đặc thù dự án ...vv
    // Bắn email, notification về cho admin khi có 1 cái board mới được tạo ...vv

    // Trả kết quả về, trong Service luôn phải có return
    return getNewBoard
  } catch (error) {
    throw error
  }
}
const getDetails = async (boardId) => {
  // eslint-disable-next-line no-useless-catch
  try {
    const board = await boardModel.getDetails(boardId)
    if (!board) {
      throw new ApiError(StatusCodes.NOT_FOUND, 'Board not found!')
    }
    return board
  } catch (error) {
    throw error
  }
}

export const boardService = {
  createNew,
  getDetails
}
