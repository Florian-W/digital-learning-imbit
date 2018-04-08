package org.dhbw.imbit11.backend;

import javax.naming.InitialContext;
import javax.naming.NamingException;
import javax.sql.DataSource;

import org.apache.shiro.realm.jdbc.JdbcRealm;

/*
 * this class is required for shiro
 * the data source is defined in the context.xml file
 * 
 */

/**
 * Sub-class of JdbcRealm that defines
 * the Data Source the JdbcRealm should
 * use
 * The configuration specified in web.xml
 * will cause an object of this class to 
 * be injected into the SecurityManager
 * 
 * @author brucephillips
 *
 */
public class RoleSecurityJdbcRealm extends JdbcRealm {

	public RoleSecurityJdbcRealm() {
		
		super();

		//get the DataSource that JSecurity's JdbcRealm
		//should use to find the user's password
		//using the provided username
		//see context.xml for this DataSource's properties
        InitialContext ic;
        DataSource dataSource;
		try {
			
			ic = new InitialContext();
			dataSource = (DataSource) ic.lookup("java:/comp/env/jdbc/security");
			this.setDataSource(dataSource);
			
		} catch (NamingException e) {
			
			e.printStackTrace();
			
		}
		
		setAuthenticationQuery("select password from user where email = ?");
		//setPermissionsQuery("select permission from user_roles where role = ?");
		//"select password, password_salt from users where username = ?"
		setUserRolesQuery("select role from user where email = ?");
	
	}

}
