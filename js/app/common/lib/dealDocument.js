define([], function () {
    var Deal = function (data) {
        data.about = function () {
            return data.content.about ;//$('<div/>').html(data.content.about).text()
        }
        data.whyWeRecommend = function () {
            return data.content.whyWeRecommend;//$('<div/>').html().text()
        }
        data.merchantDetails = function () {
            return data.merchant;//$('<div/>').html(data.merchant).text()
        }
        return data
    }

    return Deal;

})