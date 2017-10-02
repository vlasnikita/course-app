$(document).ready(function() {

    var url = 'http://habrahabr.ru/rss/interesting/';

    feednami.load(url,function(result){
        if(result.error) {
            console.log(result.error);
        } else {
            var entries = result.feed.entries;
            for(var i = 0; i < entries.length; i++){
                var entry = entries[i];
            }
            console.table(entries);
        }
    });

});
