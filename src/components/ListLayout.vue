<template>
    <div class="layout">
        <div class="search-list">
            <div class="search-container">
                <form name="search-form" novalidate @submit.prevent="submitSearchTerm">
                    <input
                        class="searchterm-input"
                        type="text"
                        placeholder="Search here"
                        name="search"
                        v-model.trim="searchTerm"
                    />
                    <transition name="switch-btn" mode="out-in">
                        <button class="search-button" type="button" v-if="searchTerm.length <= 0">
                            <i class="fa fa-search"></i>
                        </button>
                        <button class="search-button" type="button" v-else @click="clearSearch">
                            <i class="fa fa-times"></i>
                        </button>
                    </transition>
                </form>
                <p class="text-danger text-center m0-auto">{{error}}</p>
            </div>
            <div>
                <ul class="nolist-style">
                    <list-item
                        v-for="movie in movieList"
                        :key="movie.imdbID"
                        :id="movie.imdbID"
                        :poster="movie.Poster"
                        :title="movie.Title"
                        :year="movie.Year"
                    ></list-item>
                </ul>
            </div>
            <div class="pagination-container" v-if="totalRz && totalRz > pageSize">
                <!-- :disabled="disPrevbtn" -->
                <base-button @click="goPrevPage">
                    <div class="arrow-left"></div>
                </base-button>
                <span class="paging-text">
                    Page {{currPage}}/{{totalPage}} - total: {{ totalRz }}
                </span>
                <base-button @click="goNxpage">
                    <div class="arrow-right"></div>
                </base-button>
            </div>
        </div>
        <Content :selected-movie="selectedMovie" />
        <Spinner v-if="isLoading" />
    </div>
</template>

<script>
    import ListItem from './ListItem';
    import Content from './Content';
    import Spinner from '../share/Spinner';

    export default {
        async created () {
            this.error = null;
            const moviePermise = await fetch(`${this.baseUrl}${this.myImdbId}&apikey=${this.myApiKey}`);
            const movData = await moviePermise.json();
            // movData instanceof Object
            this.movieList.push(movData);
            this.totalPage = 1;
            this.totalRz = movData && movData['totalResults'] ? movData.totalResults : null;
        },
        inject: ['baseUrl'],
        data() {
            return {
                myImdbId: 'tt3896198',
                myApiKey: '6ad3c6ee',
                movieList: [],
                searchTerm: '',
                currPage: 1,
                totalPage: 0,
                pageSize: 10,
                selectedMovie: null,
                totalRz: null,
                error: null,
                isLoading: false
            }
        },
        provide() {
            return {
                selectMovieImdbid: this.getSelectedMovie
            };
        },
        components: {
            ListItem,
            Content,
            Spinner
        },
        watch: {
            totalRz(nv) {
                if (nv && nv > this.pageSize) {
                    this.totalPage = this.calcTotalPages(nv);
                } else {
                    this.totalPage = 0;
                }
            }
        },
        methods: {
            async clearSearch() {
                this.searchTerm = '';
                this.movieList = [];
                this.error = null;
                const moviePermise = await fetch(`${this.baseUrl}${this.myImdbId}&apikey=${this.myApiKey}&plot=full`);
                const movData = await moviePermise.json();
                this.movieList.push(movData);
                this.totalPage = 1;
                this.totalRz = movData && movData['totalResults'] ? movData.totalResults : null;
            },
            getSelectedMovie(mId) {
                this.isLoading = true;
                fetch(`${this.baseUrl}${mId}&apikey=${this.myApiKey}`)
                    .then((resp) => {
                        if (resp.ok) {
                            // this.selectedMovie = null;
                            return resp.json();
                        } else {
                            throw new Error('Load Movie by ImdbId fail.');
                        }
                    })
                    .then((data) => {
                        this.selectedMovie = data;
                        this.isLoading = false;
                    })
                    .catch((err) => {
                        console.log('131 -- error: ', err.message);
                        this.isLoading = false;
                    });
            },
            calcTotalPages(tps) {
                return Math.floor(tps / this.pageSize) + (tps % this.pageSize > 0 ? 1 : 0);
            },
            async submitSearchTerm(e) {
                e.preventDefault();
                if (this.searchTerm === '') {
                    return;
                } else {
                    this.isLoading = true;
                    const searchPermise = await fetch(`${this.baseUrl}${this.myImdbId}&apikey=${this.myApiKey}&s=${this.searchTerm}`)
                    const searchRz = await searchPermise.json();
                    if (searchRz && searchRz.Error) {
                        this.error = searchRz.Error;
                    } else {
                        this.movieList = searchRz.Search;
                        this.currPage = 1;
                        this.error = null;
                        this.totalRz = searchRz && searchRz['totalResults'] ? searchRz.totalResults : null;
                    }
                    this.isLoading = false;
                }
            },
            goNxpage() {
                // don't go more than page this.totalPage
                if (this.currPage >= this.totalPage) {
                    this.currPage = this.totalPage;
                } else {
                    this.changePage(this.currPage++);
                }
            },
            goPrevPage() {
                // don't go less than page 1
                if (this.currPage <= 1) {
                    this.currPage = 1;
                } else {
                    this.changePage(this.currPage--);
                }
            },
            changePage(pageNum) {
                this.isLoading = true;
                fetch(`${this.baseUrl}${this.myImdbId}&apikey=${this.myApiKey}&s=${this.searchTerm}&page=${pageNum}`)
                    .then((resp) => {
                        if (resp.ok) {
                            return resp.json();
                        } else {
                            throw new Error('Pagination error.');
                        }
                    })
                    .then((data) => {
                        this.movieList = data.Search;
                        this.isLoading = false;
                    })
                    .catch((err) => {
                        console.log('181 -- err: ', err.message);
                        this.isLoading = false;
                    });
            }
        },
    }
