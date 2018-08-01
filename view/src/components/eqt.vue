<template>
    <div class="eqt">
        <Button type="primary" @click="showModal = true">添加设备</Button>
        <Button type="primary" @click="getAll">刷新</Button>
        <Table :columns="column" :data="data"></Table>
        <Modal v-model="showModal" title="添加" @on-ok="okHandler">
            <div class="formWrapper">
                <Form ref="form" :model="eqtForm" :rules="eqtForm" inline :label-width="60">
                    <FormItem label="设备名称">
                        <Input v-model="eqtForm.name"></Input>
                    </FormItem>
                </Form>
            </div>
        </Modal>
    </div>
</template>

<script>
    import API from '../assets/api.js'
    export default {
        name: '',
        data() {
            return {
                eqtForm: {},
                showModal: false,
                column: [{
                    type: 'index',
                    width: 60,
                    align: 'center'
                }, {
                    title: '设备',
                    key: 'name'
                }],
                data: []
            }
        },
        created() {
            this.getAll()
        },
        methods: {
            getAll() {
                API.getEqts().then(res => {
                    this.data = res.data
                })
            },
            okHandler() {
                API.createEqt(this.eqtForm).then(res => {
                    this.getAll()
                }).catch(err =>  {
                    this.$Message.error('添加失败!')
                })
            }
        }
    }

</script>

<style lang="" scoped>


</style>
