exports.install = function(Vue) {
    Vue.prototype.$event = new Vue({
        methods: {
            emit(type, data = null) {
                this.$emit(type, data);
            },
            on(type, listener) {
                this.$on(type, listener);
            }
        }
    });

    Vue.mixin({
        beforeCreate() {
            if (typeof this.$options.events != 'object') return;

            this.$on('hook:beforeMount', () => {
                for (var key in this.$options.events) {
                    events.on(key, this.$options.events[key].bind(this));
                }
            });
        }
    });
};
