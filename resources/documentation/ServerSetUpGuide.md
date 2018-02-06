# Server-Initialisierung: Installation and Configuration of brillianIDEAS
## Need: 
1. Apache2
* config files
* var/www/html
* Rechte
2. Tomcat9
* JDK9
* opt/tomcat ("Ordner reinschmeißen")
* env variables:
JAVA_HOME;
JRE_HOME;
CATALINA_HOME;
(CATALINA_BASE);
PATH: Java/bin
* Tomcat-Service (start, stop, restart...)
* tomcat-users.xml(Manager GUI)
* context.xml anpassen
3. MySQL 5.7
* config UT8
* createDB
4. PHP7
5. Webmin
6. Let'sEncrypt

* System Update
```
sudo apt-get update && apt-get upgrade && apt-get autoremove
```
PAM configuration: *yes*

LINK zur Fehlerbehebung kommt noch
```
cryptsetup: WARNING: failed to detect canonical device of /dev/md1
cryptsetup: WARNING: could not determine root device from /etc/fstab
W: Possible missing firmware /lib/firmware/ast_dp501_fw.bin for module ast
W: mdadm: the array /dev/md1 with UUID 3bae49aa:8a231f11:1f51fb89:78ee93fe
```
```
sudo mdadm --detail /dev/md1
```
UUID=3bae49aa:8a231f11:1f51fb89:78ee93fe eintragen

sudo mdadm --detail /dev/md3

```
sudo nano/etc/fstab
```
```
sudo nano /etc/mdadm/mdadm.conf
```
ARRAY /dev/md1 level=raid1 num-devices=2 devices=/dev/sda1,/dev/sdb1 UUID=3bae49aa:8a231f11:1f51fb89:78ee93fe
ARRAY /dev/md3 level=raid1 num-devices=2 devices=/dev/sda3,/dev/sdb3 UUID=19b18012:06ceb27b:1f51fb89:78ee93fe
#ARRAY /dev/md11 level=raid1 num-devices=2 devices=/dev/sdc1,/dev/sdd1

sudo-get upgrade
* Webmin: https://wilddiary.com/install-webmin-on-aws-ec2-server/ 

```
sudo nano /etc/apt/sources.list
```
insert into sources.list:

```
deb http://download.webmin.com/download/repository sarge contrib
```
strg X Y enter (save)
Herunterladen von

```
wget http://www.webmin.com/jcameron-key.asc
```
```
sudo apt-key add jcameron-key.asc
```
```
sudo apt-get update
```
```
sudo apt-get install webmin
```
```
sudo apt-get install perl libnet-ssleay-perl openssl libauthen-pam-perl libpam-runtime libio-pty-perl apt-show-versions python
```
```
sudo apt-get --fix-broken install
```
```
sudo useradd -g sudo webmin
```
```
sudo passwd webmin
```
Access webmin via the browser: https://<publicDNS>:10000/ 
* Install LAMP: read: https://wiki.ubuntuusers.de/LAMP/

sudo apt-get install apache2 libapache2-mod-php7.0 php7.0 php7.0-mysql mysql-server
```
  ** MySQL-server: you need to set a password during LAMP installation
	If you need to reset the root password for the mySQL database follow this: https://coderwall.com/p/j9btlg/reset-the-mysql-5-7-root-password-in-ubuntu-16-04-lts 

sudo nano /etc/mysql/my.conf
 hier einfügen:
[mysqld]
character-set-server=utf8
collation-server=utf8_general_ci
max_allowed_packet=256M
check variables in mysql: 
```
mysql -u root -p 	then 	show variables like 'char%';

mysql -u root -p
create user brillianicm@localhost identified by 'imbit15';
create user brilliancrm@localhost identified by 'imbit15';
create database icmcake;
create database cake;
grant all privileges on icmcake.* to brillianicm@localhost;
grant all privileges on cake.* to brilliancrm@localhost;
exit
mysql -u brillianicm -p
use icmcake;
source ~/icmcake.sql; 		(.sql file located in home directory of user)
exit
mysql -u brilliancrm -p
use cake;
source ~/cake.sql; 		(.sql file located in home directory of user)
exit

##	APACHE: 
	default document folder is /var/www/html
	default config folder is /etc/apache2
	sudo service apache2 start
Create the following .conf files in sites-available:
brillianCRM.conf, brillianICM.conf, brillianIDEAS.conf, mediawiki.conf
sudo nano brillianCRM.conf
paste the content from GitHub

