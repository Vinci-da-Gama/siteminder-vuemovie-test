# siteminder-test-movies

## Usage
1. download it
2. unzip it
3. enter into the directory
4. open terminal, and go to same directory
5. npm install
6. npm run serve

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve -- the website would be opened in browser(http://localhost:7400/)
```

### Compiles and minifies for production
```
npm run build
```

### Lints and fixes files
```
npm run lint
```

### Lints and fixes files
```
npm run lint
```

### It is tested in these browsers
* Chrome
* Firefox
* Safari

### completeness
- [x] left side contains search bar, list and pagination staffs
- [x] right side contains huge header and details of the movie
- [x] by default, it will load movie according to my imdbid and apikey
- [x] when user type text in the search bar, and press enter, it will start searching
- [x] if nothing inputed into search bar, when press enter, the search function won't be triggered
- [x] if searching has error, the error message would be displayed beneath the search bar
- [x] if search is successfully, then list would be presented
- [x] if search is successfully and total items' number is greater than 10, the pagination control bar would be displayed
- [x] if search is successfully and total items' number is less than 10, the pagination control bar won't be displayed
- [x] when user type search term in search bar, the icon would be changed to times icon
- [x] when user click times icon, it will clear search bar, and then load default data again, and change icon to search icon
- [x] In list, each movie has thumbnail, title and year
- [x] click each movie item in the list, then the details of the movie would be presented on the right side
- [x] The details about movie will include poster, plot, language, actors, duration...
- [x] if pagination control bar is display, it will show current page, total page and total movies
- [x] when do pagination, there is loading spinner
- [x] when change movie item, there is loading spinner

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).
