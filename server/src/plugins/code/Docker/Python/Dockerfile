FROM pypy
COPY ./Docker/Python/python-code-runner.py /home/
RUN pip install bottle
CMD pypy /home/python-code-runner.py