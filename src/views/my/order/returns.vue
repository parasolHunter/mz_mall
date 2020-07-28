<template>
    <div class="mall-scroll-wrapper content-scroll-wrapper">
        <mall-header :type="'other'" :bgClass="'bg-white'" title="退换货申请"></mall-header>
        <cube-loading v-if="loadStatus" :size="40" class="once-load"></cube-loading>
        <div v-else class="mall-scroll-list-wrap content-scroll-list-wrap" ref="scrollWrapper">
            <cube-scroll ref="contentScroll" :options="options" >
                <div class="pdall">
                    <div class="returns_box margint_20 flex justifyBetween">
                        <div class="box_desc">申请服务</div>
                        <div class="box_step flex" @click="showPicker(1, 1)">
                            <span>{{ serviceLabelSelected }}</span>
                            <support-ico :size="19" :type="'enter'"></support-ico>
                        </div>
                    </div>
                    <div class="returns_box flex justifyBetween">
                        <div class="box_desc">退换原因</div>
                        <div class="box_step flex" @click="showPicker(1, 2)">
                            <span>{{ reasonLabelSelected }}</span>
                            <support-ico :size="19" :type="'enter'"></support-ico>
                        </div>
                    </div>

                    <div class="returns_box margint_20 flex justifyStart">
                        <div class="box_desc">商品数量</div>
                        <div class="box_counter flex">
                            <div class="counter_item counter_up" @click="counter('down')">-</div>
                            <div class="counter_item counter_num">{{ count }}</div>
                            <div class="counter_item counter_down" @click="counter('up')">+</div>
                        </div>
                    </div>
                    <div class="returns_box flex justifyStart">
                        <div class="box_desc">退款金额：</div>
                        <div class="box_amt flex"><span class="color_red">&yen;128.00</span></div>
                    </div>

                    <div class="remark_textArea"><cube-textarea v-model="remark" placeholder="最多200字" indicator="indicator" :maxlength="remarkLength"></cube-textarea></div>

                    <div class="returns_box margint_20 ">
                        <div class="box_desc text-left">上传凭证</div>
                        <cube-upload
                            ref="upload"
                            v-model="files"
                            :max = "max"
                            :action="action"
                            :simultaneous-uploads="1"
                            :process-file="processFile"
                            @file-submitted="fileSubmitted">
                            <div class="clear-fix">
                                <cube-upload-file v-for="(file, i) in files" :file="file" :key="i"  ></cube-upload-file>
                                <cube-upload-btn :multiple="false">
                                    <div class="text">
                                        <p>上传凭证</p>
                                        <p>(最多3张)</p>
                                    </div>
                                </cube-upload-btn>
                            </div>
                        </cube-upload>
                    </div>

                </div>
            </cube-scroll>
        </div>
        <div class="apply-btn" @click="handdle_apply">提交申请</div>
        <mall-popup ref="popupWrapper">
            <div slot="slot1">
                <mall-select
                    ref="service_mall_select"
                    title="服务类型"
                    :mall_options="serviceOptions"
                    @endHanddle="endHanddle"
                    selectType="1"
                    :mall_selected_defined="serviceSelected"
                    @showPicker="showPicker"
                ></mall-select>
            </div>
            <div slot="slot2">
                <mall-select
                    ref="reason_mall_select"
                    title="退款原因"
                    selectType="2"
                    :mall_options="reasonOptions"
                    @endHanddle="endHanddle"
                    :mall_selected_defined="reasonSelected"
                    @showPicker="showPicker"
                ></mall-select>
            </div>
        </mall-popup>
    </div>
</template>

<script>
import { getGoods } from '@/api';
import mallHeader from '@/components/mall-header/mall-header';
import SupportIco from '@/components/support-ico/support-ico';
import mallPopup from '@/components/mall-popup/mall-popup';
import mallSelect from '@/components/mall-select/mall-select';
import compress from '@/common/plugins/image'


