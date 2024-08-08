import { request } from '@/utils/request.js'

/**
 * 订单列表 API JS
 */

export default {

  /**
   * 获取订单列表分页列表
   * @returns
   */
  getList (params = {}) {
    return request({
      url: 'order/info/index',
      method: 'get',
      params
    })
  },

  /**
   * 读取订单列表
   * @returns
   */
  read (id) {
    return request({
      url: 'order/info/read/' + id,
      method: 'get',
      data
    })
  },

  /**
   * 订单列表导出
   * @returns
   */
  exportExcel (params = {}) {
    return request({
      url: 'order/info/export',
      method: 'post',
      responseType: 'blob',
      params
    })
  },


}