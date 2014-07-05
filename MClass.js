/**
 * Created by dpangzi on 14-7-3.
 */
var ClassConstructor = (function() {                                   //我不想用function
    var kclass = {};
    var skipKey = ["include", "extend", "createClass", "prototype"];

    kclass.prototype = {};
    var createInstance = function () {
        return Object.create(this.prototype);
    }

    kclass.createClass = function () {
        var objectClass = Object.create(this);

        objectClass.prototype = this.prototype;
        objectClass.createInstance =createInstance;
        objectClass.include =this.include;
        objectClass.extend =this.extend;

        return objectClass
    }

    kclass.include = function (obj) {
        for (var key in obj) {
            if(skipKey.indexOf(key)==-1) {
                this[key] = obj[key];
            }
        }
        return this;
    }

    kclass.extend = function (obj) {
        for (var key in obj) {
            if(skipKey.indexOf(key)==-1) {
                this.prototype[key] = obj[key];
            }
        }
        return this;
    }

    return kclass;
})();