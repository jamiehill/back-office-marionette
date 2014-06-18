define([
    'backbone','marionette',
    'text!app/view/main/markets/sports/templates/FilterInput.tpl.html'
],

function (Backbone, Marionette, iiTpl) {
    return Marionette.View.extend({

        toolBar: null,
        bindings: [],


        events: {
            "input .filterInput": "onFilterChanged"
        },


        /**
         * @param options
         */
        initialize: function(options) {
            this.sport = options.sport;
        },


        /**
         * Renders the base toolbar
         */
        onShow: function(){
            var scope = this;

            this.toolBar = $(this.el).w2toolbar({
                name: uid.getUid(),
                items: this.items(scope),
                style: "padding: 4px 6px 4px 6px",
                onClick: function(e){
                    scope.onClick(e, scope);
                }
            });

            this.addBinding($(this.el), 'expandedChange', this.toggle);
            return this;
        },


        /**
         * Override backbones remove method to augment
         * it with removal of our custom bindings
         * @returns {BaseEventToolbar}
         */
        remove: function() {
            this.$el.remove();
            this.stopListening();
            _.each(this.bindings, function(b){
                b.element.unbind(b.event);
            });
            this.bindings = [];
            return this;
        },


        /**
         * @param element
         * @param event
         * @param callback
         */
        addBinding: function(element, event, callback){
            this.bindings.push({element:element, event:event});
            element.bind(event, {scope:this}, callback);
        },


        /**
         * @param e
         * @param scope
         */
        onClick: function(e, scope){
            if (e.target == 'sort' && e.subItem)
                scope.trigger('sort', {subItem: e.subItem.id});
            else
                scope.trigger(e.target+'Click');
        },


        /**
         * @param e
         */
        onFilterChanged: function(e){
            this.trigger('filter', {filter: e.target.value, target:$('.filterInput')});
        },


        /**
         * Toggles the expanded/collapsed button
         * @param expanded
         */
        toggle: function(e){
            var scope = e.data.scope,
                expanded = $(scope.el).hasClass('expanded'),
                item = scope.toolBar.get('toggleButton');

            item.img = (expanded) ? "fa fa-minus-square fa-fw" : "fa fa-plus-square fa-fw";
            scope.toolBar.render();
        },


        /**
         * Items settings for tool bar
         */
        items: function(scope){
            return [
                {type: 'button',  id: 'toggleButton', img: 'fa fa-minus-square fa-fw'},
                {type: 'break'},
                {type: 'html', id: 'eventName', html: '<h3> '+string.properCase(scope.sport).toUpperCase()+'</h3>'},
                {type: 'spacer'},
                { type: 'menu',   id: 'sort', caption: 'Sort', items: [
                    { text: 'Time', id: 'eventTime' },
                    { text: 'Name', id: 'name' }
                ]},
                {type: 'break'},
                {type: 'html',  id: 'filter', html: _.template(iiTpl, {tooltip:'Filter Event for '+this.sport})},
                {type: 'break'}
            ];
        }
    });
});