activate the config by using the following command (it will copy it to sites-enabled)
sudo a2ensite FILE.conf
sudo service apache2 restart

sudo groupadd www
sudo adduser www-user www
sudo chgrp -R www /var/www/html
sudo chmod g+w /var/www/html

•	Install Tomcat: (read for example: https://www.digitalocean.com/community/tutorials/how-to-install-apache-tomcat-8-on-ubuntu-16-04 )
sudo apt-get install openjdk-9-jre
export JAVA_HOME="/usr/lib/jvm/java-9-oracle
/usr/lib/jvm/java-9-oracle
sudo groupadd tomcat
curl http://www-us.apache.org/dist/tomcat/tomcat-8/v8.5.24/bin/apache-tomcat-8.5.24.tar.gz > tomcat.tar.gz
sudo mkdir /opt/tomcat
sudo tar xzvf /tmp/tomcat.tar.gz -C /opt/tomcat --strip-components=1
cd /opt/tomcat
sudo chgrp -R tomcat /opt/tomcat
sudo chmod -R g+r conf 
sudo chmod g+x conf
sudo chown -R tomcat webapps/ work/ temp/ logs/
sudo update-java-alternatives -l
dies gibt den Pfad zu JAVA_HOME
sudo nano /etc/systemd/system/tomcat.service
Paste the following: 		(ATTENTION: tomcat loads these variables, not the system variables. If you point Environment=JAVA_HOME to a directory, tomcat will use this for starting)
[Unit]
Description=Apache Tomcat Web Application Container
After=network.target

[Service]
Type=forking

Environment=JAVA_HOME=$JAVA_HOME
Environment=CATALINA_PID=/opt/tomcat/temp/tomcat.pid
Environment=CATALINA_HOME=$CATALINA_HOME
Environment=CATALINA_BASE=/opt/tomcat
Environment='CATALINA_OPTS=-Xms512M -Xmx1024M -server -XX:+UseParallelGC'
Environment='JAVA_OPTS=-Djava.awt.headless=true -Djava.security.egd=file:/dev/./urandom'

ExecStart=/opt/tomcat/bin/startup.sh
ExecStop=/opt/tomcat/bin/shutdown.sh

User=tomcat
Group=tomcat
UMask=0007
RestartSec=10
Restart=always

[Install]
WantedBy=multi-user.target

sudo systemctl daemon-reload 
sudo systemctl start tomcat
sudo systemctl status tomcat
sudo ufw allow 8080
Add Inbound rule in AWS security groups for port 8080
sudo systemctl enable tomcat
sudo nano /opt/tomcat/conf/tomcat-users.xml
  add the line and change password: <user username="admin" password="password" roles="manager-gui,admin-gui"/>
here: security constraint in order to access GUI securely!

Comment out by adding the yellow letters in the following 2 context.xml:  <!--<Valve className="org.apache.catalina.valves.RemoteAddrValve" allow="127\.\d+\.\d+\.\d+|::1|0:0:0:0:0:0:0:1" />-->
sudo nano /opt/tomcat/webapps/manager/META-INF/context.xml
sudo nano /opt/tomcat/webapps/host-manager/META-INF/context.xml
sudo systemctl restart tomcat

Change environment variables:
sudo nano ~/.bashrc
Paste at the end:
#JAVA_HOME env
export JAVA_HOME=/usr/lib/jvm/java-9-openjdk-amd64
#CATALINA_HOME env
export CATALINA_HOME=/opt/tomcat
#CATALINA_BASE env
export CATALINA_BASE=/opt/tomcat
source ~/.bashrc 		(reload ..bashrc )
printenv			(shows all environment variables)

change password for tomcat: sudo passwd tomcat

When uploading a WAR file larger than 50 MB: Change the following in $CATALINA_HOME/webapps/manager/WEB-INF/web.xml
    <multipart-config>
      <!—default is 50MB max (value 52428800), new: 1,5GB (value 1500000000) -->
      <max-file-size>1500000000</max-file-size>
      <max-request-size>1500000000</max-request-size>
      <file-size-threshold>0</file-size-threshold>
    </multipart-config>

o	Access tomcat8 GUI via http://<publicDNS>:8080/manager/html 
•	MySQL Connector (JDBC) 
o	CHECK: is it really necessary? It is available as Maven project/ repository

cd /opt/tomcat/lib
sudo wget https://dev.mysql.com/get/Downloads/Connector-J/mysql-connector-java-5.1.45.tar.gz 
sudo tar xfv mysql-connector-java-5.1.45.tar.gz
cd mysql-connector-java-5.1.45
cp mysql-connector-java-5.1.45-bin.jar /opt/tomcat/lib/mysql-connector-java-5.1.45-bin.jar
sudo rm mysql-connector-java-5.1.45.tar.gz

sudo nano ~/.bashrc
export CLASSPATH=/usr/lib/jvm/java-9-openjdk-amd64:/opt/tomcat/lib:$CLASSPATH
source ~/.bashrc 

•	SSL certificates for the webapps
sudo mkdir $CATALINA_HOME/conf 
sudo $JAVA_HOME/bin/keytool -genkey -alias tomcat -keyalg RSA –keystore 
$CATALINA_HOME/conf/your-keystore.jks 

sudo $JAVA_HOME/bin/keytool -genkey -alias tomcat -keyalg RSA  -keypass imbit15 -storepass imbit15 -keystore $CATALINA_HOME/conf/tomcat-keystore.jks
Add to the server.xml file:

    <Connector port="8443" protocol="HTTP/1.1"
                SSLEnabled="true" maxThreads="150" scheme="https"
                secure="true" clientAuth="false" sslProtocol="TLS"
                keystoreFile="$CATALINA_HOME/conf/tomcat-keystore.jks"
                keystoreType="JKS" keystorePass="imbit15"   />

add the following to rc.local:
sudo nano /etc/rc.local
sudo iptables -t nat -I PREROUTING -p tcp --destination-port 443 -j REDIRECT --to-ports 8443 
sudo service tomcat restart

o	Reverse Proxy: port 8080 auf port 8443 über localhost  anschließend 8080 auf ufw entfernen
•	Install PHP:
o	sudo apt-get install php7.0-xsl 
•	Persistent Logging:
o	mkdir /var/log/journal
o	systemd-tmpfiles --create --prefix /var/log/journal
o	systemctl restart systemd-journald
o	Folgende Rechte für Log-Files wurden geändert von systemd-network zu syslog:
cd /var/log
sudo chown syslog auth.log
sudo chown syslog daemon.log
sudo chown syslog debug
sudo chown syslog dmesg
sudo chown syslog kern.log
sudo chown syslog lastlog
sudo chown syslog mail.log
sudo chown syslog syslog
sudo chown syslog user.log
sudo chown syslog uucp.log
•	Enable Ports: Folgende Ports werden für den Zugriff benötigt: Ports 22 (SSH), Port 80 (HTTP-Apache), Port 443 (HTTPS), Port 8080 (Tomcat)
o	check “sudo netstat -plnt” for active Internet connections
sudo iptables -P INPUT ACCEPT 
sudo iptables -F
sudo iptables -I INPUT -p tcp --dport 80 -j ACCEPT 
sudo iptables -I INPUT -p tcp --dport 443 -j ACCEPT 
sudo iptables -I INPUT -p tcp --dport 8080 -j ACCEPT 
sudo iptables --list

•	SSL certificates
o	Nginx: conf.d SSL config: will Nginx be used?????
server { 
listen 	443 ssl; 
server_name brillianicm.com www.brillianicm.com; 
ssl_certificate /etc/nginx/ssl/brillianicm.crt; 
ssl_certificate_key /etc/nginx/ssl/brillianicm.key; 
ssl_session_cache shared:SSL:1m; ssl_session_timeout 5m; 
ssl_ciphers HIGH:!aNULL:!MD5; 
ssl_prefer_server_ciphers on;
o	Um das vertrauenswürdige Zertifikat von geoTrust zu nutzen muss es zusammen mit dem Privatekey von 1und1.de in das PKCS12Format umgewandelt werden:
openssl pkcs12 –export in „TrustedCERT.crt“ inkey „PrivateKEY.key“ -out KEYSTORE.p12 -name "some alias"
Keytool-importkeystore -srckeystore KEYSTORE.p12 -srcstoretype PKCS12 -destkeystore TOMCAT.keystore
o	https://www.digitalocean.com/community/tutorials/how-to-encrypt-tomcat-8-connections-with-apache-or-nginx-on-ubuntu-16-04 

•	ConfirmRegistation:
o	https://brillianCRM.com/app/ConfirmRegistration?email=c4312551@trbvm.com&ue=28152 brillianCRM.com muss hier dann durch den richtigen Servernamen ersetzt werden.
•	Repositories hinzufügen??? nginx/mySQL,…
