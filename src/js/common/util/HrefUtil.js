define(function () {
    return {

        /**
         * @param str
         * @param val
         * @returns {boolean}
         */
        isDev: function(str, val){
            var url = $(location).attr('href');
            return url.indexOf('localhost') != -1;
        }

    };
});