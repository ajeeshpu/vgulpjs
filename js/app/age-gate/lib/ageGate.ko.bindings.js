define([ "app/age-gate/lib/bootstrap-modal" ], function() {
    ko.bindingHandlers.showModal = {
        init: function(element, valueAccessor) {
            var value = valueAccessor(), showModal = ko.utils.unwrapObservable(value);
            $(element).modal({
                backdrop: "static",
                keyboard: !0,
                show: showModal
            });
        },
        update: function(element, valueAccessor) {
            var value = valueAccessor();
            ko.utils.unwrapObservable(value) ? ($(element).modal("show"), $("input", element).focus()) : $(element).modal("hide");
        }
    };
});;