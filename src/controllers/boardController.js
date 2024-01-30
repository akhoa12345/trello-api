import { StatusCodes } from 'http-status-codes'

const createNew = async (req, res, next) => {
  try {
    // Điều hướng dữ liệu sang tầng Service

    // Có kết quả thì trả về phía Client
    res.status(StatusCodes.CREATED).json({ message: 'POST from Controller: API create new boards' })
  } catch (error) {
    next(error)
  }
}

export const boardController = {
  createNew
}
