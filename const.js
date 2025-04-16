export const imgsrc = 'https://emuchvimg.oss-cn-qingdao.aliyuncs.com/img/2019/1114/bw108h4074217_1573698371_352.png';
export const TYPE_LIST = [
  {
    name: '收单',
    value: 2,
    color: '#A4C6FF'
  },
  {
    name: '出款',
    value: 1,
    color: '#A9DDF5'
  },
  {
    name: '收款',
    value: 3,
    color: '#B0E4C8'
  },
  {
    name: '其他',
    value: 4,
    color: '#F9DAA0'
  },
  {
    name: '',
    value: undefined,
    color: '#fff'
  },
  {
    name: '',
    value: null,
    color: '#fff'
  },
];

export function FormatTimestamp(timestamp) {
  return new Intl.DateTimeFormat('zh-CN', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit'
  }).format(new Date(timestamp))
    .replace(/\//g, '-');
}

export const RANK_LIST = [
  {
    name: 'SA',
    value: '1020',
  },
  {
    name: 'KA',
    value: '1030',
    color: '#A9DDF5'
  },
  {
    name: 'SKA',
    value: '1040',
    color: '#B0E4C8'
  },
  {
    name: 'NORMAL',
    value: '0',
  },
  {
    name: null,
    value: '0',
  },
  {
    name: undefined,
    value: '0',
  }
];

export const TIME_TYPE_LIST = [
  {
    name: '创建时间',
    value: 1,
  },
  {
    name: '第一次报价单生效时间',
    value: 2,
  },
  {
    name: '最后一次报价单生效时间',
    value: 3,
  }
];