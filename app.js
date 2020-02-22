class PhotoApp {
    constructor() {
        this.state = {};
        this.searchTerm = "";
    }
    createModel() {
        let data = [];
        var getData = (sQuery) => {
            let url = "https://api.flickr.com/services/rest/";
            let api_key = "2c2fc443be8e5fea0c6c8bb953e5f182";
            let tags = sQuery ? sQuery : "";
            let method;
            if (tags) {
                method = "flickr.photos.search";
            } else {
                method = "flickr.photos.getRecent";
            }
            return fetch(url + '?api_key=' + api_key + '&method=' + method + '&tags=' + tags + '&format=json&nojsoncallback=?')
                .then(response => {
                    if (response.status !== 200) {
                        console.log('Looks like there was a problem. Status Code: ' +
                            response.status);
                        return;
                    }
                    // Examine the text in the response
                    return response.json();
                })
                .then(data => {
                    if (data.photos.photo) {
                        this.model.data = data.photos.photo;
                        console.info(this.model.data);
                    }
                })
                .catch(err => {
                    console.log('Fetch Error :-S', err);
                });
        }
    }
    createView() {
        this.view = {
            init: () => {
                this.view.container = document.getElementById("container");
            },
            render: (aImages) => {
                var sCardContainer = "";
                var sCard = "";
                aImages.forEach(element => {
                    sCard = `
                    <div class="card">
                        <img src=${element} alt="Image" style="height: 200px; width: 200px;">
                    </div>`;
                    sCardContainer += sCard;
                });
                this.view.container.innerHTML = sCardContainer;
            }
        };
        this.view.init();
    }
    createController() {
        const init = function () {
            this.getImages();
        };
        const getImages = (sQuery = "") => {
            this.model.getData(sQuery)
                .then((response) => {
                    var aImages = [];
                    this.model.data.forEach(element => {
                        var v = `https://farm${element.farm}.staticflickr.com/${element.server}/${element.id}_${element.secret}.jpg`;
                        aImages.push(v);
                    });
                    this.view.render(aImages);
                });
        };
        this.init();
    }
}
var photoApp = new PhotoApp();