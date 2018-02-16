# How to Change System and Application Passwords 

## MySQL Database

### MySQL root Password

* When you know the password: 
```
mysql-u root -p
ALTER USER 'root'@'localhost' IDENTIFIED BY 'MyNewPass';
```
* When you need to set a new root password:
```
sudo service mysql stop
sudo mkdir /var/run/mysqld
sudo chown mysql: /var/run/mysqld
sudo mysqld_safe --skip-grant-tables --skip-networking &
```
Open new SSH shell:
```
mysql -u root mysql
UPDATE mysql.user SET authentication_string='NewPassword' WHERE user='root@localhost';
sudo mysqladmin -S /var/run/mysqld/mysqld.sock shutdown
sudo service mysql start
```

### context.xml files for Tomcat-MySQL-Connector

* The SQL-Database user are defined within this file including username (brillianxxx) and password (imbit15):
```
    <Resource name="jdbc/security" auth="Container"
        username="brilliancrm" password="imbit15"
        driverClassName="com.mysql.jdbc.Driver"
        url="jdbc:mysql://localhost:3306/cake?autoReconnect=true"
        logAbandoned="true" removeAbandoned="true"
        type="javax.sql.DataSource" factory="org.apache.tomcat.jdbc.pool.DataSourceFactory"
        testWhileIdle="true"
        validationQuery="SELECT 1"
    />
```
## Linux Passwords

## Serious Games Passwords

## Mail-Password 

* Change the password for the mailbox that is used for the send mail functions: in /opt/tomcat/webapps/brillianxxx/WEB-INF/web.xml
```
        <context-param>
                <description>Password for Mail-User</description>
                <param-name>mailpw</param-name>
                <param-value>imbit15</param-value>
        </context-param>
```
