<template>
    <div class="main">
        <div class="btn mb-20">
            <Button type="primary" @click="inHandler">出库</Button>
            <Button type="primary" @click="outHandler">入库</Button>
            <Button type="primary" @click="upadteHandler">刷新</Button>
            <span>设备名称：</span>
            <Select v-model="eqtName" class="eqt-select" clearable>
                <Option v-for="item in eqtList" :value="item" :key="item"></Option>
            </Select>
            <Button type="primary" @click="searchHandler">搜索</Button>
        </div>
        <Row :gutter="10" class="mb-20">
            <Col span="16">
            <Card>
                <p slot="title">库存报表</p>
                <div class="chart" ref="chart"></div>
            </Card>
            </Col>
            <Col span="8">
            <Card>
                <p slot="title">实时库存</p>
                <Table :columns="stockColumn" :data="stockData" height="300"></Table>
            </Card>
            </Col>
        </Row>
        <Card class="mb-20">
            <p slot="title">出入库记录</p>
            <Table :columns="column" :data="logData" height="300"></Table>
        </Card>
        <Modal v-model="showModal" title="添加" @on-ok="okHandler">
            <div class="formWrapper">
                <Form ref="form" :model="stockForm" :rules="stockForm" inline :label-width="60">
                    <FormItem label="设备名称">
                        <Select v-model="stockForm.name">
                            <Option v-for="item in eqtList" :value="item" :key="item"></Option>
                        </Select>
                    </FormItem>
                    <FormItem label="操作数量">
                        <Input-number :min="0" v-model="stockForm.amount"></Input-number>
                    </FormItem>
                </Form>
            </div>
        </Modal>
    </div>
</template>

<script>
    import API from '../assets/api.js'
    import echarts from 'echarts'
    export default {
        name: '',
        data() {
            return {
                chartObj: '',
                tag: false,
                eqtList: [],
                eqtName: '',
                eqtName1: '',
                stockColumn: [{
                    type: 'index',
                    width: 60,
                    align: 'center'
                }, {
                    title: '名称',
                    key: 'name'
                }, {
                    title: '实时库存',
                    key: 'amount'
                }],
                stockData: [],
                stockForm: {
                    amount: 1,
                    name: ''
                },
                showModal: false,
                logData: [],
                column: [{
                    type: 'index',
                    width: 60,
                    align: 'center'
                }, {
                    title: '名称',
                    key: 'name'
                }, {
                    title: '操作数量',
                    key: 'amount'
                }, {
                    title: '操作时间',
                    key: 'create_at'
                }, {
                    title: '出入库状态',
                    key: 'state',
                    render: (h, params) => {
                        return h('Tag', {
                            style: {
                                cursor: 'default'
                            },
                            props: {
                                type: 'dot',
                                color: params.row.in_stock ? 'success' : 'error'
                            }
                        }, params.row.in_stock ? '入库' : '出库');
                    }
                }, ]
            }
        },
        created() {
            this.getEqt()
            this.upadteHandler()
        },
        mounted() {
            let _this = this
            this.$nextTick(() => {
                this.chartObj = echarts.init(this.$refs.chart)
                this.draw()
                window.addEventListener('resize', function () {
                    _this.chartObj.resize();
                });
            })
        },
        methods: {
            draw() {
                let option = {
                    tooltip: {
                        trigger: 'axis',
                        axisPointer: { // 坐标轴指示器，坐标轴触发有效
                            type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
                        }
                    },
                    xAxis: {
                        type: 'category',
                        data: this.stockData.map(item => item.name)
                    },
                    yAxis: {
                        type: 'value'
                    },
                    series: [{
                        data: this.stockData.map(item => item.amount),
                        type: 'bar'
                    }]
                }
                this.chartObj.setOption(option)
            },
            outHandler() {
                this.showModal = true
                this.tag = true
            },
            inHandler() {
                this.showModal = true
                this.tag = false
            },
            upadteHandler() {
                this.eqtName = ''
                this.getLog()
                this.getStock()
            },
            getLog() {
                API.getLog().then(res => {
                    this.logData = res.data
                })
            },
            getStock() {
                API.getStock().then(res => {
                    this.stockData = res.data
                    this.draw()
                })
            },
            getEqt() {
                API.getEqts().then(res => {
                    this.eqtList = res.data.map(item => item.name)
                })
            },
            searchHandler() {
                API.getLogByName(this.eqtName).then(res => {
                    this.logData = res.data
                })
                API.getStockByName(this.eqtName).then(res => {
                    this.stockData = res.data
                    this.draw()
                })
            },
            okHandler() {
                let params = Object.assign({
                    in_stock: this.tag
                }, this.stockForm)
                API.createStock(params).then(res => {
                    this.upadteHandler()
                })
            }
        }
    }

</script>

<style lang="" scoped>
    .btn {
        padding: 10px;
        background: #ffffff;
    }

    .mb-20 {
        margin-bottom: 20px;
    }

    .eqt-select {
        display: inline-block;
        width: 100px;
    }

    .chart {
        height: 300px;
    }

</style>
