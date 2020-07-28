<template>
    <div>
        <transition name="fade">
            <cube-popup :mask-closable="true" v-show="isVisible" @mask-click="maskClick" position="bottom" type="mall-popup" :z-index="90"></cube-popup>
        </transition>
        <transition name="move">
            <div v-if="isVisible" class="popup-container">
                <slot name="slot1" v-if="slot_display == 1"></slot>
                <slot name="slot2" v-if="slot_display == 2"></slot>
                <slot name="slot3" v-if="slot_display == 3"></slot>
            </div>
        </transition>
    </div>
</template>

<script>
import popupMixin from 'common/mixins/popup';

const EVENT_SHOW = 'show';

export default {
    name: 'mall-popup',
    mixins: [popupMixin],
    props: {
        selectPopups: {
            type: Array,
            default() {
                return [];
            }
        }
    },
    data() {
        return {
            slot_display: 1
        };
    },
    created() {
        this.$on(EVENT_SHOW, () => {
            // this.$nextTick(() => {
            //     this.$refs.listContent.refresh()
            // })
        });
    },
    methods: {
        maskClick() {
            this.hide();
        },
        show(dis) {
            if (this.isVisible) {
                return;
            }
            this.isVisible = true;
            this.slot_display = dis;
        },
        hide() {
            if (!this.isVisible) {
                return;
            }
            this.isVisible = false;
        }
    }
};
</script>

<style lang="stylus" scoped>
.cube-mall-popup
    bottom 0
&.fade-enter, &.fade-leave-active
    opacity 0
&.fade-enter-active, &.fade-leave-active
    transition all 0.3s ease-in-out
.popup-container
    width 100%
    border-radius 5px 5px 0 0
    background #FFFFFF
    position absolute
    z-index 99
    bottom 0
.move-enter, .move-leave-active
    transform translate3d(0, 100%, 0)
.move-enter-active, .move-leave-active
    transition all 0.3s ease-in-out
</style>
