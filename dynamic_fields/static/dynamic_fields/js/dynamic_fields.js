(function($) {
    $.fn.dynamic_field = function () {
        function cast_python_bool_to_js(b) {
            return b === 'True';
        }

        function fetch_choices(initial) {
            $.ajax({
                url: '/dynamic_fields/choices/',
                method: 'POST',
                data: {
                    'model': model,
                    'field': depends,
                    'value': depends_element.val(),
                    'call': callback
                },
                success: function(data) {
                    update_choices(data);

                    if (initial && initial_value) {
                        self.val(initial_value);
                    }
                },
                error: function(xhr) {
                    console.log(xhr);
                }
            })
        }
        function update_choices(choices) {
            self.empty();
            if (include_empty_choice) {
                self.append('<option value="">'+empty_choice_label+'</option>');
            }

            $.each(choices, function(i, o){
                self.append('<option value="'+o.value+'">'+o.label+'</option>');
            });
        }

        var self = $(this);
        var model = self.data('dynamic-field-model');
        var depends = self.data('dynamic-field-depends');
        var no_value_disable = cast_python_bool_to_js(self.data('dynamic-field-no-value-disable'));
        var include_empty_choice = cast_python_bool_to_js(self.data('dynamic-field-include-empty-choice'));
        var empty_choice_label = self.data('dynamic-field-empty-choice-label');
        var callback = self.data('dynamic-field-callback');
        var initial_value = self.data('dynamic-field-default-value').split(",");

        var depends_element = $('select[name='+depends+']');

        depends_element.on('change', function() {
            console.log("new value:", $(this).val());
            if ($(this).val() === '') {
                if (no_value_disable) {
                    self.prop('disabled', true);
                }
                self.empty();
            }
            else {
                if (no_value_disable) {
                    self.prop('disabled', false);
                }
                fetch_choices();
            }
        });

        if (no_value_disable && depends_element.val() === '') {
            self.prop('disabled', true);
        }

        fetch_choices(true);

        return this;
    };

    $('select[data-dynamic-field-model]').dynamic_field();
}(jQuery));
