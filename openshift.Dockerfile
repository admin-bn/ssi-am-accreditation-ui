FROM nginx:alpine
COPY ./dist/ssi-am-accreditation-ui/* /usr/share/nginx/html/
COPY ./ops/nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80

