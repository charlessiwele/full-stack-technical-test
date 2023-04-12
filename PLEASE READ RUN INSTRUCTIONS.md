<div align="center" style="margin-top: 20px">
  <p>
    <img src="assets/logo.svg" width="250" />
  </p>
</div>

<div align="center">

# Technical Test Run Instructions

</div>

## Overview

To set up the test  for execution, simply execute the batch file "1_intall_dependencies.bat"
This will ensure all necessary dependencies are installed before the apps (both front- and back-end) are executed

## Backend
In order to run the frontend application:
1. Run the batch file "2_run_back_end_unit_tests" as this will run the Jest unit tests 
2. Run the batch file "3_run_back_end_app" as this will activate the GraphQL application, and you can now view and explore the application

## Frontend
In order to run the Frontend application:
1. Run the batch file "4_run_front_end_app_proxy" as this will activate the express js proxy server required to resolve cors headers issues
2. Run the batch file "5_run_front_end_app_in_dev_mode" as this will activate the application in development mode and allow you to view and explore the app in the easiest way
**Note:** if you would like to build the application in order to run in a production/like environment then run batch file "6_run_front_end_app_vite_build" as this will create you the expected bundle that you can then deploy on a web server of your choosing

Thanks!
