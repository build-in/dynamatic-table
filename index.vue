<template>
    <div class="page-container-360">
       <el-card class="box-card">
           <div slot="header" class="clearfix">
             <div class="header-content">
                <div class="left">
                    <Avara />
                    <!-- <img :src="defaultImg" alt="" /> -->
                </div>
                <div class="right">
                    <div class="top">
                        <div class="title">{{ summeryInfo.groupName || '-'}}</div>
                        <div class="rank">
                            <merchant-ranking :rankLevel="getRank(summeryInfo.groupLevel)" showTips="0" />
                        </div>
                        <el-dropdown trigger="hover" @command="handleCommand">
                            <div class="change-btn">
                                <el-button icon="el-icon-sort" size="mini" round>切换集团</el-button>
                            </div>
                        <template>
                            <el-dropdown-menu  slot="dropdown">
                                <div class="search-input">
                                    <el-input v-model="searchQuery" placeholder="搜索选项" @input="filterOptions">
                                    <i slot="prefix" class="el-input__icon el-icon-search"></i>
                                    </el-input>
                                </div>
                                <el-dropdown-item 
                                    v-for="option in filteredOptions" 
                                    :key="option.groupNo" 
                                    :command="option">
                                    <div class="merchant-choose-dropdown">
                                        <div class="merchant-choose-left">
                                            <!-- <img :src="defaultImg" alt="" /> -->
                                            <Avara />
                                        </div>
                                        <div class="merchant-choose-right">
                                            <div>{{option.groupName || ''}}</div>
                                            <div>{{option.groupNo || ''}}</div>
                                        </div>
                                    </div>
                                </el-dropdown-item>
                            </el-dropdown-menu>
                        </template>
                    </el-dropdown>
                    </div>
                    <div class="bottom">
                        <div>首笔成交日期：{{summeryInfo.firstTransactionDate | formatTime }}</div>
                        <div>客户数：{{ summeryInfo.customerNum || 0 }}</div>
                        <div>商户号数：{{ summeryInfo.merchantNum || 0 }}</div>
                        <div>近一年交易国家：{{ summeryInfo.transactionCountryNum || 0 }}</div>
                    </div>
                </div>
             </div>
           </div>
           <div class="body-content">
            <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal">
                <el-menu-item index="1" disabled>运营</el-menu-item>
                <el-menu-item index="2">集团档案</el-menu-item>
            </el-menu>
           </div>
       </el-card>
       <div class="group-portrait">
        <el-card class="box-card">
            <h3>集团画像</h3>
            <div class="serach">
                <el-form class="search-single-form" ref="searchForm" :inline="true" :model="formData">
                    <el-row style="display: flex;">
                        <!--  客户  -->
                        <el-form-item :style="language == 'cn'? 'width:116px' :' width:125px'" prop="customer">
                            <el-select 
                                v-model="formData.customer" 
                                placeholder="客户" 
                                filterable 
                                clearable
                                multiple
                                @change="updateTable">
                              <el-option v-for="item in selectData.customer" :key="item.value" :value="item.value">
                               <div class="merchant-choose">
                                    <div class="merchant-choose-left">
                                        <!-- <img :src="defaultImg" alt="" /> -->
                                        <Avara />
                                </div>
                                <div class="merchant-choose-right">
                                    <div>{{item.label}}</div>
                                    <div>{{item.value}}</div>
                                </div>
                               </div>
                              </el-option>
                            </el-select>
                        </el-form-item>
                           <!--  商户  -->
                        <el-form-item :style="language == 'cn'? 'width:116px' :' width:125px'" prop="merchant">
                            <el-select 
                                v-model="formData.merchant" 
                                placeholder="商户" 
                                clearable 
                                multiple
                                @change="updateTable">
                                <el-option v-for="item in selectData.merchant" :key="item.value" :value="item.value">
                                    <div class="merchant-choose">
                                            <div class="merchant-choose-left">
                                                <!-- <img :src="defaultImg" alt="" /> -->
                                                <Avara />
                                        </div>
                                        <div class="merchant-choose-right">
                                            <div>{{item.label}}</div>
                                            <div>{{item.value}}</div>
                                        </div>
                                    </div>
                              </el-option>
                            </el-select>
                        </el-form-item>
                           <!--  行业  -->
                        <el-form-item :style="language == 'cn'? 'width:116px' :' width:125px'" prop="industry">
                            <el-select 
                                v-model="formData.industry"
                                placeholder="行业" 
                                clearable 
                                multiple
                                @change="updateTable">
                                <el-option v-for="item in selectData.industry" :label="item.label" :value="item.value" :key="item.value" />
                            </el-select>
                        </el-form-item>
                        <!--  产品/APP名  -->
                        <el-form-item :style="language == 'cn'? 'width:116px' :' width:125px'" prop="app">
                            <el-select 
                                v-model="formData.app" 
                                placeholder="产品/APP名" 
                                clearable 
                                multiple
                                @change="updateTable">
                                <el-option v-for="item in selectData.app" :label="item.label" :value="item.value" :key="item.value" />
                            </el-select>
                        </el-form-item>
                         <!--  交易类型  -->
                         <el-form-item :style="language == 'cn'? 'width:116px' :' width:125px'" prop="trade_type">
                            <el-select 
                                v-model="formData.trade_type" 
                                placeholder="交易类型" 
                                clearable 
                                multiple
                                @change="updateTable">
                                <el-option v-for="item in selectData.trade_type" :label="item.label" :value="item.value" :key="item.value" />
                            </el-select>
                        </el-form-item>
                         <!--  报价单编号 -->
                         <el-form-item :style="language == 'cn'? 'width:116px' :' width:125px'" prop="quotation">
                            <el-select 
                                v-model="formData.quotation" 
                                placeholder="报价单编号" 
                                clearable 
                                multiple
                                @change="updateTable">
                                <el-option v-for="item in selectData.quotation" :label="item.label" :value="item.value" :key="item.value" />
                            </el-select>
                        </el-form-item>
                        <div class="search-bottom-btn">
                            <el-button  size="mini" circle @click="reFresh">
                                <FreashSvg />
                            </el-button>
                        </div>
                    </el-row>
                    <el-row style="display: flex;">
                        <!-- 创建时间 -->
                        <el-form-item class="timepick-width-prepend">
                            <div class="timepick-width-prepend">
                                <div slot="label" class="timepick-prepend">
                                    <el-select 
                                        v-model="formData.timeType" 
                                        :style="language == 'cn'? 'width:116px' :' width:155px'" 
                                        class="prepend-text" 
                                        @change="updateTable">
                                        <el-option 
                                            v-for="item in TIME_TYPE_LIST" 
                                            :label="item.name" 
                                            :value="item.value" 
                                            :key="item.value" />
                                    </el-select>
                                </div>
                                <MMCPicker
                                :start-time.sync="startTime"
                                :end-time.sync="endTime"
                                type="datetimerange"
                                class="prepend-data-picker"
                                clearable
                                @change="updateTable" />
                            </div>
                        </el-form-item>
                    </el-row>
                </el-form>
            </div>
            <div class="serach-table">
                <el-table
                    :data="userCustomerDetailList"
                    style="width: 100%"
                    :expand-row-keys="expandRowKeys"
                    row-key="customerNo"
                    id="groupTable"
                    >
                    <el-table-column type="expand">
                    <template slot-scope="props">
                        <el-form label-position="left" inline class="demo-table-expand">
                                <div class="demo-table-expand-li" v-for="item in props.row.merchantInfoVOList" :key="item.merchantNo">
                                    <div class="content-li">
                                        <div class="client">
                                            <div class="left">
                                                <!-- <img :src="defaultImg" alt=""> -->
                                                <!-- <div class="client-name">
                                                    <div>{{ item.merchantName.charAt(0) || '' }}</div>
                                                </div> -->
                                                <Avara />
                                            </div>
                                            <div class="right">
                                                <div>
                                                    <span>{{ item.merchantName }}</span>
                                                    <span><el-button  @click="copyText(item.merchantName)" type="default" size="mini" icon="el-icon-document-copy" /></span>
                                                </div>
                                                <div>
                                                    <span>{{ item.merchantNo }}</span>
                                                    <span><el-button  @click="copyText(item.merchantNo)" type="default" size="mini" icon="el-icon-document-copy" /></span>
                                                </div>    
                                            </div>
                                        </div>
                                        <div class="work">{{item.industryCnName}}</div>
                                        <div class="product">{{item.appName}}</div>
                                        <div class="create-time">{{item.createTime | formatTime}}</div>
                                        <div class="trade">
                                            <div class="trade-container" v-if="item.tradeType && item.tradeType.length">
                                                <div :style="{ backgroundColor: TYPE_LIST[item - 1 ].color } " v-for="item in item.tradeType" :key="item">
                                                   {{ TYPE_LIST[item - 1].name }}
                                                </div>
                                            </div>
                                        </div>
                                        <div class="trade-order">{{item.merchantNo || '-'}}</div>
                                        <div class="real-time">
                                            <div>第一次：{{item.quotationFirstEffectiveDate | formatTime}} </div>
                                            <div>第二次：{{item.quotationLastEffectiveDate | formatTime}} </div>
                                        </div>
                                    </div>
                                </div>
                        </el-form>
                    </template>
                    </el-table-column>
                    <el-table-column
                    label="商户号"
                    width="229"
                    prop="merchantNo">
                    <template slot-scope="scope">
                        <div class="table-header-item">
                            <div class="left">
                                <Avara />
                            </div>
                            <div class="right">
                                <div>{{ scope.row.customerName }}</div>
                                <div>{{ scope.row.customerNo }}</div>
                            </div>
                        </div>
                    </template>
                    </el-table-column>
                    <el-table-column
                    label="行业"
                    width="109"
                    prop="none">
                    </el-table-column>
                    <el-table-column
                    label="产品/APP名"
                    width="109"
                    prop="none">
                    </el-table-column>
                    <el-table-column
                    label="创建时间"
                    width="143"
                    prop="none">
                    </el-table-column>
                    <el-table-column
                    label="交易类型"
                    width="190"
                    prop="none">
                    </el-table-column>
                    <el-table-column
                    label="报价单编号"
                    width="143"
                    prop="none">
                    </el-table-column>
                    <el-table-column
                    label="报价单生效时间"
                    width="201"
                    prop="none">
                    </el-table-column>
                </el-table>
            </div>
        </el-card>
       </div>
    </div>
