var app = angular.module('itunes');

app.service('itunesService', function($http, $q){
  //This service is what will do the 'heavy lifting' and get our data from the iTunes API.
  //Also note that we're using a 'service' and not a 'factory' so all your methods you want to call in your controller need to be on 'this'.

  //Write a method that accepts an artist's name as the parameter, then makes a 'JSONP' http request to a url that looks like this
  //https://itunes.apple.com/search?term=' + artist + '&callback=JSON_CALLBACK'
  //Note that in the above line, artist is the parameter being passed in. 
  //You can return the http request or you can make your own promise in order to manipulate the data before you resolve it.

    //Code here
    this.getData = function(artist) {
      var defer = $q.defer();
      $http({
        method: 'JSONP',
        url: 'https://itunes.apple.com/search?term=' + artist + '&callback=JSON_CALLBACK'
    }).then(function(response) {
     var realParsedResponse = [];
     var parsedResponse = response.data.results
      for (var i = 0; i < response.data.results.length; i++) {
        var newObj = {};
        newObj.AlbumArt = parsedResponse[i].artworkUrl30;
        newObj.Play = parsedResponse[i].previewUrl;
        newObj.Artist = parsedResponse[i].artistName;
        newObj.Collection = parsedResponse[i].collectionName;
        newObj.Type = parsedResponse[i].kind;
        newObj.CollectionPrice = parsedResponse[i].collectionPrice;
        newObj.Song = parsedResponse[i].trackName;
        realParsedResponse.push(newObj);
      }
      
      
      
      
      defer.resolve(realParsedResponse)
    })
    return defer.promise;    
    }
});
