# Insurance calculator

## Implementation

This app uses the following third-party libraries These dependencies are written in the package.json file

    "react-router-dom": "^6.8.2",
    "react-date-range": "^1.4.0",
    "date-fns": "^2.29.3",

During my acquaintance with React some time ago, I encountered a problem - the API request worked only locally. Therefore, I checked the correctness of the logic through Docker from the very beginning.

## Design differences
    
I've added a button 'order' and a new page that displays the final information. All required fields have default values.
I wasn't looking for a perfect design. The main thing was to reproduce the logic of the application.

## About build and deploy

Link to the done website
https://insurance-calculator.tetiana-chykalova.click/

##### If you need to work with the code, write npm install in your terminal, then all the necessary dependencies will be added for you locally

    npm install

All form fields are mandatory. The fields for entering the phone number and email have additional validation. I would really like to add validation to the field for entering the date of birth, but unfortunately, it is not there yet

### The application is hosted using Docker, Nginx, and AWS EC2, ECR, Route53. Security certificate added using Certbot.
##### If it is necessary to update the application, stop the "daemon" and perform the following actions:

Build a new static file using the docker build

    docker build -t <<tag>> .
    
Push a local Docker representation using the docker push

    docker push <<tag>>

##### Next, use the key to go to the service and execute the following commands on behalf of the root

Download the latest version of the application using the docker pull

    sudo docker pull <<tag>>

Run the new version as a "daemon" (in the example, the port used during the first setup is specified)

    sudo docker run -d -p <<port>> <<tag>>
    
## App problems

During development, I had an issue with the page reloading uncontrollably when clicking on the increase and decrease buttons for the number of people. This has never happened before. I solved this problem by adding "preventDefault()"

The problem that still remains is the delay in receiving data on additional charges. If the user first clicks "yes" and selects their option and then clicks "no", the price is not updated immediately

