<template>
    <section class="people">
        <ul>
            <li v-for="(item, index) in followList" :key="index">
                <div class="avatar" @click="userLink(item.userId)">
                    <img :src="item.avatarUrl" alt="" />
                </div>
                <div class="title" @click="userLink(item.userId)">
                    <span>{{ item.nickname }}</span>
                </div>
            </li>
        </ul>
    </section>
</template>

<script>
    export default {
        name: 'followPeople',
        props: {
            followList: {
                type: Array,
            },
        },
        methods: {
            userLink(id) {
                this.$router.push({
                    path: `/discover/user/${id}`,
                })
            },
        },
    }
</script>

<style lang="less" scoped>
    .people {
        padding: 30px;

        ul {
            display: flex;
            width: 100%;
            flex-wrap: wrap;
            li {
                width: calc(~'100% / 2');
                margin-bottom: 20px;
                display: flex;
                .avatar {
                    width: 20%;
                    margin-right: 20px;
                    img {
                        width: 100%;
                        border-radius: 50%;
                        &:hover {
                            cursor: pointer;
                        }
                    }
                }
                .title {
                    display: flex;
                    align-items: center;
                    color: #3f3d3d;
                    &:hover {
                        color: #000;
                        cursor: pointer;
                    }
                }
            }
        }
    }
</style>
