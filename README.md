Usage:

* pip install as normal
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
* Python 3.5+
