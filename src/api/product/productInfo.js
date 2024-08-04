import { request } from '@/utils/request.js'

/**
 * 商品列表 API JS
 */

export default {

  /**
   * 获取商品列表分页列表
   * @returns
   */
  getList (params = {}) {
    return request({
      url: 'product/manage/index',
      method: 'get',
      params
    })
  },

  /**
   * 添加商品列表
   * @returns
   */
  save (data = {}) {
    return request({
      url: 'product/manage/save',
      method: 'post',
      data
    })
  },

  /**
   * 更新商品列表数据
   * @returns
   */
  update (id, data = {}) {
    return request({
      url: 'product/manage/update/' + id,
      method: 'put',
      data
    })
  },

  /**
   * 读取商品列表
   * @returns
   */
  read (id) {
    return request({
      url: 'product/manage/read/' + id,
      method: 'get',
      data
    })
  },

  /**
   * 将商品列表删除，有软删除则移动到回收站
   * @returns
   */
  deletes (data) {
    return request({
      url: 'product/manage/delete',
      method: 'delete',
      data
    })
  },

  /**
   * 从回收站获取商品列表数据列表
   * @returns
   */
  getRecycleList (params = {}) {
    return request({
      url: 'product/manage/recycle',
      method: 'get',
      params
    })
  },

  /**
   * 恢复商品列表数据
   * @returns
   */
  recoverys (data) {
    return request({
      url: 'product/manage/recovery',
      method: 'put',
      data
    })
  },

  /**
   * 真实删除商品列表
   * @returns
   */
  realDeletes (data) {
    return request({
      url: 'product/manage/realDelete',
      method: 'delete',
      data
    })
  },

  /**
   * 更改商品列表数据
   * @returns
   */
  changeStatus (data = {}) {
    return request({
      url: 'product/manage/changeStatus',
      method: 'put',
      data
    })
  },

  /**
   * 修改商品列表数值数据，自增自减
   * @returns
   */
  numberOperation (data = {}) {
    return request({
      url: 'product/manage/numberOperation',
      method: 'put',
      data
    })
  },


}