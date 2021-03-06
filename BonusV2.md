* web + desktop + mobile + TV
    * Accès en HTTPS
    * Auto-lock PIN
    * Responsive Design
    * Réimplémentation du module base32 (thirty-two) pour angular2
    * Adaptation des algorithmes TOTP/HOTP en Javascript coté client (dans le navigateur)
    * Réutilisation du code entre OTPManager et LoginOTP
    * Multi-comptes
    * Configuration (type algo OTP, algo de hashage, validité, début, longueur)
    * Compatible avec Google
    * Hébergé publiquement en ligne
    * QR Code Scanner/Générateur
    * Connection au server
    * Copie du code OTP dans le presse papier
    * Accès rapide et sécurisé
    * Stockage des informations dans le localStorage du navigateur de manière chiffré
* Server de données
    * Accessible en HTTPS
    * Permet de récupérer les données des comptes et d'en créer
    * Multi-utilisateur
    * Base de données chiffrées avec stockage des hashs des mots de passes hashé avec bcrypt
    * Permet de créer un compte et de s'y connecter
* Paquets Client lourd
    * Linux 32 / 64 bits
        * AppImage, Deb, RPM, FreeBSD, archives compréssées
    * Windows 32 / 64 bits
        * exe, msi, zip, Windows Universal Apps (not build)
    * MacOS
        * dmg, pkg
    * Android
        * apk
    * iOS (not build)
    * WebOS
        * ipk

* Création d'un module bien documenté nodeJS myotp RFC ++compliant (Look Ahead Window, time offset, algorithmes de hachage sha1, sha256, sha512)
* Implémentation de 3 méthodes par type d'algo OTP
	* generate (Valeurs par défaut proposé, compatible avec Google)
	* verify (affiche le delta entre les 2 tokens, et est timing attack safe)
	* generateKeyUri (génération de la chaîne de caractère permettant de générer un QR code)
* Création d'un serveur de validation OTP
	* RFC
	* API REST
	* CRUD
	* Accès en HTTPS
	* DB chiffré avec sqlcipher
	* Authentification
	* Un utilisateur peut avoir plusieurs comptes avec un mote de passe différent pour chacun
	* Intégration PAM
