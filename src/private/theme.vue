<!-- 
    主题
-->
<template>
    <section class="theme">
        <el-popover placement="top" v-model="visible" width="230">
            <ul class="themes">
                <li :key="index" @click="changeTheme(themeKey)" class="theme-item" v-for="(themeValue, themeKey, index) in themeMap">
                    <div :style="themeValue.style" class="theme-icon"></div>
                    <p>{{ themeValue.title }}</p>
                </li>
            </ul>
            <!--slot='reference'  => 触发 Popover 显示的 HTML 元素 -->
            <Icon :backdrop="true" slot="reference" name="pifu" :size="12"></Icon>
        </el-popover>
    </section>
</template>

<script>
    import Bus from '@/utils/bus.js'
    import storage from 'good-storage'
    // 引入主题  1、暗色主题   2、浅色主题(默认主题)  3、红色主题
    import darkThemes from '@/assets/style/themes/variables.js'
    import whiteThemes from '@/assets/style/themes/variables-white.js'
    import redThemes from '@/assets/style/themes/variables-red.js'

    export default {
        name: 'theme',
        data() {
            return {
                visible: false,
                THEMES_KEY: '__theme__',
                themes: {
                    white: 'white',
                    dark: 'dark',
                    red: 'red',
                },
                themeMap: {},
            }
        },
        created() {
            this.themeMap = {
                [this.themes.dark]: {
                    title: '深色',
                    file: darkThemes,
                    style: {
                        backgroundColor: '#202020',
                    },
                },
                [this.themes.white]: {
                    title: '浅色',
                    file: whiteThemes,
                    style: {
                        backgroundColor: '#F6F6F6',
                    },
                },
                [this.themes.red]: {
                    title: '红色',
                    file: redThemes,
                    style: {
                        backgroundColor: '#D33A31',
                    },
                },
            }
            // 默认主题
            this.changeTheme(storage.get(this.THEMES_KEY, this.themes.white))
        },
        methods: {
            changeTheme(key) {
                // 初始化值  value:__theme__   key:white
                storage.set(this.THEMES_KEY, key)
                Bus.$emit('themeColor')
                const themeList = this.themeMap[key].file
                Object.keys(themeList).forEach(key => {
                    const value = themeList[key]
                    document.documentElement.style.setProperty(key, value)
                })
            },
        },
    }
</script>

<style lang="less" scoped>
    @import '../assets/style/mixins.less';
    .themes {
        .flex-center();

        .theme-item {
            width: calc(~'100% / 3');
            display: flex;
            flex-direction: column;
            align-items: center;
            cursor: pointer;
            padding-top: 15px;
            .theme-icon {
                width: 25px;
                height: 25px;
                border-radius: 50%;
            }
        }
    }
</style>
