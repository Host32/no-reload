/*global module, require*/
(function () {
    'use strict';

    var Promise = require('./promise'),

        $http = require('./http'),

        $confs = require('./confs'),

        LOAD_TECHNIQUES = {
            XHR_EVAL: 'xhr_eval',
            XHR_INJECTION: 'xhr_injection',
            SCRIPT_DOM_ELEMENT: 'script_dom_element',
            WRITE_SCRIPT_TAG: 'write_script_tag'
        };

    $confs.set('scriptLoadTechnique', LOAD_TECHNIQUES.XHR_INJECTION);

    function loadByXhrEval(url) {
        $http.request({
            url: url,
            dataType: 'text/javascript'
        }).then(function (response) {
            /*jslint evil: true */
            eval(response);
        }, function () {
            // TODO
        });
    }

    function loadByXhrInjection(url) {
        $http.request({
            url: url,
            dataType: 'text/javascript'
        }).then(function (response) {
            var scriptElement = document.createElement('script');
            document.getElementsByTagName('head')[0].appendChild(scriptElement);
            scriptElement.text = response;
        }, function () {
            // TODO
        });
    }

    function loadByScriptDomElement(url) {
        var scriptElement = document.createElement('script');
        scriptElement.src = url;
        document.getElementsByTagName('head')[0].appendChild(scriptElement);
    }

    function loadByWriteScriptTag(url) {
        /*jslint evil: true */
        document.write('<script type="text/javascript" src="' + url + '"></script>');
    }

    /**
     * <p></p>
     *
     * @module $scriptLoader
     * @memberof NR
     */
    module.exports = {

        loadByXhrEval: loadByXhrEval,

        loadByXhrInjection: loadByXhrInjection,

        loadByScriptDomElement: loadByScriptDomElement,

        loadByWriteScriptTag: loadByWriteScriptTag,

        load: function (url) {
            var thecnique = $confs.get('scriptLoadTechnique');

            switch (thecnique) {
                case LOAD_TECHNIQUES.XHR_EVAL:
                    return loadByXhrEval(url);
                case LOAD_TECHNIQUES.XHR_INJECTION:
                    return loadByXhrInjection(url);
                case LOAD_TECHNIQUES.SCRIPT_DOM_ELEMENT:
                    return loadByScriptDomElement(url);
                case LOAD_TECHNIQUES.WRITE_SCRIPT_TAG:
                    return loadByWriteScriptTag(url);
            }
        }
    };

}());
