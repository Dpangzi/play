/**
 * Created by dpangzi on 14-7-3.
 */
var Boykiller={};
Boykiller.ClassConstructor = (function() {                                   //我不想用function
    var kclass = {};
    var skipKey = ["include", "extend", "createClass", "prototype"];

    var prototype = {};
    var createInstance = function () {
        return Object.create(this.prototype);
    }

    kclass.createClass = function () {
        var objectClass = Object.create({});
        objectClass.include = this.include;
        objectClass.extend = this.extend;

        objectClass.createInstance = createInstance;

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
                prototype[key] = obj[key];
            }
        }
        return this;
    }

    //definproperty begin

    /*Boykiller.canDefineProperty = true;
    try{
        Object.defineProperty({},{
            set:_set(value)
        });
        Boykiller.defineProperty=Object.defineProperty;
    }
    catch (e) {
        Boykiller.canDefineProperty = false;
        kclass.defineProperty = function (obj,key,config) {
            obj
        }
    }*/


    //defineproperty end
    return kclass;
})();

var BaseClass = Boykiller.ClassConstructor.createClass();

BaseClass.extend((function()
{
    var baseClassPro = {};

    baseClassPro.prototype ={};
    baseClassPro.prototype.set = function()
    {

    }


    return baseClassPro;
}()));




var Model = (function(){
    var model = Boykiller.ClassConstructor.createClass();

    model.createInstance = function(name,propertys) {
        var instance = Object.create(this.prototype);
        var instanceProperty = {};

        for(var property in propertys) {

            initInstanceProperty.call(instance,property);
        }
    }

    var initProperty = function(key){

    }

    var getProperty = function(key)
    {

    }

    var setProperty = function (key) {

    }

    return model;
})();