let cnt = 1;
export default {
    name: 'shopping',
    data() {
        return {
            loadStatus: false,
            count: 1,
            remark: '',
            remarkLength: 200,
            indicator: {
                negative: false,
                remain: true
            },
            options: {},
            reasonSelected: '1',
            reasonLabelSelected: '请选择退款原因',
            reasonOptions: [
                {
                    label: '不想买了',
                    value: '1'
                },
                {
                    label: '质量问题',
                    value: '2'
                },
                {
                    label: '商品信息描述与实际不符',
                    value: '3'
                    // disabled: true
                },
                {
                    label: '商品变质/发霉/有异物',
                    value: '4'
                    // disabled: true
                }
            ],
            serviceSelected: 'a',
            serviceLabelSelected: '请选择服务类型',
            serviceOptions: [
                {
                    label: '我要退款（无需退货）',
                    value: 'a'
                },
                {
                    label: '我要退货退款',
                    value: 'b'
                },
                {
                    label: '补寄',
                    value: 'c'
                    // disabled: true
                }
            ],
            GoodsList: [
                {
                    name: '美赞官方旗舰店',
                    type: 2,
                    freight: '0.00',
                    totalPrice: 0,
                    foods: [
                        {
                            icon: 'http://fuss10.elemecdn.com/6/72/cb844f0bb60c502c6d5c05e0bddf5jpeg.jpeg?imageView2/1/w/114/h/114',
                            image: 'http://fuss10.elemecdn.com/6/72/cb844f0bb60c502c6d5c05e0bddf5jpeg.jpeg?imageView2/1/w/750/h/750',
                            price: '59.50',
                            info: '空调变KFR-26GW大1匹变频冷暖壁挂式空调G系列G755',
                            style: '白色，8GB+128GB'
                        },
                        {
                            name: '皮蛋瘦肉粥',
                            price: 12.5,
                            oldPrice: '8',
                            description: '咸粥',
                            sellCount: 229,
                            rating: 100,
                            info: '一碗皮蛋瘦肉粥，总是我到粥店时的不二之选。香浓软滑，饱腹暖心，皮蛋的Q弹与瘦肉的滑嫩伴着粥香溢于满口，让人喝这样的一碗粥也觉得心满意足',
                            style: '白色，8GB+128GB',
                            ratings: [
                                {
                                    username: '3******c',
                                    rateTime: 1469281964000,
                                    rateType: 0,
                                    text: '很喜欢的粥',
                                    avatar: 'http://static.galileo.xiaojukeji.com/static/tms/default_header.png'
                                },
                                {
                                    username: '2******3',
                                    rateTime: 1469271264000,
                                    rateType: 0,
                                    text: '',
                                    avatar: 'http://static.galileo.xiaojukeji.com/static/tms/default_header.png'
                                },
                                {
                                    username: '3******b',
                                    rateTime: 1469261964000,
                                    rateType: 1,
                                    text: '',
                                    avatar: 'http://static.galileo.xiaojukeji.com/static/tms/default_header.png'
                                }
                            ],
                            icon: 'http://fuss10.elemecdn.com/c/cd/c12745ed8a5171e13b427dbc39401jpeg.jpeg?imageView2/1/w/114/h/114',
                            image: 'http://fuss10.elemecdn.com/c/cd/c12745ed8a5171e13b427dbc39401jpeg.jpeg?imageView2/1/w/750/h/750'
                        }
                    ]
                }
            ],
            action: {
                target: '//jsonplaceholder.typicode.com/photos/',
                prop: 'base64Value'
            },
            max: 3,
            files: [],
        };
    },
    filters: {
        decimal2placesFilter(value) {
            let realVal = '';
            if (!isNaN(value) && value !== '') {
                // 截取当前数据到小数点后两位
                realVal = parseFloat(value).toFixed(2);
                realVal = realVal.split('.')[1];
            } else {
                realVal = '--';
            }
            return realVal;
        },
        integerFilter(value) {
            let realVal = '';
            if (!isNaN(value) && value !== '') {
                // 截取当前数据到小数点后两位
                realVal = parseFloat(value).toFixed(2);
                realVal = realVal.split('.')[0];
            } else {
                realVal = '--';
            }
            return realVal;
        }
    },
    computed: {},
    created() {
        let totalPrice = 0;
        for (var j in this.GoodsList[0].foods) {
            totalPrice = Number(totalPrice) + Number(this.GoodsList[0].foods[j].price);
        }
        this.GoodsList[0].totalPrice = totalPrice;
    },
    mounted() {
        // this.getHome();
        // setTimeout(() => {
        //     this.loadStatus = false;
        // }, 1000);
    },
    methods: {
        async getHome() {
            let res = await getGoods();
            this.GoodsList = res.data;
            if (!this.GoodsList) return false;
        },
        redirect(routeName, type) {
            switch (type) {
                default:
                    // 默认块
                    this.$router.push({ path: `/${routeName}` });
            }
        },
        showPicker(val, dis) {
            if (val === 1) {
                this.$refs.popupWrapper.show(dis);
            } else {
                this.$refs.popupWrapper.hide();
            }
        },
        counter(type) {
            if (type == 'up') {
                this.count++;
            } else if (type == 'down' && this.count > 1) {
                this.count--;
            } else {
                const toast = this.$createToast({
                    txt: '不能再减少了呦',
                    type: 'warn'
                });
                toast.show();
            }
        },
        endHanddle(v, text, selectType) {
            console.log(v, text, selectType);
            if (selectType == '1') {
                this.serviceSelected = v;
                this.serviceLabelSelected = text;
            } else {
                this.reasonSelected = v;
                this.reasonLabelSelected = text;
            }
        },
        handdle_apply() {
            // console.log(this.$refs.reason_mall_select.mall_selected)
        },
        processFile(file, next) {
            compress(file, {
                compress: {
                    width: 1600,
                    height: 1600,
                    quality: 0.5
                }
            }, next)
        },
        fileSubmitted(file) {
            file.base64Value = file.file.base64
        },
    },
    components: {
        mallHeader,
        SupportIco,
        mallPopup,
        mallSelect
    }
};
</script>

