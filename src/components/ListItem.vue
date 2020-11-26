<template>
    <li @click="selectMovieImdbid(id)">
        <div class="poster-box"
            :style="{ backgroundImage: poster && poster !== 'N/A' ? 'url(' + poster + ')' : `url(${thumbnailImg})` }"
        ></div>
        <div class="movie-ty">
            <div class="movie-title">{{ title }}</div>
            <div class="movie-year">{{ year }}</div>
        </div>
    </li>
</template>

<script>
    export default {
        inject: ['selectMovieImdbid'],
        props: ['id', 'poster', 'title', 'year'],
        data() {
            return {
                thumbnailImg: 'https://via.placeholder.com/48'
            }
        },
    }
</script>

<style lang="scss" scoped>
.poster-box {
    width: 48px;
    height: 48px;
    border: 1px solid red;
    background-repeat: no-repeat;
    background-size: cover;
}

.movie-ty {
    width: 117px;
    margin-left: 12px;
    color: #000000;
}

.movie-title {
    font-weight: bold;
    font-size: 24px;
    overflow: hidden;
    height: 29px;
    line-height: 29px;
}

.movie-year {
    margin-top: 8px;
    font-weight: normal;
    font-size: 16px;
    height: 19px;
    line-height: 19px;
}
</style>