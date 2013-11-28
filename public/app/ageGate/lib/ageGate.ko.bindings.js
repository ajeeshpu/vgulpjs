define(['knockout','bootstrap/bootstrap-modal'],function(ko){
    ko.bindingHandlers.showModal = {
        init: function (element, valueAccessor) {
            var value = valueAccessor();
            var showModal = ko.utils.unwrapObservable(value);
            $(element).modal({ backdrop: 'static', keyboard: true, show: showModal });
        },
        update: function (element, valueAccessor) {
            var value = valueAccessor();
            if (ko.utils.unwrapObservable(value)) {
                $(element).modal('show');
                $("input", element).focus();
            }
            else {
                $(element).modal('hide');
            }
        }
    }
})