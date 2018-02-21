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
* Congrats! - The MediaWiki has been installed, and configured!



