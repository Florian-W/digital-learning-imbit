package org.dhbw.imbit11.backend;

import org.apache.shiro.authc.credential.DefaultPasswordService;
import org.apache.shiro.crypto.hash.DefaultHashService;
import org.apache.shiro.crypto.hash.Sha256Hash;
import org.apache.shiro.util.SimpleByteSource;

/**
 * this class defines the encryption that shiro applies to passwords before storing
 * them into the database is used as well to decrypt them for veryfication
 * the private salt used here has to be set as well in the web.xml where the settings
 * for shiro are made. however in the web.xml this private salt needs to be base64 encoded
 * 
 * @author Mary
 */

public class PasswordEncryptor {

	/**
	 * Encryption of an user's password
	 * 
	 * @param password - contains the password that the user entered
	 * 
	 * @return encrypted password - contains the password encrypted with shiro
	 */
	public String hashPassword(String password){
		
		int iterations = 500000;
		String privateSalt = "W!rS!ndIMB!T2011$&$";
		
		DefaultHashService hashService = new DefaultHashService();
		hashService.setHashIterations(iterations); // 500000
		hashService.setHashAlgorithmName(Sha256Hash.ALGORITHM_NAME);
		hashService.setPrivateSalt(new SimpleByteSource(privateSalt)); // Same salt as in shiro.ini, but NOT base64-encoded.
		hashService.setGeneratePublicSalt(true);

		DefaultPasswordService passwordService = new DefaultPasswordService();
		passwordService.setHashService(hashService);
		String encryptedPassword = passwordService.encryptPassword(password);
		return encryptedPassword;
		
	}
	
	
}
