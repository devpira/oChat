# fluentd/Dockerfile

FROM fluent/fluentd:v1.6-debian-1
USER root

# RUN apt-get update
# RUN apt-get install -y gcc make autoconf

# RUN fluent-gem install fluent-plugin-mongo
#RUN ["gem", "install", "fluent-plugin-mongo"]
RUN ["gem", "install", "fluent-plugin-elasticsearch", "--no-document", "--version", "3.5.2"]
USER fluent
