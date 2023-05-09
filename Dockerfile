FROM debian:stable-slim as builder
RUN apt update && apt install -y curl
RUN curl -sS https://webi.sh/yq | sh; mv /root/.local/bin/yq /usr/local/bin
RUN curl -sS https://webi.sh/jq | sh; mv /root/.local/bin/jq /usr/local/bin
RUN apt clean; \
    rm -rf \
    /tmp/* \
    /var/lib/apt/lists/* \
    /var/tmp/*

FROM lncm/specter-desktop:v2.0.2-pre2

USER root
COPY --from=builder /usr/local/bin/yq /usr/local/bin/yq
COPY --from=builder /usr/local/bin/jq /usr/local/bin/jq

#COPY --from=builder /usr/local/bin /usr/local/bin

ADD ./docker_entrypoint.sh /usr/local/bin/docker_entrypoint.sh
RUN chmod a+x /usr/local/bin/docker_entrypoint.sh
