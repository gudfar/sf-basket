FROM oraclelinux:7
ENV PACKAGE_URL https://repo.mysql.com/yum/mysql-5.7-community/docker/x86_64/mysql-community-server-minimal-5.7.17-1.el7.x86_64.rpm

# Install server
RUN rpmkeys --import http://repo.mysql.com/RPM-GPG-KEY-mysql \
  && yum install -y $PACKAGE_URL \
  && yum install -y libpwquality \
  && rm -rf /var/cache/yum/*
RUN mkdir /docker-entrypoint-initdb.d
RUN yum install vim-enhanced -y
RUN mkdir -p /var/log
RUN mkdir -p /var/log/mysql
RUN touch /var/log/mysql/slow-query.log
RUN chown mysql.mysql -R /var/log/mysql

ADD /conf /etc/mysql

VOLUME /var/lib/mysql

COPY docker-entrypoint.sh /entrypoint.sh
ENTRYPOINT ["/entrypoint.sh"]

EXPOSE 3306
CMD ["mysqld"]