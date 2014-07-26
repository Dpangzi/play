
AjaxManager = (function() {
    var manager = {};
    var instance={};

    var success = function() {
        var def = arguments[2];
        delete this.context.ajaxList[this.identify][this.option.url];
    }

    var addDelayAborted = function(option,callback)
    {
        var identify = this.predicate.call(option);
        option.context = {
            context: this,
            identify: identify,
            option: option
        };

        if (this.ajaxList[identify]) {

            var lastTime = this.ajaxList[identify].lastTime;
            var currentTime = +new Date();
            if ((currentTime - lastTime) > this.delayTime) {
                window.clearTimeout(this.ajaxList[identify].handle);
                this.ajaxList[identify].lastTime = +new Date();
                if (this.ajaxList[identify][option.url] && this.aborted) {
                    this.ajaxList[identify][option.url].abort();
                }
                var deferred = $.ajax(option);
                this.ajaxList[identify][option.url] = deferred;
                deferred.done(success).then(callback);
            } else {
                window.clearTimeout(this.ajaxList.handle);
                var self = this;
                this.ajaxList.handle = window.setTimeout(function () {
                    self.ajaxList[identify].lastTime = +new Date();
                    if (self.ajaxList[identify][option.url] && self.aborted) {
                        self.ajaxList[identify][option.url].abort();
                    }
                    var deferred = $.ajax(option);
                    self.ajaxList[identify][option.url] = deferred;
                    deferred.done(success).then(callback);
                }, this.delayTime);
            }

        } else {
            this.ajaxList.handle = undefined;
            this.ajaxList[identify] = this.ajaxList[identify] || {};
            this.ajaxList[identify].lastTime = +new Date();
            var deferred = $.ajax(option);
            this.ajaxList[identify][option.url] = deferred;
            deferred.done(success).then(callback);
        }
    }

    var add = function(option, callback) {
        if (!option.url) {
            throw new Error("url underfind");
        }
        //var in
        addDelayAborted.apply(this, arguments);
    }

    var initManager = function(option) {
        option = option || {};
        this.aborted = option.aborted || false;
        this.delayTime = option.delayTime || 0;
        this.predicate = option.predicate || function () {
            return this.url;
        };
        this.ajaxList = {};
    }
    //manager.addAjax = add;

    manager.init = function(option) {
        initManager.prototype.addAjax = add;
        var result = new initManager(option);
        return result;
    }

    return manager;
}());