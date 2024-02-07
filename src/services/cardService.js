import { cardModel } from '~/models/cardModel'

const createNew = async (reqBody) => {
  try {
    // Xử lí logic dữ liệu tùy đặc thù dự án
    const newCard = {
      ...reqBody
    }
    // Gọi tới tầng Model để xử lí lưu bản ghi newCard vào trong Database
    const createdCard = await cardModel.createNew(newCard)
    // Lấy bản ghi card sau khi gọi (tùy mục đích dự án mà có cần bước này hay không)
    const getNewCard = await cardModel.findOneById(createdCard.insertedId)

    // ...

    // Trả kết quả về, trong Service luôn phải có return
    return getNewCard
  } catch (error) {
    throw error
  }
}

export const cardService = {
  createNew
}
