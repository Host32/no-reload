/*global module, require*/
(function () {
    'use strict';

    var Promise = require('./promise'),

        $http = require('./http'),

        $config = require('./config'),

        LOAD_TECHNIQUES = {
            XHR_EVAL: 'xhr_eval',
            XHR_INJECTION: 'xhr_injection',
            SCRIPT_DOM_ELEMENT: 'script_dom_element',
            WRITE_SCRIPT_TAG: 'write_script_tag'
        };

    $config.set('scriptLoadTechnique', LOAD_TECHNIQUES.XHR_INJECTION);

    /**
     * Use eval
     *
     * @param {string} url
     */
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

    /**
     * Create a script element and insert the script content inside it
     *
     * @param {string} url
     */
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

    /**
     * Create a script element and set the src attribute as the url
     *
     * @param {string} url
     */
    function loadByScriptDomElement(url) {
        var scriptElement = document.createElement('script');
        scriptElement.src = url;
        document.getElementsByTagName('head')[0].appendChild(scriptElement);
    }

    /**
     * Use document.write()
     *
     * @param {string} url
     */
    function loadByWriteScriptTag(url) {
        /*jslint evil: true */
        document.write('<script type="text/javascript" src="' + url + '"></script>');
    }

    /**
     * <p>Responsible for dynamic load of script files.</p>
     *
     * @module $scriptLoader
     * @memberof NR
     */
    module.exports = {

        /**
         * <p>Load a script using `xhr_eval` thecnique</p>
         * <p>This thecnique oly run an `eval` call on the script content</p>
         *
         * @method
         * @param {string} url Script url
         */
        loadByXhrEval: loadByXhrEval,

        /**
         * <p>Load a script using `xhr_injection` thecnique</p>
         * <p>This thecnique create a `script` tag and insert the script content inside it</p>
         *
         * @method
         * @param {string} url Script url
         */
        loadByXhrInjection: loadByXhrInjection,

        /**
         * <p>Load a script using `script_dom_element` thecnique</p>
         * <p>This thecnique create a `script` tag and set they `src` attribute as the url required.</p>
         *
         * @method
         * @param {string} url Script url
         */
        loadByScriptDomElement: loadByScriptDomElement,

        /**
         * <p>Load a script using `write_script_tag` thecnique</p>
         * <p>This thecnique use `document.write()` with the script content</p>
         *
         * @method
         * @param {string} url Script url
         */
        loadByWriteScriptTag: loadByWriteScriptTag,

        /**
         * <p>Load a remote script using the thecnique defined in `scriptLoadTechnique` config.</p>
         * <p>The default thecnique is `xhr_injection`</p>
         *
         * @method
         * @param {string} url Script url
         */
        load: function (url) {
            var thecnique = $config.get('scriptLoadTechnique');

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
