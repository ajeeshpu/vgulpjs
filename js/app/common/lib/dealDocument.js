define([], function() {
    var Deal = function(data) {
        return data.about = function() {
            return data.content.about;
        }, data.whyWeRecommend = function() {
            return data.content.whyWeRecommend;
        }, data.merchantDetails = function() {
            return data.merchant;
        }, data;
    };
    return Deal;
});;