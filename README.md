Usage:

* Add `dynamic_fields` to `INSTALLED_APPS`
* Add to your form as a widget:
```
from dynamic_fields.fields import DynamicChoicesWidget

def get_item_choices(model, value):
    choices = []

    item = model.objects.get(id=value)

    for thing in item.things:
        # do something with item
        choices.append({
            'value': thing.id,
            'label': thing.name,
        })

    return choices


class MyForm(forms.ModelForm):
    class Meta:
        model = MyModel
        fields = ('item', 'dependent_item')
        widgets = {
            'dependent_item': DynamicChoicesWidget(
                depends_field='item',
                model=Item,
                callback=get_item_choices,
                no_value_disable=True,
                include_empty_choice=True,
                empty_choice_label="Please choose an option",
            )
        }
```
* Ensure that form media is included with the rest of your view's media

Requirements:

* Django 1.11+
* Python 3.5+ (built/tested with 3.6.2)
* jQuery (built/tested with 1.12.4)

How does it work?

A view is injected into the project's urlpatterns which is the handler for the ajax callback when the dependent field changes. When the DynamicChoicesWidget template is rendered, it serializes the various provided values into Python dotted strings to send to the template. It uses HTML5 data attributes in the markup to pass these values to the Javascript in order to send to the view to tell it what to do next.

The model is serialized into `app.model`, and the `callback` is serialized into the full dotted path to the method within your code, e.g; `app.form.my_form.get_choices`. When the dependent field's value is changed, the ajax calls the view with the relevant information from above, then this goes and imports the path, grabs the model class for what was provided from django's model loader, then calls your method with the class itself, and the value provided by the dependent field. The output of the callback method is serialized back into JSON, returned to the Javascript making the call, which iterates over the options and resets the select box's options to those provided.

These can be chained (theoretically) for as many fields as required. It should also (though untested) work with multiple select boxes.
