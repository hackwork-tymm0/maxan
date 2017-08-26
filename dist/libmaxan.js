
var MaxanClient = function (object) {

    this.ip = object.address;
    this.port = object.port;

    console.log("");
    console.log('   MaxanClient starts.');
    console.log("");

};

MaxanClient.prototype.sendAction = function (action, params) {

    var result = null;

    if (params !== undefined) {

        var actions = this.__getActions().actions;
        
        if (actions.indexOf(action) !== -1) {
    
            var keys = Object.getOwnPropertyNames(params);
            var template = "?";

            if (keys.length != 0) {

                for (var i = 0; i < keys.length; i++) {

                    template += keys[i] + "=" + params[keys[i]] + "&";

                }

            } else {

                template += keys[keys.length - 1] + "=" + params[keys[keys.length - 1]];

            }

            var query = this.__buildURL("/action/" + action + template.slice(0, -1));

            var xhr = new XMLHttpRequest();

            xhr.open("GET", query, false);
            xhr.send();

            if (xhr.status != 200) {
                
                this.__errorLog(xhr.status, xhr.statusText);
        
            } else {
        
                result = JSON.parse(xhr.responseText);
        
            }          
    
    
        } else {
    
            this.__errorLog(action, 'this action is undefined');
    
        }

        return result;

    } else {

        this.__errorLog("params", "Parameters is undefined");

    }

};

MaxanClient.prototype.__buildURL = function (method) {

    return "http://" + this.ip + ":" + this.port + method;

};

MaxanClient.prototype.__getActions = function () {

    var url = this.__buildURL("/getActions");
    var xhr = new XMLHttpRequest();
    var result = null;

    xhr.open('GET', url, false)
    xhr.send();

    if (xhr.status != 200) {

        this.__errorLog(xhr.status, xhr.statusText);

    } else {

        result = JSON.parse(xhr.responseText);

    }

    return result;

};

MaxanClient.prototype.__errorLog = function (status, errorText) {

    console.error('MaxanClient error! ' + status + ': ' + errorText);

}