<template>
  <div class="ma-content-block lg:flex justify-between p-4">
    <!-- CRUD 组件 -->
    <ma-crud :options="options" :columns="columns" ref="crudRef">
      <!-- 头像列 -->
      <template #image="{ record }">
        <a-avatar v-if="record.source === 3">
          <img :src="tool.viewImage(record.image)" style="object-fit: cover"/>
        </a-avatar>
        <a-avatar v-if="record.source !== 3">
          <img :src="record.image" style="object-fit: cover"/>
        </a-avatar>
      </template>

      <!-- 状态列 -->
      <template #status="{ record }">
        <a-switch
            :checked-value="1"
            unchecked-value="2"
            @change="switchStatus($event, record.id, 'status')"
            :default-checked="record.status == 1"
        />
      </template>

      <template #card="{ record }">
      <!-- 添加生成SKU按钮 -->
      <div class="flex items-center mt-4">
        <a-button @click="generateSku" type="primary">生成SKU</a-button>
      </div>

      </template>

      <!-- 显示生成的SKU -->
<!--      <div v-if="skuList.length > 0" class="sku-list mt-4">-->
<!--        <div class="sku-item" v-for="(sku, index) in skuList" :key="index">-->
<!--          <span>属性名: {{ sku.name }}, 属性值: {{ sku.value }}</span>-->
<!--        </div>-->
<!--      </div>-->

    </ma-crud>
  </div>
</template>
<script setup>
import {ref, reactive, computed} from 'vue'
import productInfo from '@/api/product/productInfo'
import {Message} from '@arco-design/web-vue'
import tool from '@/utils/tool'
import * as common from '@/utils/common'

const crudRef = ref()

const skuList = ref([]); // 用于存储生成的SKU

const generateSku = () => {
  const formData = crudRef.value.getFormValues(); // 获取表单数据
  if (!formData.specifications || formData.specifications.length === 0) {
    Message.error('请先填写属性名和属性值');
    return;
  }

  const newSku = {
    name: formData.specifications[0].name,
    value: formData.specifications[0].value,
  };

  skuList.value.push(newSku); // 将新生成的SKU添加到列表中
}

const numberOperation = (newValue, id, numberName) => {
  productInfo.numberOperation({id, numberName, numberValue: newValue}).then(res => {
    res.success && Message.success(res.message)
  }).catch(e => {
    console.log(e)
  })
}

const switchStatus = (statusValue, id, statusName) => {
  productInfo.changeStatus({id, statusName, statusValue}).then(res => {
    res.success && Message.success(res.message)
  }).catch(e => {
    console.log(e)
  })
}

const options = reactive({
  id: 'product_manage',
  rowSelection: {
    showCheckedAll: true
  },
  pk: 'id',
  operationColumn: true,
  operationColumnWidth: 160,
  formOption: {
    viewType: 'modal',
    width: 800
  },
  api: productInfo.getList,
  recycleApi: productInfo.getRecycleList,
  add: {
    title: "新增商品",
    show: true,
    api: productInfo.save,
    auth: ['product:manage:save']
  },
  edit: {
    title: "修改商品",
    show: true,
    api: productInfo.update,
    auth: ['product:manage:update']
  },
  delete: {
    show: true,
    api: productInfo.deletes,
    auth: ['product:manage:delete'],
    realApi: productInfo.realDeletes,
    realAuth: ['product:manage:realDeletes']
  },
  recovery: {
    show: true,
    api: productInfo.recoverys,
    auth: ['product:manage:recovery']
  }
})

const columns = reactive([
  {
    title: "商品标识",
    dataIndex: "product_no",
    formType: "input",
    search: true,
    addDisplay: false,
    editDisplay: false,
    width: 150,
  },
  {
    title: "商品名称",
    dataIndex: "name",
    formType: "input",
    search: true,
    commonRules: {
      required: true,
      message: "请输入商品名称"
    },
    width: 150,
  },
  {
    title: "销售价",
    dataIndex: "price",
    formType: "input-number",
    search: false,
    commonRules: {
      required: true,
      message: "请输入商品建议销售价"
    }
  },
  {
    title: "市场价",
    dataIndex: "market_price",
    formType: "input-number",
    search: false,
    commonRules: {
      required: true,
      message: "请输入商品市场价"
    }
  },
  {
    title: "商品库存",
    dataIndex: "sale",
    formType: "input-number",
    min: 0,
    max: 999999,
    modelValue: "number",
    defaultValue: 0,
    search: false,
    commonRules: {
      required: true,
      message: "请输入商品库存"
    }
  },
  {
    title: "商品分组",
    dataIndex: "category_id",
    formType: "select",
    search: true,
    commonRules: {
      required: true,
      message: "请输入分组ID"
    }
  },
  {
    title: "所属品牌",
    dataIndex: "brand_id",
    formType: "select",
    search: true,
    commonRules: {
      required: true,
      message: "请输入品牌ID"
    }
  },
  {
    title: "商品状态",
    dataIndex: "status",
    formType: "select",
    search: true,
    commonRules: {
      required: true,
      message: "请输入商品状态"
    },
    multiple: false,
    dict: {
      data: [
        {
          label: "上架",
          value: "1"
        },
        {
          label: "下架",
          value: "2"
        },
        {
          label: "删除",
          value: "3"
        }
      ],
      translation: true
    }
  },
  {
    title: "商品首图",
    dataIndex: "image",
    formType: "upload",
    commonRules: {
      required: true,
      message: "请输入商品首图"
    },
    type: "image",
    multiple: false,
    onlyData: true,
    onlyUrl: true
  },
  {
    title: "轮播图片",
    dataIndex: "images",
    formType: "upload",
    search: false,
    hide: true,
    commonRules: {
      required: true,
      message: "请输入商品轮播图片"
    },
    type: "image",
    multiple: true,
    onlyData: true,
  },
  {
    title: "商品视频",
    dataIndex: "video",
    formType: "upload",
    search: false,
    multiple: false,
    onlyData: true,
  },
  {
    title: "商品多规格",
    dataIndex: "specifications",
    formType: "children-form",
    customClass: ['mt-3', 'mb-5'],
    formList: [
      {
        title: '属性名',
        dataIndex: 'name',
        formType: 'input',
        rules: [{ required: true, message: '请输入属性名称' }],
      },
      {
        title: '属性值',
        dataIndex: 'value',
        formType: 'input',
        rules: [{ required: true, message: '请输入属性值' }],
      },
    ],
    button: {
      text: '生成SKU',
      action: 'generateSku'
    }
  },
  {
    title: "商品详情",
    dataIndex: "description",
    formType: "editor",
    hide: true,
    commonRules: {
      required: true,
      message: "请输入商品详情"
    }
  },
  {
    title: "上架时间",
    dataIndex: "on_sale_at",
    formType: "range",
    search: true,
    addDisplay: false,
    editDisplay: false,
    showTime: true,
    width: 200,
  },
  {
    title: "创建时间",
    dataIndex: "created_at",
    formType: "range",
    addDisplay: false,
    editDisplay: false,
    showTime: true,
    width: 200,
  },
  {
    title: "修改时间",
    dataIndex: "updated_at",
    formType: "range",
    addDisplay: false,
    editDisplay: false,
    showTime: true,
    width: 200,
  }
])
</script>
<script>export default {name: 'product:manage'} </script>