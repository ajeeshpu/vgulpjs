define(["knockout"],function(e){e.bindingHandlers.showModal={init:function(t,n){var r=n(),i=e.utils.unwrapObservable(r);$(t).modal({backdrop:"static",keyboard:!0,show:i})},update:function(t,n){var r=n();e.utils.unwrapObservable(r)?($(t).modal("show"),$("input",t).focus()):$(t).modal("hide")}}});