</script>

<style lang="scss" scoped>
.layout {
    display: -webkit-box;
    display: -moz-box;
    display: -ms-flexbox;
    display: -webkit-flex;
    display: flex;
    > div {
        height: 100vh;
    }
    .search-list {
        min-width: 320px;
        width: 320px;
        box-shadow: 2px 4px 12px 4px rgba(0, 0, 0, 0.05);
        .search-container {
            height: 120px;
            border-bottom: 1px solid #004EC4;
        }
    }
    .content-def-container {
        width: 100%;
    }
    .content-container {
        width: 100%;
    }
}

form[name=search-form] {
    text-align: center;
    padding-top: 40px;
    &::after {
        content: "";
        clear: both;
        display: table;
    }
    .searchterm-input {
        width: 256px;
        height: 48px;
        padding: 13.4px 14px;
        font-size: 16px;
        border: 1px solid #A5A5A5;
        border-radius: 8px;
        background-color: #fff;
        outline: none;
        &:focus {
            border: 2px solid #0051EE;
        }
    }
    .search-button {
        width: 42px;
        height: 42px;
        font-size: 24px;
        background-color: #fff;
        color: #CACACA;
        outline: none;
        border: none;
        position: fixed;
        left: 240px;
        top: 44px;
        /* &:hover {
            color: darken($color: #CACACA, $amount: 10%);
        } */
    }
}

.nolist-style {
    list-style: none;
    margin: 0;
    padding: 0;
    > li {
        width: 100%;
        height: 78px;
        padding: 10px 0 10px 24px;
        border-bottom: 1px solid #C4C4C4;
        display: -webkit-box;
        display: -moz-box;
        display: -ms-flexbox;
        display: -webkit-flex;
        display: flex;
        align-items: flex-start;
    }
}

.pagination-container {
    min-width: 320px;
    width: 320px;
    height: 60px;
    position: fixed;
    bottom: 0;
    left: 0;
    background-color: #fff;
    padding: 15px 20px 16px;
    display: -webkit-box;
    display: -moz-box;
    display: -ms-flexbox;
    display: -webkit-flex;
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.paging-text {
    font-weight: normal;
    font-size: 14px;
    line-height: 17px;
    text-align: center;
    color: #000000;
}

.switch-btn-enter-from, .switch-btn-leave-to {
    opacity: 0;
}
.switch-btn-enter-active {
    transition: opacity 0.3s ease-out;
}
.switch-btn-leave-active {
    transition: opacity 0.3s ease-in;
}
.switch-btn-enter-to, .switch-btn-leave-from {
    opacity: 1;
}

@mixin triangleTopBottom($tb: 6px) {
    width: 0;
    height: 0;
    margin: 0 auto;
    border-top: $tb solid transparent;
    border-bottom: $tb solid transparent;
}

.arrow-left {
  @include triangleTopBottom(6px);
  border-right: 9px solid #C4C4C4;
}

.arrow-right {
  @include triangleTopBottom(6px);
  border-left: 9px solid #C4C4C4;
}
</style>
