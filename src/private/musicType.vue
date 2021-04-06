<!-- 
    banner 轮播图 : 
        数字单曲 蓝色
        新碟首发 ：红色
        独家 : 红色
        VIP专享： 红色
        广告  : 蓝色
-->
<script>
    export default {
        name: 'mucieType',
        props: {
            typeTitle: {
                type: String,
                default: '',
            },
        },
        data() {
            return {}
        },
        render() {
            const mucieType = (
                <span
                    class={`defaultstyle ${this.typeTitle === '数字单曲' || this.typeTitle === '广告' ? 'bluetitle' : ''}${
                        this.typeTitle === '新碟首发' || this.typeTitle === 'VIP专享' || this.typeTitle === '独家' ? 'redtitle' : ''
                    }`}
                >
                    {this.typeTitle ? this.typeTitle : ''}
                </span>
            )
            return mucieType
        },
    }
</script>

<style lang="less" scoped>
    .defaultstyle {
        position: absolute;
        right: 0;
        bottom: 0;
        font-size: 12px;
        display: inline-block;
        color: #fff;
        padding: 3px 5px;
        border-top-left-radius: 10px;
        border-bottom-right-radius: 10px;
    }
    .bluetitle {
        background-color: rgba(93, 93, 219, 0.6);
    }
    .redtitle {
        background-color: rgb(163, 37, 37);
    }
</style>