</template>
<script>
import { getGroupCustomerDetailInfo, getGroupListInfo, getGroupSummaryInfo } from '@/api/newMerchantServiceApi'
import MerchantRanking from '@/components/MerchantRanking';
import MMCPicker from '@/components/Date/rangePicker';
import { mapState, mapGetters } from 'vuex';
import { throttle } from 'lodash';
import { imgsrc, FormatTimestamp, TYPE_LIST, RANK_LIST, TIME_TYPE_LIST } from './const';
import FreashSvg from './components/fresh.vue';
import Avara from './components/avara.vue';

export default {
    name: "groupDetail",
    components: {
        MerchantRanking,
        MMCPicker,
        FreashSvg,
        Avara,
    },
    data() {
        return {
            groupNo: "",
            // shareId: "",
            groupInfo: {},
            loading: {
                pageOk: false,
            },
            dialogRelationMerchant:false,
            customerList: [],
            dict: {},
            activeIndex: '2',
            formData: {
                customer: [], // 客户
                merchant: [], // 商户
                industry: [], // 行业
                app: [], // 产品/APP名
                trade_type: [], // 交易类型
                quotation: [], // 报价单编号
                timeType: 1,
            },
            selectData: {
                customer: [], // 客户
                merchant: [], // 商户
                industry: [], // 行业
                app: [], // 产品/APP名
                trade_type: [], // 交易类型
                quotation: [], // 报价单编号
            },
            startTime: '', // this.getDefaultDate().startDate,
            endTime: '', // this.getDefaultDate().endDate,
            expandRowKeys: [],
            defaultImg: imgsrc,
            orderList: [{
                    value: 'PROCESS',
                    label: '处理中',
                    labelEn: 'In progress'
                },
                {
                    value: 'FINISHED',
                    label: '已完成',
                    labelEn: 'Completed'
                },
                {
                    value: 'WAIT_MATERIAL',
                    label: '待补充材料',
                    labelEn: 'Pending Additional Materials'
                },
                {
                    value: 'CONFIRMING',
                    label: '待验收',
                    labelEn: 'Pending Confirmation'
                },
            ],
            options: [],
            searchQuery: '',
            filteredOptions: [],
            summeryInfo:{},
            userCustomerDetailList: [],
            userDateSearchOption: {},
            userOptionList:{},
            TYPE_LIST,
            TIME_TYPE_LIST,
        }
    },
    filters: {
        formatTime: function (val){
            if (!val) return '-';
            return  FormatTimestamp(val)
        }
    },
    created() {
        this.initType();
        this.initGroupInfo();
    },
    activated() {
        this.initType();
    },
    computed: {
        ...mapState('d2admin/profile', [
        'language',
        'platformTimezone',
        ])
    },
    methods: {
        handleCommand(command){
            this.changeHistory(command.groupNo);
            this.updateTable(command.groupNo);
            this.initGroupInfo(command.groupNo);
        },
        changeHistory(commandNo){
            const url = new URL(window.location.href).href.replace(/groupNo=[^&]*/, `groupNo=${commandNo}`) || '';
            if(url){
                history.pushState(null, null, url);
            }
        },
        getRank(name){
            const rank = RANK_LIST.find(item => item.name === name) || {};
            return rank.value || '';
        },
        copyText(text) {
            const textarea = document.createElement('textarea')
            textarea.value = text
            document.body.appendChild(textarea)
            textarea.select()
            document.execCommand('copy')
            document.body.removeChild(textarea)
            this.$message.success('复制成功')
        },
        // 过滤集团列表
        filterOptions() {
            if (this.searchQuery === '') {
                this.filteredOptions = this.options;
            } else {
                this.filteredOptions = this.options.filter(opt => opt.groupName.includes(this.searchQuery));
            }
        },
        // 设置默认时间为上个月
        getDefaultDate() {
            const date = new Date();
            const y = date.getFullYear();
            const m = date.getMonth();
            const d = date.getDate() + 1;
            return {
                'startDate': new Date(y, m, d - 30, 0, 0, 0),
                'endDate': new Date(y, m, d, 0, 0, 0),
            };
        },
        queryOrderThrottle: throttle(function() {
            this.updateTable();
        }, 1000, { leading: false, trailing: true }),
        onResetForm() {
            this.$refs.searchForm.resetFields();
            this.startTime = '';
            this.endTime = '';
            this.updateTable();
            this.initGroupInfo();
        },
        // 集团摘要信息
        initGroupInfo(changeHasNo = '') {
            return new Promise((resolve, reject) => {
                let queryData = {
                    // shareId: this.shareId,
                    groupNo: changeHasNo? changeHasNo : this.groupNo,
                    isNeedCustomerInfo: true,
                }
                getGroupSummaryInfo(queryData).then(resp => {
                    this.summeryInfo = resp.data && resp.data.data || {};
                    resolve();
                }).catch(() => {
                    const mock = {
                        "customerNum": 3222,
                        "firstTransactionDate": 1744782681000,
                        "groupLevel": "KA",
                        "groupName": "资本主义集团",
                        "merchantNum": 199,
                        "transactionCountryNum": 234
                    }
                    this.summeryInfo = mock;
                    reject();
                });
            });
        },
        // 列表信息
        updateTable(changHasNo = '') {
            return new Promise((resolve, reject) => {
                const result = [];
                for (let key in this.formData) {
                    if(key === 'timeType'){
                        // nothing can do
                    }else{
                        result.push({
                            searchObject: key,
                            searchValueList: this.formData[key]? this.formData[key] :[],
                        });
                    }
                }
                let queryData = {
                    groupNo: changHasNo ? changHasNo : this.groupNo,
                    dateSearchOption: {
                        dateType: this.formData.timeType,
                        startDate: this.startTime,
                        endDate: this.endTime,
                    },
                    searchOptionList: [...result],
                }
                getGroupCustomerDetailInfo(queryData).then(resp => {
                   // 列表数据 + 下拉选项数据 + 时间数据
                   const { customerDetailList =[], dateSearchOption ={}, optionList = [] } = resp.data && resp.data.data || {};
                   this.userCustomerDetailList = customerDetailList;
                   this.userDateSearchOption = dateSearchOption;
                   this.userOptionList = optionList;
                   this.expandRowKeys = [this.userCustomerDetailList[0].customerNo];
                   console.log(customerDetailList, dateSearchOption, optionList, 'Init info message', this.expandRowKeys, ' this.expandRowKeys')
                    resolve();
                }).catch(() => {
                    reject();
                    /***********  mock ************************/
                    this.userCustomerDetailList = [
                        {
                            "customerName": "刘虹邑是谁",
                            "customerNo": "Pcbeibcieb7283723",
                            "merchantInfoVOList": [
                                {
                                    "appName": "露娜在哪里",
                                    "createTime": 1744709179000,
                                    "industryCnName": "数据啥打算",
                                    "merchantName": "溧阳夫妻店",
                                    "merchantNo": "X998732897e982793",
                                    "productType": 0,
                                    "quotationFirstEffectiveDate": 1744709179000,
                                    "quotationLastEffectiveDate": 1744709179000,
                                    "quotationNo": "hdui3h79273927932",
                                    "tradeType": [1,2]
                                },
                                {
                                    "appName": "露娜在哪里",
                                    "createTime": 1744709179000,
                                    "industryCnName": "数据啥打算",
                                    "merchantName": "小爸爸夫妻店",
                                    "merchantNo": "Y998732897e982793",
                                    "productType": 0,
                                    "quotationFirstEffectiveDate": 1744709179000,
                                    "quotationLastEffectiveDate": 1744709179000,
                                    "quotationNo": "hdui3h79273927932",
                                    "tradeType": [1,2,3,4]
                                }
                            ]
                        },
                        {
                            "customerName": "你爸是李刚",
                            "customerNo": "Pcbeibcieb7283729",
                            "merchantInfoVOList": [
                                {
                                    "appName": "他妈是王兰",
                                    "createTime": 1744709179000,
                                    "industryCnName": "数据啥打算",
                                    "merchantName": "王小虎夫妻店",
                                    "merchantNo": "Z998732897e982793",
                                    "productType": 0,
                                    "quotationFirstEffectiveDate": 1744709179000,
                                    "quotationLastEffectiveDate": 1744709179000,
                                    "quotationNo": "hdui3h79273927932",
                                    "tradeType": [1,2]
                                },
                                {
                                    "appName": "你叔是小嘎",
                                    "createTime": 1744709179000,
                                    "industryCnName": "数据啥打算",
                                    "merchantName": "大老王夫妻店",
                                    "merchantNo": "M998732897e982793",
                                    "productType": 0,
                                    "quotationFirstEffectiveDate": 1744709179000,
                                    "quotationLastEffectiveDate": 1744709179000,
                                    "quotationNo": "hdui3h79273927932",
                                    "tradeType": [1,2,3]
                                }
                            ]
                        }
                    ];
                    this.expandRowKeys = [this.userCustomerDetailList[0].customerNo];
                    this.userDateSearchOption = {
                        "dateType": 1,
                        "endDate": this.getDefaultDate().startDate,
                        "startDate": this.getDefaultDate().endDate,
                    };
                    this.userOptionList = [
                        {
                            searchObject: "customer",
                            searchValueList: [{
                                        "open": true,
                                        "label":'好人',
                                        "value": "11"
                                    },
                                    {
                                        "open": false,
                                        "label":'坏人人',
                                        "value": "12"
                                    }]
                        },
                        {
                            searchObject: "merchant",
                            searchValueList: [{
                                        "open": false,
                                        "label":'好5人',
                                        "value": "11"
                                    },
                                    {
                                        "open": true,
                                        "label":'坏8人人',
                                        "value": "12"
                                    }]

                        },
                        {
                            searchObject: "industry",
                            searchValueList: [{
                                        "open": false,
                                        "label":'好6人',
                                        "value": "11"
                                    },
                                    {
                                        "open": true,
                                        "label":'8人人',
                                        "value": "12"
                                    }]
                        },
                        {
                            searchObject: "app",
                            searchValueList: [{
                                        "open": true,
                                        "label":'5好6人',
                                        "value": "11"
                                },
                                {
                                    "open": false,
                                    "label":'88人人',
                                    "value": "12"
                                }]
                        },
                        {
                            searchObject: "trade_type",
                            searchValueList: [{
                                        "open": true,
                                        "label":'b好6人',
                                        "value": "11"
                                },
                                {
                                    "open": false,
                                    "label":'68人人',
                                    "value": "12"
                                }]
                        },
                        {
                            searchObject: "quotation",
                            searchValueList: [{
                                        "open": false,
                                        "label":'版本b好6人',
                                        "value": "11"
                                },
                                {
                                    "open": false,
                                    "label":'你今年68人人',
                                    "value": "12"
                                }]
                    }];
                    /***********  mock ************************/

                    // 下拉选项数据 + 下拉数据选中填充（不包含时间）
                    this.userOptionList.forEach((option) => {
                        const { searchObject, searchValueList } = option;
                        if (this.selectData.hasOwnProperty(searchObject)) {
                            this.selectData[searchObject] = searchValueList;
                            const allData = searchValueList.map(item => item.open == true ? item.value : null)
                            const allNull = allData.every(item => item === null)
                            // 处理没有选中的数据
                            if(allNull){
                                this.formData[searchObject] = [];
                            }else{
                                this.formData[searchObject] = searchValueList.map(item => item.open == true ? item.value : null);
                            }
                        }
                    });
                    console.log(this.formData, '12345686')

                    // 处理时间下拉
                    this.formData.timeType = this.userDateSearchOption.dateType ? parseInt(this.userDateSearchOption.dateType) : 1;
                    this.startTime = this.userDateSearchOption.startDate;
                    this.endTime = this.userDateSearchOption.endDate;
                });
            });
        },
        reFresh(){
            this.formData = {
                customer: [],
                merchant: [],
                industry:[],
                app:[],
                trade_type: [],
                quotation: [],
                timeType: 1,
                startTime:'',
                endTime:'',
            };
            this.updateTable();
        },
        relationMerchantShow(app) {
            this.curApp = app;
            this.dialogRelationMerchant = true;
        },
        customerDetail(row) {
            this.$router.push({
                name: "customerDetail",
                query: {
                    customerNo: row.customerNo,
                    activeTab: "customerInfo",
                }
            });
        },
        handleClick(tab, event) {
            console.log(tab, event);
        },
        initType() {
            const query = this.$route.query || {};
            this.groupNo = query.groupNo || '';
            // this.shareId = query.shareId || '';
            this.initQueryGroupInfo();
            this.updateTable();
        },
        // 切换集团按钮
        initQueryGroupInfo() {
            return new Promise((resolve, reject) => {
                let queryData = {
                    // shareId: this.shareId,
                    isNeedCustomerInfo: true,
                }
                getGroupListInfo(queryData).then(resp => {
                    this.options = resp.data && resp.data.data || {};
                    this.filteredOptions = this.options;
                    console.log("this.options", this.options)
                    resolve();
                }).catch(() => {
                    // MOCK Test
                    const mock =[
                        {
                        "groupName": "老人",
                        "groupNo": "1HJBSHJbcjhdbsbkb"
                        },
                        {
                        "groupName": "小孩",
                        "groupNo": "2HJBSHJbcjhdbsbkb"
                        },
                        {
                        "groupName": "大胖",
                        "groupNo": "3HJBSHJbcjhdbsbkb"
                        },
                        {
                        "groupName": "小王八",
                        "groupNo": "4HJBSHJbcjhdbsbkb"
                        },
                        {
                        "groupName": "你奶奶的腿",
                        "groupNo": "5HJBSHJbcjhdbsbkb"
                        },
                    ]
                    this.options = mock;
                    this.filteredOptions = this.options;
                    reject();

                });
            });
        },
    }

}
</script>

