import { request } from '@/utils/request.js'

/**
 * 商品品牌 API JS
 */

export default {

  /**
   * 获取商品品牌分页列表
   * @returns
   */
  getList (params = {}) {
    return request({
      url: 'product/brand/index',
      method: 'get',
      params
    })
  },

  /**
   * 添加商品品牌
   * @returns
   */
  save (data = {}) {
    return request({
      url: 'product/brand/save',
      method: 'post',
      data
    })
  },

  /**
   * 更新商品品牌数据
   * @returns
   */
  update (id, data = {}) {
    return request({
      url: 'product/brand/update/' + id,
      method: 'put',
      data
    })
  },

  /**
   * 读取商品品牌
   * @returns
   */
  read (id) {
    return request({
      url: 'product/brand/read/' + id,
      method: 'get'
    })
  },

  /**
   * 将商品品牌删除，有软删除则移动到回收站
   * @returns
   */
  deletes (data) {
    return request({
      url: 'product/brand/delete',
      method: 'delete',
      data
    })
  },

  /**
   * 从回收站获取商品品牌数据列表
   * @returns
   */
  getRecycleList (params = {}) {
    return request({
      url: 'product/brand/recycle',
      method: 'get',
      params
    })
  },

  /**
   * 恢复商品品牌数据
   * @returns
   */
  recoverys (data) {
    return request({
      url: 'product/brand/recovery',
      method: 'put',
      data
    })
  },

  /**
   * 真实删除商品品牌
   * @returns
   */
  realDeletes (data) {
    return request({
      url: 'product/brand/realDelete',
      method: 'delete',
      data
    })
  },

  /**
   * 更改商品品牌数据
   * @returns
   */
  changeStatus (data = {}) {
    return request({
      url: 'product/brand/changeStatus',
      method: 'put',
      data
    })
  },


}