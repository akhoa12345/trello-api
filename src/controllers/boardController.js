import { StatusCodes } from 'http-status-codes'

const createNew = async (req, res, next) => {
  try {
    console.log('req.body: ', req.body)
    console.log('req.query: ', req.query)
    console.log('req.params: ', req.params)
    console.log('req.files: ', req.files)
    console.log('req.cookies: ', req.cookies)
    console.log('req.jwtDecoded: ', req.jwtDecoded)

    // Điều hướng dữ liệu sang tầng Service

    // Có kết quả thì trả về phía Client
    res.status(StatusCodes.CREATED).json({ message: 'POST from Controller: API create new boards' })
  } catch (error) {
    res.status(StatusCodes.UNPROCESSABLE_ENTITY).json({
      errors: error.message
    })
  }
}

export const boardController = {
  createNew
}
