/**
 * Created by dpangzi on 14-6-29.
 */


(function(global,underfined) {
    var tool = {};
    global.Tool = tool;

    //fix  begin

    Object.create = Object.create || function (obj)  //创建对象
    {
        var fn = function () {
        };
        fn.prototype = obj;
        return new fn;
    }

    Object.keys = Object.keys || function (obj)  //在ie678是没有这个功能 keys得到object可以枚举值 当然继承的不算
    {
        var dontEnums = [
            'toString',
            'toLocaleString',
            'valueOf',
            'hasOwnProperty',
            'isPrototypeOf',
            'propertyIsEnumerable',
            'constructor'
        ];
        var hasOwn = ({}).hasOwnProperty;

        for (var i in {
            toString: 1
        }) {
            dontEnums = false;  //如果支持某些属性的遍历  该变量无用 IE678下某些不可遍历 如tostring
        }

        var keys = [];
        for (var key in obj) {
            if (hasOwn.call(obj, key)) {
                keys.push(key);
            }
        }
        if (dontEnums && obj) {                        //在能遍历出来的基础上 加上ie兼容遍历问题
            for (var i = 0; key = dontEnums[i++];) {
                if (hasOwn.call(obj, key)) {
                    key.push(key);
                }
            }
        }

        return keys;
    }

    //fix end
    var guid = tool.guid = function () {
        return "xxxxx-xxxxx-xxxxx-xxxxx-xxxxx-xxxxx".replace(/[x]/g, function (item) {
            var value = Math.random() * 16 | 0;
            return value.toString(16);
        }).toLowerCase();
    }

    var each = tool.each = function (list, iterator, context) {
        if (list == null) {
            return list;
        }
        if (isArray(list))  //强制转换length 防止伪数组中长度不是数字
        {
            for (var index = 0, length = list.length; index < length; index++) {
                iterator.call(context || window, index, list[index], list);
            }
        }
        else {
            var keys = Object.keys(list);
            for (var index = 0 , length = keys.length; index < length; index++) {
                iterator.call(context || window, index, list[keys[index]], list);
            }
        }
        return list;
    }

    var equal = tool.equal = function(obj1,obj2) {  //没有数据转换的相同
        if (arguments.length != 2) {
            throw new Error("参数输入有误");
        }
        else {
            var className1 = Object.prototype.toString.call(obj1);
            var className2 = Object.prototype.toString.call(obj2);

            if (className1 != className2) {
                return false;
            }

            if (className1 == "[object Number]") {
                return obj1 / 1 == obj2 / 1;
            }

            if (obj1 == obj2) {
                return true;
            }

            if(className1 == "[object RegExp]") {
                return obj1.source == obj2.source &&
                    obj1.global == obj2.global &&
                    obj1.multiline == obj2.multiline &&
                    obj1.ignoreCase == obj2.ignoreCase;
            }

            if(className1 == "[object Object]")
            {
                var keys1 =Object.keys(obj1).sort(),keys2 = Object.keys(obj2).sort();
                if(!equal(keys1,keys2))
                {
                    return false;
                }
                else
                {
                    for(var index= 0,len=keys1.length;index<len;index++) {
                        if (!equal(obj1[keys1[index]], obj2[keys2[index]])) {
                            return false;
                        }
                    }
                    return true;
                }
            }

            if(className1 == "[object Function]") {
                var ctor1 = obj1.constructor , ctor2 = obj2.constructor;
                return ctor1 == ctor2;
            }

            if(className1 == "[object Date]")
            {
                return obj1.valueOf() == obj2.valueOf();
            }

            if(className1 == "[object Array]")
            {
                var len1 = obj1.length,len2 = obj2.length;
                if(len1 !=len2)
                {
                    return false;
                }

                for(var index= 0;index<len1;index++) {
                    if(!equal(obj1[index],obj2[index]))
                    {
                        return false;
                    }
                }
                return true;
            }

        }
    }

    var isArray = tool.isArray = function (array) {
            return Object.prototype.toString.call(array)==="[object Array]";
    }

    var toArray = tool.toArray = function (array) {
            return Array.slice.call(array,0);
    }

    var filter = tool.filter = function(array,predicate) {
        var result = [];

        if (!array || !isArray(array)) {
            return array;
        }
        else {
            if(typeof predicate == "function") {
                for (var index = 0, length = array.length; index < length; index++) {
                    if (predicate.call(array[index])) {
                        result.push(array[index]);
                    }
                }
            }
            else
            {
                for (var index = 0, length = array.length; index < length; index++) {
                    if (equal(predicate,array[index])) {
                        result.push(array[index]);
                    }
                }
            }
        }
        return result;
    }

    var mix = tool.mix = function(obj1,obj2) {
        for (var key in obj2) {
            if (!obj1[key]) {
                obj1[key] = clone(obj2[key]);
            }
        }
    }

    var clone = tool.clone = function(obj) {
        var result;
        if (typeof obj != "object") {
            result = obj;
        }
        else {
            result = new obj.constructor;
            for (var key in obj) {
                if (typeof obj[key] == "object") {
                    result[key] = clone(obj[key]);
                }
                else {
                    result[key] = obj[key];
                }
            }
        }
        return result;
    }

    var groupBy = tool.groupBy = function(array,predicate,context)
    {
        var result ={};

        for(var index= 0,len=array.length;index<len;index++) {
            var key = predicate.call(context || window, array[index]);
            if(result[key])
            {
                result[key].push(array[index]);
            }
            else
            {
                result[key] =  [array[index]];
            }

        }
        return result;
    }
})(window);