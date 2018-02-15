# Configuration for email

Emails are send when a new user registrates himself or wants a certificate.

## Parameters that have to be set:

The following settings have to be made in appname/WEB-INF/web.xml

* Domain: this domain will be used within the ConfirmRegistration mail as a link to click on (if you want to test it locally keep the below configuration, otherwise change it to your server domain name)
* Mailserver: SMTP URL from the mail provider
* Mailport: setting by the provider for SMTP
* Mailuser: email address you like to send the mail with
* Mailpw (Mailuser's password): the password for the chosen email address
* smtpauth: set as true
* smtptls: set as true
 
    <!-- Context Parameter for Mail -->
    <context-param>
        <param-name>domain</param-name>
        <param-value>localhost:8080</param-value>
    </context-param>
    <context-param>
        <description>Mail-Server for outgoing mails</description>
        <param-name>mailserver</param-name>
        <param-value>smtp.1und1.de</param-value>
    </context-param>
    <context-param>
        <description>Mailport for SMTP-Server</description>
        <param-name>mailport</param-name>
        <param-value>587</param-value>
    </context-param>
    <context-param>
        <description>Mail-User for mailserver</description>
        <param-name>mailuser</param-name>
        <param-value>no-reply@xxxxx.xx</param-value>
    </context-param>
    <context-param>
        <description>Password for Mail-User</description>
        <param-name>mailpw</param-name>
        <param-value>xxxxxxx</param-value>
    </context-param>
    <context-param>
        <description>Setting for SMTP authentification</description>
        <param-name>smtpauth</param-name>
        <param-value>true</param-value>
    </context-param>
    <context-param>
        <description>Setting for SMTP TLS</description>
        <param-name>smtptls</param-name>
        <param-value>true</param-value>
    </context-param>
