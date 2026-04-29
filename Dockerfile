FROM ubuntu:latest
LABEL authors="jeanf"

ENTRYPOINT ["top", "-b"]