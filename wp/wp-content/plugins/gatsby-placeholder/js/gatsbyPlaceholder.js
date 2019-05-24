/* eslint-disable */
(function(wp) {
  var registerPlugin = wp.plugins.registerPlugin;
  var PluginPostStatusInfo = wp.editPost.PluginPostStatusInfo;
  var el = wp.element.createElement;
  var compose = wp.compose.compose;

  var withSelect = wp.data.withSelect;
  var withDispatch = wp.data.withDispatch;

  var Checkbox = wp.components.CheckboxControl;

  var MetaBlockField = compose(
    withDispatch(function(dispatch, props) {
      return {
        setMetaFieldValue: function(value) {
          dispatch('core/editor').editPost({ meta: { [props.fieldName]: value } });
        },
      };
    }),
    withSelect(function(select, props) {
      return {
        metaFieldValue: select('core/editor').getEditedPostAttribute('meta')[props.fieldName],
      };
    }),
  )(function(props) {
    return el(Checkbox, {
      label: 'Placeholder content',
      checked: props.metaFieldValue,
      onChange: function(isChecked) {
        var val = isChecked ? 1 : 0;
        props.setMetaFieldValue(val);
      },
    });
  });

  registerPlugin('gatsby-placeholder', {
    render: function() {
      return el(
        PluginPostStatusInfo,
        {
          className: 'gatsby-placeholder-status-info',
        },
        el('div', {}, el(MetaBlockField, { fieldName: 'gatsby_placeholder' })),
      );
    },
  });
})(window.wp);