<style lang='scss'>
    .is-multiple{
        .el-scrollbar{
            .el-select-dropdown.is-multiple .el-select-dropdown__item.selected::after{
                top: 17px !important;
            }
        .el-select-dropdown__item{
            height: 55px !important;
            line-height: 20px !important;
            display: flex;
            align-items: center;
        }
        .merchant-choose{
            display: flex;
            align-items: center;
            .merchant-choose-left{
                img{
                    width: 24px;
                    height: 24px;
                    border-radius: 6px;
                    object-fit: cover;
                }
            }
            .merchant-choose-right{
                margin-left: 5px;
            }
        }
    }
   }
.search-input{
    width: 90%;
    margin: 10px 10px;
}
.merchant-choose-dropdown{
    display: flex;
    padding-top: 6px;
    justify-content: start;
    .merchant-choose-left{
        img{
            width: 24px;
            height: 24px;
            border-radius: 6px;
            object-fit: cover;
        }
    }
    .merchant-choose-right{
        margin-left: 5px;
        margin-top: -6px;
        display: flex;
        flex-direction: column;
        justify-content: center;
        div{
           line-height: 13px !important;
        }
    }
    .el-dropdown-menu--medium .el-dropdown-menu__item {
            line-height: 20px;
            padding: 0 17px;
            font-size: 14px;
        }
    }
