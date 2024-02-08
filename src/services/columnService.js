import { boardModel } from '~/models/boardModel'
import { columnModel } from '~/models/columnModel'

const createNew = async (reqBody) => {
  try {
    // Xử lí logic dữ liệu tùy đặc thù dự án
    const newColumn = {
      ...reqBody
    }
    // Gọi tới tầng Model để xử lí lưu bản ghi newColumn vào trong Database
    const createdColumn = await columnModel.createNew(newColumn)
    // Lấy bản ghi column sau khi gọi (tùy mục đích dự án mà có cần bước này hay không)
    const getNewColumn = await columnModel.findOneById(createdColumn.insertedId)

    if (getNewColumn) {
      // Xử lí cấu trúc data ở đây trước khi trả dữ liệu về
      getNewColumn.cards = []

      // Cập nhật mảng columnOrderIds trong collection boards
      await boardModel.pushColumnOrderIds(getNewColumn)
    }

    // Trả kết quả về, trong Service luôn phải có return
    return getNewColumn
  } catch (error) {
    throw error
  }
}

export const columnService = {
  createNew
}