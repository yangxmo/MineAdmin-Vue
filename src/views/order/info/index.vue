<template>
  <div class="ma-content-block lg:flex justify-between p-4">
    <!-- CRUD 组件 -->
    <ma-crud :options="options" :columns="columns" ref="crudRef">
    </ma-crud>
  </div>
</template>
<script setup>
import { ref, reactive } from 'vue'
import orderInfo from '@/api/order/orderInfo'
import { Message } from '@arco-design/web-vue'
import tool from '@/utils/tool'
import * as common from '@/utils/common'

const crudRef = ref()




const options = reactive({
  id: 'order_info',
  rowSelection: {
    showCheckedAll: true
  },
  pk: 'id',
  operationColumn: false,
  operationColumnWidth: 160,
  formOption: {
    viewType: 'drawer',
    width: 600
  },
  api: orderInfo.getList,
  export: {
    show: true,
    url: 'order/info/export',
    auth: ['order:info:export']
  }
})

const columns = reactive([
  {
    title: "订单ID",
    dataIndex: "id",
    formType: "input",
    addDisplay: false,
    editDisplay: false,
    hide: true,
    commonRules: {
      required: true,
      message: "请输入订单ID"
    }
  },
  {
    title: "订单编号",
    dataIndex: "order_sn",
    formType: "input",
    search: true,
    addDisplay: false,
    editDisplay: false,
    commonRules: {
      required: true,
      message: "请输入订单编号"
    }
  },
  {
    title: "总金额",
    dataIndex: "order_price",
    formType: "input",
    addDisplay: false,
    editDisplay: false,
    commonRules: {
      required: true,
      message: "请输入总金额"
    }
  },
  {
    title: "优惠金额",
    dataIndex: "order_discount_price",
    formType: "input",
    addDisplay: false,
    editDisplay: false,
    commonRules: {
      required: true,
      message: "请输入优惠金额"
    }
  },
  {
    title: "运费金额",
    dataIndex: "order_freight_price",
    formType: "input",
    addDisplay: false,
    editDisplay: false,
    commonRules: {
      required: true,
      message: "请输入运费金额"
    }
  },
  {
    title: "支付金额",
    dataIndex: "order_pay_price",
    formType: "input",
    addDisplay: false,
    editDisplay: false,
    commonRules: {
      required: true,
      message: "请输入支付金额"
    }
  },
  {
    title: "支付时间",
    dataIndex: "order_pay_time",
    formType: "range",
    search: true,
    addDisplay: false,
    editDisplay: false,
    showTime: true
  },
  {
    title: "关闭时间",
    dataIndex: "order_close_time",
    formType: "range",
    search: true,
    addDisplay: false,
    editDisplay: false,
    showTime: true
  },
  {
    title: "用户ID",
    dataIndex: "order_user_id",
    formType: "input",
    addDisplay: false,
    editDisplay: false,
    hide: true,
    commonRules: {
      required: true,
      message: "请输入用户ID"
    }
  },
  {
    title: "订单类型",
    dataIndex: "order_type",
    formType: "select",
    search: true,
    addDisplay: false,
    editDisplay: false,
    commonRules: {
      required: true,
      message: "请输入订单类型"
    },
    multiple: false,
    dict: {
      data: [
        {
          label: "普通订单",
          value: "1"
        },
        // {
        //   label: "秒杀订单",
        //   value: "2"
        // },
        // {
        //   label: "团购订单",
        //   value: "3"
        // },
      ],
      translation: true
    }
  },
  {
    title: "订单状态",
    dataIndex: "order_status",
    formType: "select",
    search: true,
    addDisplay: false,
    editDisplay: false,
    commonRules: {
      required: true,
      message: "请输入订单状态"
    },
    multiple: false,
    dict: {
      data: [
        {
          label: "未支付",
          value: "1"
        },
        {
          label: "已支付",
          value: "2"
        },
        {
          label: "用户取消",
          value: "3"
        },
        {
          label: "系统取消",
          value: "4"
        },
        {
          label: "待收货",
          value: "5"
        },
        {
          label: "已收货",
          value: "6"
        },
        {
          label: "订单完成",
          value: "7"
        }
      ],
      translation: true
    }
  },
  {
    title: "支付状态",
    dataIndex: "order_pay_status",
    formType: "select",
    search: true,
    addDisplay: false,
    editDisplay: false,
    commonRules: {
      required: true,
      message: "请输入支付状态"
    },
    multiple: false,
    dict: {
      data: [
        {
          label: "未支付",
          value: "1"
        },
        {
          label: "已支付",
          value: "2"
        }
      ],
      translation: true
    }
  },
  {
    title: "退款状态",
    dataIndex: "order_refund_status",
    formType: "select",
    search: true,
    addDisplay: false,
    editDisplay: false,
    commonRules: {
      required: true,
      message: "请输入退款状态"
    },
    multiple: false,
    dict: {
      data: [
        {
          label: "未售后",
          value: "1"
        },
        {
          label: "退货中",
          value: "2"
        },
        {
          label: "退货待确认",
          value: "3"
        },
        {
          label: "退款成功",
          value: "4"
        },
        {
          label: "退款失败",
          value: "5"
        },
        {
          label: "退货拒绝",
          value: "6"
        },
        {
          label: "退货完成",
          value: "7"
        }
      ],
      translation: true
    }
  },
  {
    title: "退款类型",
    dataIndex: "order_refund_type",
    formType: "select",
    search: true,
    addDisplay: false,
    editDisplay: false,
    commonRules: {
      required: true,
      message: "请输入退款类型"
    },
    multiple: false,
    dict: {
      data: [
        {
          label: "全部退款",
          value: "1"
        },
        {
          label: "部分退款",
          value: "2"
        },
        {
          label: "部分退货退款",
          value: "3"
        },
        {
          label: "全部退货退款",
          value: "4"
        }
      ],
      translation: true
    }
  },
  {
    title: "支付方式",
    dataIndex: "order_pay_type",
    formType: "select",
    search: true,
    addDisplay: false,
    editDisplay: false,
    commonRules: {
      required: true,
      message: "请输入支付方式"
    },
    multiple: false,
    dict: {
      data: [
        {
          label: "线下",
          value: "1"
        },
        {
          label: "小程序",
          value: "2"
        },
        {
          label: "App",
          value: "3"
        },
        {
          label: "H5",
          value: "4"
        },
        {
          label: "扫码",
          value: "5"
        },
        {
          label: "Pc",
          value: "6"
        }
      ],
      translation: true
    }
  },
  {
    title: "支付源",
    dataIndex: "order_pay_source",
    formType: "select",
    search: true,
    addDisplay: false,
    editDisplay: false,
    commonRules: {
      required: true,
      message: "请输入支付源"
    },
    multiple: false,
    dict: {
      data: [
        {
          label: "非第三方",
          value: "1"
        },
        {
          label: "农行支付",
          value: "2"
        },
        {
          label: "易办事",
          value: "3"
        },
        {
          label: "银联支付",
          value: "4"
        },
        {
          label: "美的支付",
          value: "5"
        },
        {
          label: "微信官方",
          value: "6"
        },
        {
          label: "支付宝官方",
          value: "7"
        }
      ],
      translation: true
    }
  },
  {
    title: "订单备注）",
    dataIndex: "order_remark",
    formType: "editor",
    addDisplay: false,
    editDisplay: false,
    hide: true
  },
  {
    title: "创建时间",
    dataIndex: "created_at",
    formType: "range",
    search: true,
    addDisplay: false,
    editDisplay: false,
    showTime: true
  },
  {
    title: "更新时间",
    dataIndex: "updated_at",
    formType: "date",
    addDisplay: false,
    editDisplay: false,
    showTime: true
  },
  {
    title: "删除时间",
    dataIndex: "deleted_at",
    formType: "date",
    addDisplay: false,
    editDisplay: false,
    showTime: true
  }
])
</script>
<script> export default { name: 'order:info' } </script>