<style lang="stylus" scoped>
.color_red
    color #EE3147
i, em
    font-style normal
.margint_20
    margin-top 20px
.pdall
    padding 20px 0
.mb-32
    margin-bottom 32px
.heart
    margin-right 10px
.store
    margin-right 20px
.text-left
    text-align left
.cube-scroll-nav-bar
    border-top 1px solid #EBEBEB
.mall-scroll-wrapper
    .mall-scroll-list-wrap
        width 100%
        position absolute
        top 100px
        left 0
        right 0
        bottom 100px
        overflow scroll
    >>> .once-load
        position absolute
        left 50%
        > span
            margin auto
            transform translate(-50%, 100%)
.success-enter-active, .success-leave-active
    transition width 0.5s
.success-enter, .success-leave-to
    width 70%
.success-enter-to, .success-leave
    width 100%
.returns_box
    background #FFFFFF
    padding 30px 30px
    font-size 28px
    .box_step
        font-size 28px
        color #8F8F8F
    .box_counter
        margin-left 30px
        .counter_item
            background #F5F5F5
            width 52px
            height 52px
            line-height 52px
        .counter_num
            margin 0 6px
.remark_textArea
    padding 0 30px
    background #FFFFFF
    position relative
    margin-top 20px
    .cube-textarea-wrapper
        margin-left 140px
        width 80%
        &::before
            content '退换说明'
            position absolute
            left -140px
            top 20px
        &::after
            border none
.apply-btn
    position absolute
    bottom 0
    left 50%
    transform translateX(-50%)
    width 100%
    height 88px
    line-height 88px
    color #FFFFFF
    font-size 26px
    font-weight bold
    background #ee3147
>>>.clear-fix
    display flex
    text-align left
    margin-top 30px
>>>.cube-upload-file ,>>>.cube-upload-file_success,>>>.cube-upload-file_error
    display inline-block
    width 200px
    margin-bottom 10px
    margin-right 20px
    border-radius 8px

>>> .cube-upload-btn
    align-self flex-start
    width 200px
    height 200px
    background url("~@/assets/img/upload.png") no-repeat center
    background-size  100% 100%
    .text
        text-align center
        padding-top 120px
        color #b9b9b9
        line-height 110%
</style>
