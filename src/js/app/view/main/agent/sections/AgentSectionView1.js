/**
 * Created by Jamie on 22/09/2014.
 */
define(['marionette', 'ctx', 'app/view/main/components/tabs/TabbedView', 'text!app/view/main/agent/AgentView.tpl.html'],

    function (Marionette, ctx, TabbedView, tpl) {
        return TabbedView.extend({


            childView: CourseContent,
            regions: {
                "contentRegion": "#content",
                "sectionsRegion": "#sections"
            },


            /**
             * Main initialisation
             */
            onShow: function() {
                this.$el.html(this.template());
            }
        });
    });