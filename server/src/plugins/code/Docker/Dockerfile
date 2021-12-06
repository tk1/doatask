FROM node

# Copy the start script which will start all the code runners
COPY ./startScript.sh ./startScript.sh

# Copy all code runners into the image
COPY ./../JavaScript/java-script-code-runner.js /home/JavaScript/
COPY ./../Python/python-code-runner.py /home/Python/

RUN bash

# Install all the nessecary software to run the code runners
RUN apt-get update && apt-get upgrade
RUN apt-get install python3.10 -y
RUN apt-get install python3-pip -y
RUN pip install bottle

# Execute all code runners
CMD ./startScript.sh