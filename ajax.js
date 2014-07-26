/**
 * Created by Administrator on 2014/7/12.
 */
xmlHttpRequest =(function()
{
    var httpRequest = {
        url:"",
        requestHeader:"",
        responseHeader:"",
        status:0,
        readyState:0,
        onreadystatechange:undefined,
        ansy:true,
        data:{},
        crossDomain:true
    };
    var httprequestCache = undefined;

    var createXMLHttpRequest = function() {
        if (!httprequestCache) {
            var s = ["XMLHttpRequest", "ActiveXObject('Msxml2.XMLHTTP.6.0')",
                "ActiveXObject('Msxml2.XMLHTTP.3.0')", "ActiveXObject('Msxml2.XMLHTTP')"];
            for (var index = 0, len = s.length; index < len; index++) {
                try {
                    httprequestCache = eval("new " + s[index] + "()");
                    var xhr = new Function("return new " + s[index]);
                    Tool.mix(xhr,httpRequest);
                    return xhr;
                }
                catch (e) {
                    continue;
                }
            }
        }
        else {
            var xhr = eval(httprequestCache);
            Tool.mix(xhr,httpRequest);
            return xhr;
        }
    }



    var locationParam = ["localhost","127.0.0.1"];
    var httpRegex = /^([\w.+-]+:)(?:\/\/([^\/?#:]*)(?::(\d+)|)|)/;

    var setOption = function(options)
    {
        if(options.url)
        {
            throw new Error("没有输入URL");
        }
        var pairs = httpRegex.exec(options.url.toLowerCase());
        if(!pairs&&(pairs[1]==window.location.protocol)||(parts[2]+parts[3]==window.location.host))
        {
            this.crossDomain =false;
        }
        else
        {
             this.crossDomain = false;
        }


    }

    httpRequest.ajax = function(options)
    {
        var xhr = createXMLHttpRequest();
        setOption.call(xhr,options);

    }



    return httpRequest;
})();