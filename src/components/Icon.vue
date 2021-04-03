<script>
    export default {
        name: 'Icon',
        props: {
            size: {
                type: Number,
                default: 14,
            },
            name: {
                type: String,
                required: true,
            },
            backdrop: {
                type: Boolean,
                default: false,
            },
        },
        data() {
            return {}
        },
        methods: {
            onClick() {},
            getIconCls() {
                let cls = `icon-${this.name}`
                return cls
            },
            getIconStyle() {
                const chromeMinSize = 12
                // 支持小于12px
                const retStyle = { fontSize: `${this.size / 14}rem` }
                if (this.size < chromeMinSize) {
                    const ratio = this.size / chromeMinSize
                    retStyle.transform = `scale(${ratio})`
                }
                return retStyle
            },
        },
        render() {
            const Icon = <i onClick={this.onClick} class={`iconfont icon-component ${this.getIconCls()}`} style={this.getIconStyle()} />

            if (this.backdrop) {
                const backDropSizeRatio = 1.56
                const backDropSize = `${(backDropSizeRatio * this.size) / 14}rem`
                return (
                    <span style={{ width: backDropSize, height: backDropSize }} class="backdrop">
                        {Icon}
                    </span>
                )
            }
            return Icon
        },
    }
</script>

<style lang="less" scoped>
    .icon-component {
        cursor: pointer;
    }
    span {
        display: inline-block;
        display: flex;
        justify-content: center;
        align-items: center;
    }
</style>
