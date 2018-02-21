# MediaWiki Install & Setup

This guide explains how to boot the virtual image, containing the MediaWiki-Backup and how to install the most recent version of the mediawiki on the server.
Moreover, it is shortly described how articles and photos can be transferred from the backup to the fresh installation.

## Installation of the VMWare Player and boot of backup image

* Download the "Wiki zu Cloud Computing 20120604.zip" archive and extract it.
* It contains a instruction "Anleitung.pdf" with useful tips, tools and credentials as well as the Virtual Image of the Wiki

In order to boot the Wiki you neeed a virtual machine. In the instruction, Oracle Virtual Box, VMWare Workstation Player and VmWare Fusion are recommended.
We recommend the VMWare Workstation Player, as it is free, and easy to configure.
* Download it from: https://my.vmware.com/de/web/vmware/free#desktop_end_user_computing/vmware_workstation_player/12_0
### VMWare Workstation Player setup
* Install the VMWare Workstation Player (standard configuration is fine)
* Open the VMWare Workstation Player and choose "Open A Virtual Machine" from the menu and select the bitnami-mediawiki-1.19.0-0-ubuntu-12.04.vmx in the VM folder of the extracted archive.
* Then, the virtual machine is created and is displayed in the menu on the right-hand side
* IMPORTANT: Before starting the VM, click "Edit virtual machine settings" and go to the section "Network Adapter". THe option "Bridged (Automatic) is selected by default. However, only "NAT" has worked for me. Change the setting to "NAT". This way the client can access and use the host ip (localhost), which is needed to access the media wiki by a web browser.
*Start the virtual machine, by clicking the Play Button
* In the fist pop-up window choose, "I copied it".
* The linux system is now booting, once it is ready one can see the ip adress (first line in orange) e.g. http://192.168.170.130
* Now enter the ip address in the browser bar of your preffered web browser.
* The MediaWiki launches and it is ready to use.
* Optional: You can log into the linux system by entering the credential stated in the "Anleitung.pdf" i.e. name = bitnami, password=bitnami. The login will be required later to transfer images and articles.

