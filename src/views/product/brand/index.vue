<template>
  <div class="ma-content-block lg:flex justify-between p-4">
    <!-- CRUD 组件 -->
    <ma-crud :options="options" :columns="columns" ref="crudRef">
    </ma-crud>
  </div>
</template>
<script setup>
import { ref, reactive } from 'vue'
import productBrand from '@/api/product/productBrand'
import { Message } from '@arco-design/web-vue'
import tool from '@/utils/tool'
import * as common from '@/utils/common'

const crudRef = ref()



const switchStatus = (statusValue, id, statusName) => {
  productBrand.changeStatus({ id, statusName, statusValue }).then( res => {
    res.success && Message.success(res.message)
  }).catch( e => { console.log(e) } )
}


const options = reactive({
  id: 'product_brand',
  rowSelection: {
    showCheckedAll: true
  },
  pk: 'id',
  operationColumn: true,
  operationColumnWidth: 160,
  formOption: {
    viewType: 'modal',
    width: 600
  },
  api: productBrand.getList,
  recycleApi: productBrand.getRecycleList,
  add: {
    show: true,
    api: productBrand.save,
    auth: ['product:brand:save']
  },
  edit: {
    show: true,
    api: productBrand.update,
    auth: ['product:brand:update']
  },
  delete: {
    show: true,
    api: productBrand.deletes,
    auth: ['product:brand:delete'],
    realApi: productBrand.realDeletes,
    realAuth: ['product:brand:realDeletes']
  },
  recovery: {
    show: true,
    api: productBrand.recoverys,
    auth: ['product:brand:recovery']
  }
})

const columns = reactive([
  {
    title: "自增ID",
    dataIndex: "id",
    formType: "input",
    addDisplay: false,
    editDisplay: false,
    hide: true,
    commonRules: {
      required: true,
      message: "请输入自增ID"
    }
  },
  {
    title: "唯一编码",
    dataIndex: "brand_no",
    formType: "input",
    search: true,
    addDefaultValue: tool.generateId(),
    addDisplay: true,
    editDisplay: true,
    disabled: true
  },
  {
    title: "品牌名称",
    dataIndex: "name",
    formType: "input",
    search: true,
    commonRules: {
      required: true,
      message: "请输入品牌名称"
    }
  },
  {
    title: "品牌图片",
    dataIndex: "image",
    formType: "upload",
    type: "image",
    multiple: false
  },
  {
    title: "品牌状态",
    dataIndex: "status",
    formType: "select",
    search: true,
    commonRules: {
      required: true,
      message: "请输入品牌状态"
    },
    dict: {
      data: [
        {
          label: "可用",
          value: "1"
        },
        {
          label: "不可用",
          value: "2"
        }
      ],
      translation: true
    }
  },
  {
    title: "排序",
    dataIndex: "sort",
    formType: "input",
    search: true,
    commonRules: {
      required: true,
      message: "请输入排序"
    }
  },
  {
    title: "创建时间",
    dataIndex: "created_at",
    formType: "range",
    addDisplay: false,
    editDisplay: false,
    showTime: true
  },
  {
    title: "修改时间",
    dataIndex: "updated_at",
    formType: "date",
    addDisplay: false,
    editDisplay: false,
    showTime: true
  },
  {
    title: "",
    dataIndex: "deleted_at",
    formType: "date",
    addDisplay: false,
    editDisplay: false,
    hide: true,
    showTime: true
  }
])
</script>
<script> export default { name: 'product:brand' } </script>