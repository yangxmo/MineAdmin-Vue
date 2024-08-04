import { request } from '@/utils/request.js'

/**
 * 商品分类 API JS
 */

export default {

  /**
   * 获取商品分类分页列表
   * @returns
   */
  getList (params = {}) {
    return request({
      url: 'product/category/index',
      method: 'get',
      params
    })
  },

  /**
   * 添加商品分类
   * @returns
   */
  save (data = {}) {
    return request({
      url: 'product/category/save',
      method: 'post',
      data
    })
  },

  /**
   * 更新商品分类数据
   * @returns
   */
  update (id, data = {}) {
    return request({
      url: 'product/category/update/' + id,
      method: 'put',
      data
    })
  },

  /**
   * 读取商品分类
   * @returns
   */
  read (id) {
    return request({
      url: 'product/category/read/' + id,
      method: 'get'
    })
  },

  /**
   * 将商品分类删除，有软删除则移动到回收站
   * @returns
   */
  deletes (data) {
    return request({
      url: 'product/category/delete',
      method: 'delete',
      data
    })
  },

  /**
   * 从回收站获取商品分类数据列表
   * @returns
   */
  getRecycleList (params = {}) {
    return request({
      url: 'product/category/recycle',
      method: 'get',
      params
    })
  },

  /**
   * 恢复商品分类数据
   * @returns
   */
  recoverys (data) {
    return request({
      url: 'product/category/recovery',
      method: 'put',
      data
    })
  },

  /**
   * 真实删除商品分类
   * @returns
   */
  realDeletes (data) {
    return request({
      url: 'product/category/realDelete',
      method: 'delete',
      data
    })
  },

  /**
   * 更改商品分类数据
   * @returns
   */
  changeStatus (data = {}) {
    return request({
      url: 'product/category/changeStatus',
      method: 'put',
      data
    })
  },

  /**
   * 修改商品分类数值数据，自增自减
   * @returns
   */
  numberOperation (data = {}) {
    return request({
      url: 'product/category/numberOperation',
      method: 'put',
      data
    })
  },


}