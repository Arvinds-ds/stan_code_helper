pip install git+https://github.com/Arvinds-ds/stan_code_helper.git
jupyter nbextension install --py stan_code_helper --user
jupyter nbextension enable stan_code_helper/main

jupyter nbextension disable stan_code_helper/main
jupyter nbextension uninstall --py stan_code_helper --user
pip uninstall stan_code_helper
