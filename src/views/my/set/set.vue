<template>
    <div class="set-main">
        <mall-header :type="'other'" :bgClass="'bg-white'" title="账号设置"></mall-header>
        <div class="set_content">
            <div class="set_content_item flex justifyBetween">
                <span>头像</span>
                <div class="part_r flex">
                    <img class="avatar" src="./18@2x.png" alt />
                    <img class="href" src="./19@2x.png" alt />
                </div>
            </div>
            <div class="set_content_item flex justifyBetween">
                <span>昵称</span>
                <div class="part_r flex" @click="editName">
                    <span>彩色的云</span>
                    <img class="href" src="./19@2x.png" alt />
                </div>
            </div>
            <div class="set_content_item flex justifyBetween"><span>签名</span></div>
        </div>

        <div class="set_content">
            <div class="set_content_item flex justifyBetween">
                <span>绑定手机</span>
                <div class="part_r"><span class="grey_small">138****1520</span></div>
            </div>
            <div class="set_content_item flex justifyBetween">
                <span>所在地区</span>
                <div class="part_r flex" @click="showAddressPicker">
                    <span>{{address}}</span>
                    <img class="href" src="./19@2x.png" alt />
                </div>
            </div>
            <div class="set_content_item flex justifyBetween" @click="redirect('securitySet')">
                <span>安全设置</span>
                <div class="part_r"><img class="href" src="./19@2x.png" alt /></div>
            </div>
        </div>

        <div class="set_content">
            <div class="set_content_item flex justifyBetween">
                <span>微信</span>
                <div class="part_r" @click="unbindwechat"><span class="grey_small">已绑定</span></div>
            </div>
            <div class="set_content_item flex justifyBetween">
                <span>支付宝</span>
                <div class="part_r"><span class="grey_small">未绑定</span></div>
            </div>
        </div>

        <div @click="logout" class="logoutBtn margint_80">退出账户</div>
    </div>
</template>

<script>
import { getGoods } from '@/api';
import mallHeader from '@/components/mall-header/mall-header';
import { provinceList, cityList, areaList } from '@/common/plugins/area.js'
const addressData = provinceList
addressData.forEach(province => {
    province.children = cityList[province.value]
    province.children.forEach(city => {
        city.children = areaList[city.value]
    })
})

const imgs = [
    {
        img: 'https://dpubstatic.udache.com/static/dpubimg/7EzIhoEvnG/toutiao_12.JPG'
    },
    {
        img: 'https://dpubstatic.udache.com/static/dpubimg/GR0Piaf5sz/toutiao_21.JPG'
    },
    {
        img: 'https://dpubstatic.udache.com/static/dpubimg/K1JqUN8HSA/toutiao_31.JPG'
    }
];
let cnt = 1;
export default {
    created() {},
    data() {
        return {
            content: imgs.slice(),
            index: 0,
            swiperIndex: 0,
            loadStatus: false,
            isLogin: false,
            items: [
                {
                    url: 'http://www.didichuxing.com/',
                    image: '//webapp.didistatic.com/static/webapp/shield/cube-ui-examples-slide01.png'
                },
                {
                    url: 'http://www.didichuxing.com/',
                    image: '//webapp.didistatic.com/static/webapp/shield/cube-ui-examples-slide02.png'
                },
                {
                    url: 'http://www.didichuxing.com/',
                    image: '//webapp.didistatic.com/static/webapp/shield/cube-ui-examples-slide03.png'
                }
            ],
            options: {
                pullDownRefresh: {
                    threshold: 60,
                    txt: this.$i18n.t('message.hello')
                },
                pullUpLoad: true
            },
            secondStop: 26,
            address: '',
        };
    },
    mounted() {
        this.getGoods();
        console.log(this.$i18n.t('message.hello'));
        setTimeout(() => {
            this.loadStatus = false;
        }, 1000);
        this.addressPicker = this.$createCascadePicker({
            title: '地址',
            data: addressData,
            onSelect: this.selectHandle,
            onCancel: this.cancelHandle
        })
    },
    methods: {
        redirect(routeName, type) {
            switch (type) {
                default:
                    //默认块
                    this.$router.push({ path: `/${routeName}` });
            }
        },
        editName() {
            this.dialog = this.$createDialog({
                type: 'prompt',
                title: '昵称',
                prompt: {
                    value: '',
                    placeholder: '请输入昵称'
                },
                onConfirm: (e, promptValue) => {
                    this.$createToast({
                        type: 'warn',
                        time: 1000,
                        txt: `Prompt value: ${promptValue || ''}`
                    }).show();
                }
            }).show();
        },
        unbindwechat() {
            this.dialog = this.$createDialog({
                type: 'confirm',
                title: '提示',
                content: '确定要解除微信绑定吗？',
                onConfirm: (e, promptValue) => {}
            }).show();
        },
        logout() {
            this.dialog = this.$createDialog({
                type: 'confirm',
                title: '提示',
                content: '确认退出？',
                onConfirm: (e, promptValue) => {}
            }).show();
        },
        async getGoods() {
            let res = await getGoods();
        },
        onPullingDown() {
            setTimeout(() => {
                this.content.unshift(imgs[cnt++ % 3]);
                this.$refs.contentScroll.forceUpdate();
            }, 1000);
        },
        onPullingUp() {
            setTimeout(() => {
                this.content = this.content.concat(imgs);
            }, 1000);
        },
        onImgLoad() {
            const contentScroll = this.$refs.contentScroll;
            contentScroll.scroll.beforePullDown && contentScroll.refresh();
        },
        showAddressPicker () {
            this.addressPicker.show()
        },
        selectHandle (selectedVal, selectedIndex, selectedText) {
            this.address = ''
            selectedText.forEach(item=>{
            this.address+=item
            })
        },
    },
    components: {
        mallHeader
    }
};
</script>

<style lang="stylus" scoped>
.margint_80
    margin-top 80px
.set-main
    .set_content
        margin 20px 0
        background-color #FFFFFF
        .set_content_item
            padding 0 30px
            height 88px
            line-height 88px
            border 1px solid #F8F8F8
            span
                font-size 30px
            .part_r
                span
                    margin-right 20px
                    &.grey_small
                        color #8f8f8f
                        font-size 24px
                img.avatar
                    display block
                    width 60px
                    margin-right 20px
                img.href
                    display block
                    height 28px
    .logoutBtn
        width 100%
        height 88px
        line-height 88px
        background #FFFFFF
        text-align center
        font-size 30px
</style>
