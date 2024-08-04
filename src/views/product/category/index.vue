<template>
  <div class="ma-content-block lg:flex justify-between p-4">
    <!-- CRUD 组件 -->
    <ma-crud :options="options" :columns="columns" ref="crudRef">
    </ma-crud>
  </div>
</template>
<script setup>
import { ref, reactive } from 'vue'
import productCategory from '@/api/product/productCategory'
import { Message } from '@arco-design/web-vue'
import tool from '@/utils/tool'
import * as common from '@/utils/common'

const crudRef = ref()


const numberOperation = (newValue, id, numberName) => {
  productCategory.numberOperation({ id, numberName, numberValue: newValue }).then( res => {
    res.success && Message.success(res.message)
  }).catch( e => { console.log(e) } )
}

const switchStatus = (statusValue, id, statusName) => {
  productCategory.changeStatus({ id, statusName, statusValue }).then( res => {
    res.success && Message.success(res.message)
  }).catch( e => { console.log(e) } )
}


const options = reactive({
  id: 'product_category',
  rowSelection: {
    showCheckedAll: true
  },
  pk: 'id',
  operationColumn: true,
  operationColumnWidth: 160,
  formOption: {
    viewType: 'drawer',
    width: 600
  },
  api: productCategory.getList,
  recycleApi: productCategory.getRecycleList,
  add: {
    show: true,
    api: productCategory.save,
    auth: ['product:category:save']
  },
  edit: {
    show: true,
    api: productCategory.update,
    auth: ['product:category:update']
  },
  delete: {
    show: true,
    api: productCategory.deletes,
    auth: ['product:category:delete'],
    realApi: productCategory.realDeletes,
    realAuth: ['product:category:realDeletes']
  },
  recovery: {
    show: true,
    api: productCategory.recoverys,
    auth: ['product:category:recovery']
  }
})

const columns = reactive([
  {
    title: "",
    dataIndex: "id",
    formType: "input",
    addDisplay: false,
    editDisplay: false
  },
  {
    title: "分类标识",
    dataIndex: "category_no",
    formType: "input",
    search: true,
    addDefaultValue: () => {
      return tool.generateId()
    },
    addDisplay: true,
    editDisplay: true,
    disabled: true
  },
  {
    title: "上级编码",
    dataIndex: "parent_no",
    formType: "select",
    search: true
  },
  {
    title: "品牌编码",
    dataIndex: "brand_no",
    formType: "select",
    search: true,
    commonRules: {
      required: true,
      message: "请输入品牌编码"
    },
    dict: { url: 'product/brand/list', props: { label: 'name', value: 'brand_no' } }
  },
  {
    title: "分组名称",
    dataIndex: "title",
    formType: "input",
    search: true,
    commonRules: {
      required: true,
      message: "请输入分组名称"
    }
  },
  {
    title: "分组图片",
    dataIndex: "image",
    formType: "upload",
    commonRules: {
      required: true,
      message: "请输入分组图片"
    },
    type: "image",
    multiple: false,
    onlyData: true,
    onlyUrl: true
  },
  {
    title: "商品总数",
    dataIndex: "feed_count",
    formType: "input",
    addDisplay: false,
    editDisplay: false
  },
  {
    title: "分组状态",
    dataIndex: "status",
    formType: "select",
    search: true,
    commonRules: {
      required: true,
      message: "请输入分组状态"
    },
    multiple: false,
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
    title: "分类排序",
    dataIndex: "sort",
    formType: "input",
    search: true,
    commonRules: {
      required: true,
      message: "请输入分类排序"
    }
  },
  {
    title: "创建时间",
    dataIndex: "created_at",
    formType: "date",
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
<script> export default { name: 'product:category' } </script>