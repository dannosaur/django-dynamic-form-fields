# -*- coding: utf-8 -*-

from setuptools import setup, find_packages

setup(
    name="django-dynamic-form-fields",
    version="0.0.1",
    url="https://github.com/dannosaur/django-dynamic-form-fields",
    author="dannosaur",
    author_email="me@dannosaur.com",
    packages=find_packages(),
    include_package_data=True,
    # packages=[
    #     'dynamic_fields',
    #     'dynamic_fields/static',
    #     'dynamic_fields/static/dynamic_fields/',
    #     'dynamic_fields/static/dynamic_fields/js',
    #     'dynamic_fields/templates',
    #     'dynamic_fields/templates/dynamic_fields',
    #     'dynamic_fields/templates/dynamic_fields/forms',
    #     'dynamic_fields/templates/dynamic_fields/forms/widgets',
    # ],
    install_requires=[
        'django >= 1.11',
    ],
    python_requires='>=3.5',
)
