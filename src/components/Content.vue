<template>
    <div :class="{
        'd-f': !hasSelectedMovie,
        'content-def-container': !hasSelectedMovie,
        'content-container': hasSelectedMovie
    }">
        <p class="def-desc" v-if="!selectedMovie">
            Please select a title from the sidebar
        </p>
        <div v-else>
            <div class="movie-header">
                <div class="big-title">
                    {{ selectedMovie.Title ? selectedMovie.Title : 'N/A' }}
                </div>
                <div>
                    {{ selectedMovie.Year ? selectedMovie.Year : 'N/A' }}
                </div>
            </div>
            <div class="d-f m-wrapper">
                <div class="img-brief">
                    <img :src="selectedMovie.Poster ? selectedMovie.Poster : iph" alt="left-poster-image" />
                    <table class="table-brief">
                        <tbody>
                            <tr>
                                <td class="half-td">
                                    <div>
                                        Language
                                    </div>
                                    <div class="movie-info-text">
                                        {{ selectedMovie.Language ? selectedMovie.Language : 'N/A' }}
                                    </div>
                                </td>
                                <td>
                                    <div>
                                        Duration
                                    </div>
                                    <div class="movie-info-text">
                                        {{ selectedMovie.Runtime ? selectedMovie.Runtime : 'N/A' }}
                                    </div>
                                </td>
                            </tr>
                            <tr>
                                <td colspan="2" class="bdt">
                                    <div>
                                        Cast
                                    </div>
                                    <div class="movie-actors">
                                        {{ selectedMovie.Actors ? selectedMovie.Actors : 'N/A' }}
                                    </div>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <div class="synopsis">
                    <h3 class="synopsis-title">Synopsis</h3>
                    <div>
                        {{ selectedMovie.Plot ? selectedMovie.Plot : 'N/A' }}
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        props: ['selectedMovie'],
        data() {
            return {
                iph: 'https://via.placeholder.com/192x282?text=Omdb Api'
            }
        },
        computed: {
            hasSelectedMovie() {
                return !this.selectedMovie ? false : true;
            },
        },
    }
</script>

<style lang="scss" scoped>
    .content-def-container {
        width: 100%;
        align-items: center;
        justify-content: center;
    }
    .content-container {
        width: 100%;
    }
    .def-desc {
        margin: 0;
        text-align: center;
        font-weight: bold;
        font-size: 24px;
        height: 29px;
        line-height: 29px;
        color: #B5B5B5;
    }
    .d-f {
        display: -webkit-box;
        display: -moz-box;
        display: -ms-flexbox;
        display: -webkit-flex;
        display: flex;
    }
    .movie-header {
        width: 100%;
        height: 300px;
        color: #FFFFFF;
        padding-top: 160px;
        padding-left: 120px;
        background: linear-gradient(0deg, #000000 2.92%, rgba(0, 0, 0, 0.6875) 100%), #FFFFFF;
        .big-title {
            font-weight: bold;
            font-size: 36px;
            height: 43px;
            line-height: 43px;
        }
        > div:nth-child(2) {
            font-weight: normal;
            font-size: 24px;
            height: 29px;
            line-height: 29px;
        }
    }
    .m-wrapper {
        width: 80%;
        justify-content: center;
        margin: 40px 10% 0px 10%;
    }
    .img-brief {
        width: 30%;
        > img {
            width: 100%;
        }
    }
    .table-brief {
        width: 100%;
        border: 1px solid #C4C4C4;
        margin-top: 24px;
        border-collapse: collapse;
        td {
            padding: 6px;
            > div:first-child {
                font-weight: bold;
                font-size: 12px;
                line-height: 120%;
                text-transform: uppercase;
                color: #828282;
            }
        }
    }
    .movie-info-text {
        font-weight: normal;
        font-size: 14px;
        line-height: 120%;
        color: #000;
    }
    .movie-actors {
        font-weight: normal;
        font-size: 14px;
        line-height: 120%;
        color: #000;
    }
    .half-td {
        width: 50%;
        border-right: 1px solid #C4C4C4;
    }
    .bdt {
        border-top: 1px solid #C4C4C4;
    }
    .synopsis {
        width: 70%;
        margin-left: 40px;
        color: #000;
    }
    .synopsis-title {
        font-weight: 700;
        font-size: 24px;
        height: 28.8px;
        line-height: 28.8px;
        color: #000;
        margin-top: 0;
    }
</style>