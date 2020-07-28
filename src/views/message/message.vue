<template>
    <div class="mall-scroll-wrapper content-scroll-wrapper">
        <mall-header :type="'other'" :title="'系统消息'" :bgClass="'bg-white'"></mall-header>
        <cube-loading v-if="loadStatus" :size="40" class="once-load"></cube-loading>
        <div v-else class="mall-scroll-list-wrap content-scroll-list-wrap" ref="scrollWrapper">
            <cube-scroll ref="contentScroll" :data="content" :options="options" @pulling-down="onPullingDown" @pulling-up="onPullingUp">
                <ul class="message-wrapper">
                    <li v-for="(item, index) in content" :key="index" class="message-item">
                        <router-link :to="{ path: '/message/1' }" class="message-item-text">
                            <div class="message-item-text-s">商城公告消息</div>
                            <div class="message-item-text-ss">05-01</div>
                        </router-link>
                    </li>
                </ul>
                <!-- <template slot="pulldown" slot-scope="props">
            <div v-if="props.pullDownRefresh" class="cube-pulldown-wrapper" :style="props.pullDownStyle">
              <div v-if="props.beforePullDown" class="before-trigger" :style="{ paddingTop: props.bubbleY + 'px' }"><span :class="{ rotate: props.bubbleY > 0 }">↓</span></div>
              <div class="after-trigger" v-else>
                <div v-show="props.isPullingDown" class="loading"><cube-loading></cube-loading></div>
                <transition name="success">
                  <div v-show="!props.isPullingDown" class="text-wrapper"><span class="refresh-text">今日新</span></div>
                </transition>
              </div>
            </div>
          </template> -->
            </cube-scroll>
        </div>
    </div>
</template>

<script>
import { getHome } from '@/api';
import mallHeader from '@/components/mall-header/mall-header';
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
    data() {
        return {
            content: imgs.slice(),
            loadStatus: true,
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
            secondStop: 26
        };
    },
    mounted() {
        //this.getHome()
        console.log(this.$i18n.t('message.hello'));
        setTimeout(() => {
            this.loadStatus = false;
        }, 1000);
    },
    methods: {
        async getHome() {
            let res = await getHome();
            this.bannerList = res.bannerList;
        },
        onPullingDown() {
            setTimeout(() => {
                this.content.unshift(imgs[cnt++ % 3]);
                this.$refs.contentScroll.forceUpdate(true);
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
        }
    },
    components: {
        mallHeader
    }
};
</script>

<style lang="stylus" scoped>
.mall-scroll-wrapper
    .mall-scroll-list-wrap
        width 100%
        position absolute
        top 100px
        left 0
        right 0
        bottom 0
        overflow scroll
        .message-wrapper
            margin-top 20px
            .message-item
                width 100%
                background #FFFFFF
                border-bottom 2px solid #ebebeb
                .message-item-text
                    padding 30px 40px
                    display block
                    .message-item-text-s
                        font-size 30px
                        font-weight bold
                        text-align left
                        text-overflow ellipsis
                        white-space nowrap
                        overflow hidden
                    .message-item-text-ss
                        font-size 22px
                        color #8f8f8f
                        text-align left
                        padding-top 30px
    >>>.once-load
        position absolute
        left 50%
        >span
            margin auto
            transform translate(-50%, 100%)
// .cube-pulldown-wrapper
// text-align center
// .before-trigger
// height auto
// font-size 30px
// align-self flex-end
// span
// display inline-block
// line-height 1
// transition all 0.3s
// color #666
// padding 15px 0
// &.rotate
// transform rotate(180deg)
// .after-trigger
// flex 1
// margin 0
// .text-wrapper
// margin 0 auto
// margin-top 14px
// padding 5px 0
// color #498ec2
// .cube-loading-spinners
// margin auto
.success-enter-active, .success-leave-active
    transition width 0.5s
.success-enter, .success-leave-to
    width 70%
.success-enter-to, .success-leave
    width 100%
</style>
