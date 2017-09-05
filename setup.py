#!/usr/bin/env python
"""Setup script for stan_code_helper."""

from setuptools import find_packages, setup

setup(
    name='stan_code_helper',
    version='0.0.2',
    description=(
        'Jupyter notebook extension that enables syntax highlighting of %%stan code cells'
    ),
    author='Aravind',
    author_email='arvindxxxx@gmail.com',
    url='https://github.com/arvinds-ds/stan_code_helper.git',
    license='MIT',
    long_description="""
Jupyter notebook extension that enables highlighting of all %%stan code cells,
""",
    packages=find_packages('src'),
    package_dir={'': 'src'},
    include_package_data=True,
    install_requires=(
        'ipython',
    ),
    classifiers=[
        'Development Status :: 3 - Alpha',
        'Framework :: IPython',
        'Intended Audience :: Developers',
        'Operating System :: OS Independent',
        'Programming Language :: Python',
        'Programming Language :: Python :: 2',
        'Programming Language :: Python :: 2.7',
        'Programming Language :: Python :: 3',
        'Programming Language :: Python :: 3.6',
        'Topic :: Software Development :: Libraries :: Python Modules',
    ]
)
