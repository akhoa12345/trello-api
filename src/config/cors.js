import { StatusCodes } from 'http-status-codes'

import { WHITELIST_DOMAINS } from '~/utils/constants'
import { env } from '~/config/environment'
import ApiError from '~/utils/ApiError'

// Cấu hình CORS Option trong dự án thực tế
export const corsOptions = {
  origin: function (origin, callback) {
    // Nếu môi trường là local dev thì cho qua luôn
    if (!origin && env.BUILD_MODE === 'dev') {
      return callback(null, true)
    }

    // Ngược lại thì hiện tại code chúng ta đang làm còn 1 trường hợp là:
    // env.BUILD_MODE === 'production'

    // Kiểm tra xem origin có phải là domain được chấp nhận hay không
    if (WHITELIST_DOMAINS.includes(origin)) {
      return callback(null, true)
    }

    // Cuối cùng nếu domain không được chấp nhận thì trả về lỗi
    return callback(new ApiError(StatusCodes.FORBIDDEN, `${origin} not allowed by our CORS Policy.`))
  },

  // Some legacy browsers (IE11, various SmartTVs) choke on 204
  optionsSuccessStatus: 200,

  // CORS sẽ cho phép nhận cookies từ request, (nếu muốn phát triển hơn chúng ta có thể đính kèm jwt access token và refresh token vào httpOnly Cookies)
  credentials: true
}