## Installion of the recent MediaWiki on a Ubuntu/Debian based server
* Official Installation guide for Debian & Ubuntu: https://www.mediawiki.org/wiki/Manual:Running_MediaWiki_on_Debian_or_Ubuntu
### Download and Preparation
* Log into the server as root user via ssh (see other documentations) and execute the following commands.
```
sudo apt-get update
sudo apt-get upgrade
sudo apt-get install apache2  libapache2-mod-php php-mbstring
```
* The following should already be installed as they are required by the serious game: mysql-server php php-mysql php-xml. If this is not the case, they need to be installed as well:
```
sudo apt-get update
sudo apt-get upgrade
sudo apt-get install apache2 mysql-server php php-mysql libapache2-mod-php php-xml php-mbstring
```
* Make a directory for the installation files and download them
```
mkdir /DownloadMediaWiki/
cd /DownloadMediaWiki/
wget https://releases.wikimedia.org/mediawiki/1.30/mediawiki-1.30.0.tar.gz
```
* Extract files and move them to the correct directory
tar -xvzf /DownloadMediaWiki/mediawiki-*.tar.gz
sudo mkdir /var/lib/mediawiki
sudo mv mediawiki-*/* /var/lib/mediawiki
* Optional: remove installation files:
```
cd /DownloadMediaWiki/
rm -R  mediawiki-*
cd /
rm -R /DownloadMediaWiki/
```
### Configuration
* Login as Mysql root user and create a user for the mediwiki:
```
mysql -u root -p
create user Wiki@localhost identified by 'yourpassword';
create database my_wiki; 
grant all privileges on my_wiki.* to Wiki@localhost; 
exit
```
*Navigate your browser to http://localhost/mediawiki or try http://localhost/mediawiki/config or http://wiki.hostname.com/config instead).Localhost is the ip adress e.g. 221.xxx.xxx.xxx. If you receive a 404 error then do the following:
```
cd /var/www/html
sudo ln -s /var/lib/mediawiki mediawiki
```
* and exute these commands as well:

```
 sudo phpenmod mbstring
 sudo phpenmod xml
 sudo systemctl restart apache2.service
```
*Try to open http://212.xxx.xxx.xxx/mediawiki/. You should see a welcome screen with the mediawikilogo (a flower), and you can now configure the LocalSettings.php by clicking onto the link "set up the wiki".
* As language choose German twice and press "Weiter".
* Press "Weiter" (continue)
* Choose "localhost" (default value) as database server, choose my_wiki as database name and type Wiki as user and fill in the password.
* Press "weiter", accept the default settings in the next screen, press "weiter" again.
* In the next section enter "Cloud Computing Workshop" as name, "Admin" as user name and enter the password (cf. Orga-pdf), enter the wimbit google mail address as email address.
* click on "weiter" until you reach the screen, where you are requested to click on the "Install" button. 
* Press "install" and then "weiter".
* Then the automatic download of the LocalSettings.php is triggered, you need to transfer this localSettings.php from your local pc to the Ubuntu server.

### Upload localSettings.php to the server
* Use a program such as filezilla to upload the LocalSettings.php to upload the file using ftp/sftp onto the server
* Check, that the file name is "LocalSettings.php"
* The file needs to be stored in /var/lib/mediawiki, if you cannot directly upload it into this directory due to access rights move it by using the following command.
```
sudo mv /youruploadpath/LocalSettings.php /var/lib/mediawiki/LocalSettings.php
```
* Now go back to your browser and open http://212.xxx.xxx.xxx/mediawiki/ again. You should see the fresh installation and main page of the media wiki, in the next section it will be explained how to transfer the articles and images from the back up to the new installation

## Restoring articles & images
There is no possibility to copy the content 1:1 from mediawiki A to mediawiki B. 
images and articles need to be transferred manually. 
### Change the logo
The default logo is the mediawiki flower, if you want to change or remove it you need to do the following steps:
*Open the LocalSettings.php with the nano editor:
```
sudo nano \var\lib\mediawiki\LocalSettings.php
```
*Then look for for logo by pressing Strg+W and entering logo.
Nano will jump to the $wgLogo variable.
```
##The URL path to the logo.  Make sure you change this from the default,
##or else you'll overwrite your logo when you upgrade!
$wgLogo = "$wgResourceBasePath/resources/assets/wiki.png";
```
Change the default path of wgLogo, to the path of your desired logo.
If you do not want to use a logo, just change the name of the picture to wiki1.png. Since wiki1.png does not exist (unless you create it :)) the browser will not display a logo.

### Transfer the images
Before we can create the articles we first need to restore the images, which will be used in the articles.
To download all the pictures of the backup (I have uploaded the images as zip archive on box, so you can skip this step):
* Log into the virtual machine with the media wiki backup. User and pw are both bitnami.
All images are located in /opt/bitnami/apps/mediawiki/htdocs/images.
Create an archive of this images folder by using
```
Tar -cvf images.tar /opt/bitnami/apps/mediawiki/htdocs/images
```
The images.tar file is also created in the …/htdocs/images folder. 
You can access the folder with your browser:
http://192.xxx.xxx..xxx/mediawiki/images/ 
•	Download the tar archive
* Upload the tar archive onto the ubuntu server with the fresh media wiki installation (as previously you can use filezilla and the transfer directory).
* Now extract the images.tar file in the /root/transfer/ directory by executing:
```
tar -xvf /root/transfer/images.tar
```
Then we can use a php function to import all images in a directory into the mediawiki:
```
sudo php /var/lib/mediawiki/maintenance/importImages.php --search-recursively /root/transfer/images
```
* All images should be automatically be imported, and can now be used within the articles.

### Create articles
There is an overview page containing all pages. You can access it by going to "Spezialseiten" > "Alle Seiten".
There should be 12 pages:
* Amazon Web Services	
* Arbeitsplatz aus der Cloud	
* Business Intelligence & Analytics
* Cloud Orchestration	
* Customer Relationship Management	
* Einführung Cloud Computing
* Google App Engine
* Hauptseite
* Main Page
* Microsoft Azure
* Microsoft Office 365	
* SAP Business ByDesign

* Open each page and go to the edit mode in order to copy the markup/xml code from the backup
* Then create a new page, to do so just copy the url of the backup but replace the ip adress:
Backup = 192.xxx.xxx.xxx/mediawiki/index.php/Amazon_Web_Services
New Installation = http://212.xxx.xxx.xxx/mediawiki/index.php/Amazon_Web_Services
Since the page Amazon_Web_Services does not exist yet, mediawiki asks you to create this page. The edit mode will be opened, when clicking on erstellen/create. All you need to do now is to paste the markup of the back up article. The images are detected automatically, as the name is the same. 
* Save the article and repeat these steps for all other articles.

### Further tweaks:
You might have noticed, that articles in the backup mediawiki can be accesed by a sidebar. The sidebar can be configured  by editing the following page: 
http://212.xxx.xxx.xxx/mediawiki/index.php/MediaWiki:Sidebar
So you just need to copy the markup content of this page from the backup and paste it to the new installation (same process as creating a new page).
Hint: You need admin rights to access the Mediawiki:Siderbar page. The backup uses: username: user, pw: bitnami as credentials.

Additionaly, there are some errors with the referencing, because the "Cite" plugin is deactivated by default. In order to activate it edit your LocalSettings.php file by adding wfLoadExtension( 'Cite' ); at the end:
```
sudo nano /var/lib/mediawiki/LocalSettings.php

# End of automatically generated settings.
# Add more configuration options below.
wfLoadExtension( 'Cite' );
```


### Configure the URL
Finally, the mediawiki should not be accessed by its IP, but by a domain name. 
This can be configured in the conf files located in /etc/apache2/sites-available.
* You need to create a mediawiki.conf file
```
sudo nano /etc/apache2/mediawiki.conf
```
* Then paste the following content into this file
```
<VirtualHost *:80>
        ServerAdmin admin@yourdomain.com
        DocumentRoot /var/www/html/mediawiki/

        <Directory /var/www/html/mediawiki/>
                Options FollowSymLinks
                AllowOverride All
                Order allow,deny
                allow from all
        </Directory>

        ErrorLog /var/log/apache2/wiki.error_log
        CustomLog /var/log/apache2/wiki-access_log common


#        ProxyPreserveHost On
#        ProxyRequests Off
        ServerName wiki.brillianideas.com
        ServerAlias www.wiki.brillianideas.com
        
</VirtualHost>
```
* Reboot Apache2 by executing:
```
sudo service apache2 reload
```
* Now the page is accesible by wiki.brillianideas.com and www.wiki.brillianideas.com, if you want to use https you have to extend the mediawiki.conf accordingly.
