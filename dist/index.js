'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

exports.install = function (Vue) {
    Vue.prototype.$event = new Vue({
        methods: {
            emit: function emit(type) {
                var data = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;

                this.$emit(type, data);
            },
            on: function on(type, listener) {
                this.$on(type, listener);
            }
        }
    });

    Vue.mixin({
        beforeCreate: function beforeCreate() {
            var _this = this;

            if (_typeof(this.$options.events) != 'object') return;

            this.$on('hook:beforeMount', function () {
                for (var key in _this.$options.events) {
                    events.on(key, _this.$options.events[key].bind(_this));
                }
            });
        }
    });
};