.page-container-360{
    .box-card{
        width: 90%;
        margin-left: 5%;
        margin-top: 20px;
    }
    .header-content{
        display: flex;
        align-items: center;
        .left{
            img {
                width: 48px;
                height: 48px;
                border-radius: 48px;
                object-fit: cover;
            }
        }
        .right{
            margin-left: 8px;
        }
        .top{
            display: flex;
            align-items: start;
            justify-content: start;
            .change-btn{
                margin-left: 10px;
            }
            .title{
                font-size: 20px;
                font-weight: 600;
                color: #1B1D1F;
            }
            .rank{
                margin-left: 10px;
                margin-top: 3px;
            }
            img{
                width: 50px;
                object-fit: cover;
            }
            button{
                color: #0C71FF;  
            }
            .el-icon-sort{
              transform: rotate(90deg);  
              color: #0C71FF;
            }
        }
        .bottom{
            display: flex;
            align-items: center;
            justify-content: start;
            color: #727880;
            font-size: 14px;
            gap: 10px;
            margin-top: 5px;
        }
    }
    .body-content{
        .el-menu-demo{
            .el-menu-item.is-active {
                color: #0C71FF !important;
            }
        }  
        .el-menu.el-menu--horizontal{
                border: none !important;
        } 
    }
    .group-portrait{
        .serach{
            .timepick-width-prepend {
                display: flex;
                align-items: center;
                
                .timepick-prepend{
                    .el-input__inner {
                        border-top-right-radius:0px !important;
                        border-bottom-right-radius:0px !important;
                    }
                }
                .prepend-data-picker{
                    margin-left: -1px;
                    border-top-left-radius:0px !important;
                    border-bottom-left-radius:0px !important;
                }
            }
            .el-form.el-form--inline .el-form-item .el-form-item__content > .el-select{
                width: 150px !important;
            }
            .el-form.el-form--inline .el-form-item .el-form-item__content > .el-input{
                width: none !important;
            }
            .el-form--inline .el-form-item {
                margin-right: 54px !important;
            }
            .search-single-form{
                .search-bottom-btn{
                    margin-top: -5px;
                    margin-left: 19px;
                }
                .el-button--mini.is-circle {
                    height: 40px;
                    width: 40px;
                }
            }
        }
        .serach-table{
            border: 1px solid #EAEAEA;
            border-radius: 12px;
            overflow: hidden;
            width:1137px;
            margin-top:10px;
            #groupTable{
                max-height: 400px;
                overflow-y: scroll;
            }
            .el-table__expanded-cell[class*=cell] {
                padding: 0px 0px;
            }
            .table-header-item{
                display: flex;
                align-items: center;
                .right{
                    word-break: keep-all;
                    margin-left: 5px;
                    :nth-child(1){
                        font-size: 14px;
                        font-weight: 600;
                        color: #1B1D1F;
                    }
                    :nth-child(2){
                        font-size: 12px;
                        color: #727880;
                        margin-top: 5px;
                    }
                }
                img{
                    width: 32px;
                    height: 32px;
                    border-radius: 60px;
                    object-fit: cover;
                }
            }
            li{
                list-style-type: none;
            }
            .demo-table-expand{
                .demo-table-expand-li{
                    :hover{
                        background-color: #F5F5F5;
                    }
                    &:last-child{
                        .content-li{
                            border-bottom: none;
                        }
                    }
                }
                .content-li{
                    display: flex;
                    align-items: center;
                    padding: 11px 0;
                    border-bottom: 1px solid #EBEEF5;
                    // &:last-child{
                    //     border-bottom: none;
                    // }
                    .client{
                        display: flex;
                        align-items: center;
                        width: 211px;
                        margin-left: 74px;
                        .client-name {
                            display: flex;
                            justify-content: center;
                            align-items: center;
                            background: #0C71FF;
                            color: #fff;
                            width: 32px;
                            height: 32px;
                            border-radius: 8px;
                            font-size: 14px;
                            font-weight: 600;
                            margin-right: 5px;
                        }
                        img{
                            width: 32px;
                            height: 32px;
                            border-radius: 12px;
                            object-fit: cover;
                            margin-right: 5px;
                        }
                        .right{
                            margin-top:4px;
                            margin-left: 6px;
                        }
                    }
                    .work{
                        width: 109px;
                    }
                    .product{
                        width: 113px;
                    }
                    .create-time{
                        width: 141px;
                    }
                    .trade{
                        width: 193px;
                        .trade-container{
                            display: flex;
                            align-items: center;
                            gap: 0px 2px;
                            div{
                                width: 40px;
                                height: 22px;
                                border-radius: 14px;
                                text-align: center;
                                line-height: 22px;
                            }
                        }
                    }
                    .trade{
                        width: 193px;
                    }
                    .trade-order{
                        width: 141px;
                    }
                    .right{
                        button{
                            padding: 0px;
                            color: #409eff; 
                            border: none;
                        }
                    }
                }
            }
        }
    }
}
</style>
