#!/usr/bin/env python
"""Setup script for stan_code_helper."""

from setuptools import find_packages, setup

setup(
    name='stan_code_helper',
    version='0.0.1',
    description=(
        'Jupyter notebook extension that enables highlighting every instance '
        'of the current word in the notebook.'
    ),
    author='Aravind',
    author_email='arvindxxxx@gmail.com',
    url='https://github.com/arvinds-ds/stan_code_helper.git,
    license='BSD',
    long_description="""
Jupyter notebook extension that enables highlighting of all instances of the
currently-selected or cursor-adjecent word in either the current cell's editor,
or in the whole notebook.
Based on the  CodeMirror addon
`Match Highlighter <https://codemirror.net/demo/matchhighlighter.html>`_,
extended to work across multiple editors.
""",
    packages=find_packages('src'),
    package_dir={'': 'src'},
    include_package_data=True,
)
