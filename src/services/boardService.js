import { slugify } from '~/utils/formatters'

const createNew = async (reqBody) => {
  // eslint-disable-next-line no-useless-catch
  try {
    const newBoard = {
      ...reqBody,
      slug: slugify(reqBody.title)
    }

    // Gọi tới tầng Model để xử lí lưu bản ghi newBoard vào trong Database
    // ...

    // Làm thêm các xử lí logic khác với các Collection khác tùy đặc thù dự án ...vv
    // Bắn email, notification về cho admin khi có 1 cái board mới được tạo ...vv

    // Trả kết quả về, trong Service luôn phải có return
    return newBoard
  } catch (error) {
    throw error
  }
}

export const boardService = {
  createNew
}
