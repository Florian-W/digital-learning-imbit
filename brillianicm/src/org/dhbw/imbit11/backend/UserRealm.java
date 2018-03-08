package org.dhbw.imbit11.backend;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.regex.Pattern;

import javax.naming.InitialContext;
import javax.naming.NamingException;
import javax.sql.DataSource;

import org.apache.shiro.realm.jdbc.JdbcRealm;
import org.apache.shiro.util.JdbcUtils;

/**
 * Main class that provides functions to interact with the user database
 * containing tables for users, user progress and groups
 * 
 * @author unknown
 * @version 1.0
 * 
 */
/*
 * Philipp K. 29.2.16 Update new ProgressQuery so users start with 0,0,0
 * progress
 *
 * 3.3.16 Insert new setProgressQueryWithoutKPI so the user KPI's are not
 * effected anymore
 * 
 * 5.3.16 Insert new getUserEmailByID query so the email can be loaded
 * 
 * 1.3.18 Added openBadge support
 */

public class UserRealm extends JdbcRealm {

	protected String getUserByEmail = "SELECT `user_id` FROM `user` WHERE `email` = ?";
	protected String getUserIdsByGroupId = "SELECT `user_id` FROM `user` WHERE `group` = ?";
	protected String getUserEmailByID = "SELECT `email` FROM `user` WHERE `user_id` = ?";
	protected String getUserGenderByID = "SELECT `gender` FROM `user` WHERE `user_id` = ?";
	protected String getUserGroupByID = "SELECT `group` FROM `user` WHERE `user_id` = ?";
	protected String getUserGroupByEmail = "SELECT `group` FROM `user` WHERE `email` = ?";

	protected String newgroupQuery = "INSERT INTO `group`(`group_name`, `professor_id`, `org`, `description`, `url`) VALUES (?,(SELECT `user_id` FROM `user` WHERE `email` = ?),?,?,?)";
	protected String newUserQuery = "INSERT INTO `user`(`email`, `last_name`, `first_name`, `password`, `role`, `group`,`gender`) VALUES (?,?,?,?,?,?,?)";
	protected String newProgressQuery = "INSERT INTO `user_progress` VALUES (?,0,0,0,'l000e000', FALSE, FALSE, FALSE, FALSE, FALSE, FALSE, FALSE)";

	protected String deleteUserQuery = "DELETE FROM `user` WHERE `email`=?";
	protected String deleteGroupQuery = "DELETE FROM `group` WHERE `group_id`=?";
	protected String deleteGroupMembersQuery = "DELETE FROM `user` WHERE `group`=?";
	protected String deleteProfessorQuery = "DELETE FROM `user` WHERE `email`=?";
	protected String getProfessorsQuery = "SELECT `first_name`, `last_name`, `email` FROM `user` WHERE `role` = 'professor'";

	protected String updateEmailQuery = "UPDATE `user`SET `email`=? WHERE `email`=?";
	protected String updatePasswordQuery = "UPDATE `user`SET `password`=? WHERE `email`=?";
	protected String setProgressQuery = "UPDATE `user_progress` SET `cost`=?, `quality`=?, `time`=?, `path`=? WHERE `user_id` = ?";
	protected String setProgressQueryWithoutKPI = "UPDATE `user_progress` SET `path`=? WHERE `user_id` = ?";
	protected String setLvlIdQuery = "UPDATE `user_progress` SET `path`=? WHERE `user_id` = ?";
	protected String setCountryTrueQuery = "UPDATE `user_progress` SET %%=true WHERE `user_id` = ?";
	protected String resetCountriesQuery = "UPDATE `user_progress` SET l1=FALSE, l2=FALSE, l3=FALSE, l4=FALSE, l5=FALSE, l6=FALSE, l7=FALSE WHERE `user_id` = ?";
	protected String getProgressQuery = "SELECT `last_name`, `first_name`, `gender`,`cost`, `quality`, `time`, `path` FROM `user_progress`, `user` WHERE `user_progress`.`user_id`= `user`.`user_id` AND `user_progress`.`user_id`=?";
	private static final String GET_VISITED_COUNTRIES_QUERY = "SELECT l1, l2, l3, l4, l5, l6, l7 FROM `user_progress`, `user` WHERE `user_progress`.`user_id`= `user`.`user_id` AND `user_progress`.`user_id`=?";

	protected String getStudentsForProfessorQuery = "SELECT `first_name`, `last_name`, `cost`, `quality`, `time` , `group_name`, `email`, `group`  FROM `user`, `user_progress` , `group` WHERE `user`.`user_id` = `user_progress`.`user_id` AND`user`.`group` IN (SELECT `group_id` FROM `group` WHERE `professor_id` = (SELECT `user_id` FROM`user` WHERE `email` = ?)) AND `user`.`group` = `group`.`group_id` ORDER BY `last_name` ASC";
	protected String getGroupsForProfessorQuery = "SELECT * FROM `group`WHERE `professor_id`= (SELECT `user_id` FROM `user` WHERE `email` = ?)ORDER BY `group_name` ASC";
	protected String groupExistsQuery = "SELECT COUNT(`group_id`) FROM `group` WHERE `group_id`=?";
	protected String userExistsQuery = "SELECT Count(email) from `user` WHERE `email`=?";

	protected String getSettings = "SELECT * FROM `settings`";
	protected String setSettings = "UPDATE `settings` SET `audio`=?, `video`=?, `tts`=?, `subtitles`=?";
	protected String setCertificate = "Update `group` SET `certificate`=? WHERE `group_id`=?";
	protected String getCertificate = "SELECT `certificate` FROM `group` WHERE `group_id`=?";

	protected String getBadgeAssertionID = "SELECT COUNT(`UID`) FROM `badges`";
	protected String newBadgeQuery = "INSERT INTO `badges` VALUES (?,?,?,?)";
	protected String getIssuerOrgQuery = "SELECT `org` FROM `group` WHERE `group_id`=?";
	protected String getIssuerDescQuery = "SELECT `description` FROM `group` WHERE `group_id`=?";
	protected String getIssuerURLQuery = "SELECT `url` FROM `group` WHERE `group_id`=?";
	
	/**
	 * Invokes the constructor of parent class (superclass) function looks up an
	 * insert in the database
	 */
	public UserRealm() {
		super();

		// get the DataSource that JSecurity's JdbcRealm
		// should use to find the user's password
		// using the provided username
		// see context.xml for this DataSource's properties
		InitialContext ic;
		DataSource dataSource;
		try {

			ic = new InitialContext();
			dataSource = (DataSource) ic.lookup("java:/comp/env/jdbc/security");
			this.setDataSource(dataSource);

		} catch (NamingException e) {

			e.printStackTrace();

		}
	}

	/**
	 * Invoked in java class NewUsergroup Creates a new group with the first
	 * parameter as group name and assigned to the professor that is defined by his
	 * email in the second parameter of the function
	 * 
	 * @param groupname
	 *            - gets the groupname from java class NewUsergroup
	 * @param professor
	 *            - contains the professor that wants to create a group
	 * @throws SQLException
	 *             - throws a database access error
	 */
	protected void createNewGroup(String groupname, String professor, String org_name, String org_description, String org_url) throws SQLException {
		Connection conn = dataSource.getConnection();
		PreparedStatement ps = null;
		try {
			ps = conn.prepareStatement(newgroupQuery);
			ps.setString(1, groupname);
			ps.setString(2, professor);
			ps.setString(3, org_name);
			ps.setString(4, org_description);
			ps.setString(5, org_url);

			// Execute query
			ps.executeUpdate();
			// System.out.println("executed the following statement on DB: " +
			// newgroupQuery);
		} finally {
			JdbcUtils.closeStatement(ps);
			conn.close();
		}
	}

	public ArrayList<Boolean> getSettings() throws SQLException {
		Connection conn = dataSource.getConnection();
		PreparedStatement ps = null;
		ResultSet rs = null;
		ArrayList<Boolean> settings = new ArrayList<Boolean>();
		try {
			ps = conn.prepareStatement(getSettings);
			rs = ps.executeQuery();
			while (rs.next()) {
				settings.add(rs.getBoolean(1));
				settings.add(rs.getBoolean(2));
				settings.add(rs.getBoolean(3));
				settings.add(rs.getBoolean(4));
			}
		} finally {
			JdbcUtils.closeStatement(ps);
			conn.close();
		}
		return settings;
	}

	protected void setSettings(Boolean audio, Boolean video, Boolean tts, Boolean subtitles) throws SQLException {
		Connection conn = dataSource.getConnection();
		PreparedStatement ps = null;
		// what about null values?
		try {
			ps = conn.prepareStatement(setSettings);
			ps.setBoolean(1, audio);
			ps.setBoolean(2, video);
			ps.setBoolean(3, tts);
			ps.setBoolean(4, subtitles);
			ps.executeUpdate();
		} finally {
			JdbcUtils.closeStatement(ps);
			conn.close();
		}

	}
	/*
	 * Philipp K. 7.3.16 Query to set the Certificate Value for a specific group Is
	 * needed to enable and disable certificate sending
	 */

	protected void setCertificate(String group_id, String certificate) throws SQLException {
		Connection conn = dataSource.getConnection();
		PreparedStatement ps = null;
		// what about null values?
		try {
			ps = conn.prepareStatement(setCertificate);
			ps.setString(1, certificate);
			ps.setString(2, group_id);
			ps.executeUpdate();
		} finally {
			JdbcUtils.closeStatement(ps);
			conn.close();
		}

	}

	/*
	 * Philipp K. 7.3.16 Query to get the Certificate Value for a specific group Is
	 * needed to enable and disable certificate sending
	 */

	public String getCertificate(String group_id) throws SQLException {
		Connection conn = dataSource.getConnection();
		PreparedStatement ps = null;
		ResultSet rs = null;
		String certificate = "";
		// what about null values?
		try {
			ps = conn.prepareStatement(getCertificate);
			ps.setString(1, group_id);

			rs = ps.executeQuery();

			while (rs.next()) {
				certificate = rs.getString(1);
			}

		} finally {
			JdbcUtils.closeStatement(ps);
			conn.close();
		}
		return certificate;
	}

	public int getBadgeAssertionID() throws SQLException {
	    Connection conn = dataSource.getConnection();
	    PreparedStatement ps = null;
	    ResultSet rs = null;
	    int badgesCount = 0;
	    try {
	        ps = conn.prepareStatement(getBadgeAssertionID);
	        rs = ps.executeQuery();
	        
	        while (rs.next()) {
				badgesCount = Integer.parseInt(rs.getString(1));
	        }

	        badgesCount += 1;

	    } finally {
	        JdbcUtils.closeStatement(ps);
	        conn.close();
	    }
	    return badgesCount;
	}

	public void newBadge(String UID, String recipient, String badge, String issuedOn) throws SQLException {
	    Connection conn = dataSource.getConnection();
	    PreparedStatement ps = null;
	    try {
	        ps = conn.prepareStatement(newBadgeQuery);
	        ps.setString(1, UID);
	        ps.setString(2, recipient);
	        ps.setString(3, badge);
	        ps.setString(4
	        	, issuedOn);
	        ps.executeUpdate();

	    } finally {
	        JdbcUtils.closeStatement(ps);
	        conn.close();
	    }
	}

	public String[] getIssuerInfo(int group) throws SQLException {
	    Connection conn = dataSource.getConnection();
	    PreparedStatement ps = null;
	    ResultSet rs = null;
	    String[] issuer_info = new String[3];
	    try {
	        ps = conn.prepareStatement(getIssuerOrgQuery);
	        ps.setLong(1, group);
//	        System.out.println("Executed Org : " + ps);
	        rs = ps.executeQuery();

	        
	        while (rs.next()) {
				issuer_info[0] = rs.getString(1);
	        }
//	        System.out.println("the userid was "+ issuer_info[0]);
	        
	        ps = conn.prepareStatement(getIssuerDescQuery);
	        ps.setLong(1, group);
//	        System.out.println("Executed Desc : " + ps);
	        rs = ps.executeQuery();

	        
	        while (rs.next()) {
				issuer_info[1] = rs.getString(1);
	        }
//			System.out.println("the userid was "+ issuer_info[1]);
			
	        ps = conn.prepareStatement(getIssuerURLQuery);
	        ps.setLong(1, group);
//	        System.out.println("Executed URL : " + ps);
	        rs = ps.executeQuery();

	        
	        while (rs.next()) {
				issuer_info[2] = rs.getString(1);
	        }
	//        System.out.println("the userid was "+ issuer_info[2]);

	    } finally {
	        JdbcUtils.closeStatement(ps);
	        conn.close();
	    }
	    return issuer_info;
	}

	
	/**
	 * Invoked in java class ProfessorMain does not work if the user has no
	 * corresponding entry in the user_progress table returns an array list with
	 * arraylist for each student that is part of the group of the professor defined
	 * by the email that is entered as parameter
	 * 
	 * the following information is stored about the students in each row of the
	 * arraylist: 0:first_name, 1:last_name, 2:cost, 3:quality, 4:time,
	 * 5:group_name, 6:email, 7:group
	 * 
	 * @param professor
	 *            - gets the name of a professor from java class ProfessorMain
	 * 
	 * @return studentsForProfessor - contains array list with each student that is
	 *         part of a group from a certain professor
	 * 
	 * @throws SQLException
	 *             - throws a database access error
	 */
	protected ArrayList<ArrayList<String>> getUsersForProfessor(String professor) throws SQLException {
		Connection conn = dataSource.getConnection();
		PreparedStatement ps = null;
		ResultSet rs = null;
		ArrayList<ArrayList<String>> studentsForProfessor = new ArrayList<ArrayList<String>>();
		try {
			ps = conn.prepareStatement(getStudentsForProfessorQuery);
			ps.setString(1, professor);

			// Execute query
			rs = ps.executeQuery();
			// System.out.println("executed the following statement on DB: " +
			// getStudentsForProfessorQuery);

			while (rs.next()) {
				ArrayList<String> studentRow = new ArrayList<String>();
				studentRow.add(rs.getString(1));
				studentRow.add(rs.getString(2));
				studentRow.add(rs.getString(3));
				studentRow.add(rs.getString(4));
				studentRow.add(rs.getString(5));
				studentRow.add(rs.getString(6));
				studentRow.add(rs.getString(7));
				studentRow.add(rs.getString(8));
				if (isUserFinished(rs.getString(7)) == true) {
					studentRow.add("Yes");
				} else {
					studentRow.add("No");
				}
				studentsForProfessor.add(studentRow);
			}
		} finally {
			JdbcUtils.closeStatement(ps);
			conn.close();
		}
		return studentsForProfessor;
	}

	/**
	 * @author Philipp E.
	 * @param group_id:
	 *            Group of the group from which userIds should be retrieved
	 * @return Array of userIds matching a group_id
	 * @throws SQLException
	 *             - throws a database access error
	 */

	protected ArrayList<String> getUserIdsByGroupId(String group_id) throws SQLException {
		Connection conn = dataSource.getConnection();
		PreparedStatement ps = null;
		ResultSet rs = null;
		ArrayList<String> userIds = new ArrayList<String>();
		try {
			ps = conn.prepareStatement(getUserIdsByGroupId);
			ps.setString(1, group_id);

			// Execute query
			rs = ps.executeQuery();
			// System.out.println("executed the following statement on DB: " +
			// getStudentsForProfessorQuery);

			while (rs.next()) {
				String studentRow = rs.getString(1);
				userIds.add(studentRow);
			}
		} finally {
			JdbcUtils.closeStatement(ps);
			conn.close();
		}
		return userIds;
	}

	/**
	 * Invoked in java class AdminMain returns an array list with an array list
	 * containing information for each professors currently registered in the
	 * database each professor row contains the following information: 0:first_name,
	 * 1:last_name, 2:email
	 * 
	 * @return studentsForProfessor - contains an arraylist with all professors that
	 *         are currently registered
	 * 
	 * @throws SQLException
	 *             - throws a database access error
	 * 
	 */
	protected ArrayList<ArrayList<String>> getProfessors() throws SQLException {
		Connection conn = dataSource.getConnection();
		PreparedStatement ps = null;
		ResultSet rs = null;
		ArrayList<ArrayList<String>> studentsForProfessor = new ArrayList<ArrayList<String>>();
		try {
			ps = conn.prepareStatement(getProfessorsQuery);

			// Execute query
			rs = ps.executeQuery();
			// System.out.println("executed the following statement on DB: " +
			// getStudentsForProfessorQuery);

			while (rs.next()) {
				ArrayList<String> studentRow = new ArrayList<String>();
				studentRow.add(rs.getString(1));
				studentRow.add(rs.getString(2));
				studentRow.add(rs.getString(3));
				studentsForProfessor.add(studentRow);
			}
		} finally {
			JdbcUtils.closeStatement(ps);
			conn.close();
		}
		return studentsForProfessor;
	}

	/**
	 * Invoked in java class ProfessorMain returns an arraylist with name and
	 * registration link for each group of a professor
	 * 
	 * @param professor
	 *            - gets the name of a professor from java class ProfessorMain
	 * 
	 * @return groups - arraylist with groupnames and fitting registration links
	 * 
	 * @throws SQLException
	 *             - throws a database access error
	 */
	protected ArrayList<ArrayList<String>> getGroupsForProfessor(String professor) throws SQLException {
		Connection conn = dataSource.getConnection();
		PreparedStatement ps = null;
		ResultSet rs = null;
		ArrayList<ArrayList<String>> groups = new ArrayList<ArrayList<String>>();
		try {
			ps = conn.prepareStatement(getGroupsForProfessorQuery);
			ps.setString(1, professor);

			// Execute query
			rs = ps.executeQuery();
			System.out.println("executed the following statement on DB: " + ps);
			while (rs.next()) {
				ArrayList<String> groupRow = new ArrayList<String>();
				groupRow.add(rs.getString(1));
				groupRow.add(rs.getString(2));
				groupRow.add(rs.getString(4));
				groups.add(groupRow);
			}
		} finally {
			JdbcUtils.closeStatement(ps);
			conn.close();
		}
		return groups;
	}

	/**
	 * 
	 * Returns true if a group with the given groupid does already exist in the
	 * database
	 * 
	 * @param groupid
	 *            - contains the id of a group that might exists
	 * 
	 * @throws SQLException
	 *             - throws a database access error
	 * 
	 * @return returnValue - contains true if group exists or false when not
	 */
	protected boolean groupExists(String groupid) throws SQLException {
		Connection conn = dataSource.getConnection();
		PreparedStatement ps = null;
		ResultSet rs = null;
		boolean returnValue = false;
		try {
			ps = conn.prepareStatement(groupExistsQuery);
			int gid = Integer.parseInt(groupid);
			// System.out.println(""+gid);
			ps.setInt(1, gid);

			// Execute query
			rs = ps.executeQuery();
			// System.out.println("executed the following statement on DB: " +
			// groupExistsQuery);

			while (rs.next()) {
				int returning = rs.getInt(1);
				returnValue = returning > 0;
			}
		} finally {
			JdbcUtils.closeStatement(ps);
			conn.close();
		}
		return returnValue;
	}

	/**
	 * Invoked in java class CreateUser Returns true if a user with the given email
	 * address does already exist in the database
	 * 
	 * @param email
	 *            - contains the email of a new user that is compared with the
	 *            entries in the database
	 * 
	 * @return returnValue - contains true when user already exists and false when
	 *         not
	 * 
	 * @throws SQLException
	 *             - returns a database access error
	 */
	protected boolean userExists(String email) throws SQLException {
		Connection conn = dataSource.getConnection();
		PreparedStatement ps = null;
		ResultSet rs = null;
		boolean returnValue = false;
		try {
			ps = conn.prepareStatement(userExistsQuery);

			ps.setString(1, email);

			// Execute query
			rs = ps.executeQuery();
			// System.out.println("executed the following statement on DB: " +
			// userExistsQuery);

			while (rs.next()) {
				int returning = rs.getInt(1);
				returnValue = returning > 0;
			}
		} finally {
			JdbcUtils.closeStatement(ps);
			conn.close();
		}
		return returnValue;
	}

	/**
	 * Invoked in java class CreateUser creates a new entry in the user table and a
	 * corresponding one in the user_progress table
	 * 
	 * @param email
	 *            - contains the email address of an user that is registering
	 * @param lastname
	 *            - contains the last name of an user that is registering
	 * @param firstname
	 *            - contains the first name of an user that is registering
	 * @param password
	 *            - contains the encrypted password of an user that is registering
	 * @param role
	 *            - contains the role of an user (admin, professor, student)
	 * @param group
	 *            - contains the groupnumber of a student that is registering to a
	 *            certain group
	 * @param gender
	 *            - contains the gender of an user that is registering
	 * 
	 * @throws SQLException
	 *             - returns a database access error
	 */
	protected void createNewUser(String email, String lastname, String firstname, String password, String role,
			String group, int gender) throws SQLException {
		Connection conn = dataSource.getConnection();
		PreparedStatement ps = null;
		PreparedStatement ps2 = null;
		PreparedStatement ps3 = null;
		try {
			ps = conn.prepareStatement(newUserQuery);
			ps.setString(1, email);
			ps.setString(2, lastname);
			ps.setString(3, firstname);
			ps.setString(4, password);
			ps.setString(5, role);
			ps.setString(6, group);
			ps.setInt(7, gender);
			ps.executeUpdate();
//			System.out.println("executed the following statement on DB: " + newUserQuery);
			if (role == "student") {
				ps2 = conn.prepareStatement(getUserByEmail);
				ps2.setString(1, email);
				ResultSet rs = ps2.executeQuery();
				int user_id = 0;
				while (rs.next()) {
					user_id = rs.getInt(1);
				}
				// System.out.println("executed the following statement on DB: "
				// + getUserByEmail);
				ps3 = conn.prepareStatement(newProgressQuery);
				ps3.setInt(1, user_id);
				ps3.executeUpdate();
				// System.out.println("executed the following statement on DB: "
				// + newProgressQuery);
			}
		} finally {
			JdbcUtils.closeStatement(ps);
			conn.close();
		}
	}

	/**
	 * Invoked in java class ConfirmRegistration Updates the unverified Email
	 * (second parameter, currently existing email in database table user) with the
	 * email the first parameter of the function
	 * 
	 * @param email
	 *            - contains the email that the user accessed the link trough
	 * @param unverifiedEmail
	 *            - contains the email that is saved to the database
	 * 
	 * @throws SQLException
	 *             - returns a database access error
	 */
	protected void updateEmail(String email, String unverifiedEmail) throws SQLException {
		Connection conn = dataSource.getConnection();
		PreparedStatement ps = null;
		try {
			ps = conn.prepareStatement(updateEmailQuery);
			ps.setString(1, email);
			ps.setString(2, unverifiedEmail);
			ps.executeUpdate();
			// System.out.println("executed the following statement on DB: " +
			// updateEmailQuery);
		} finally {
			JdbcUtils.closeStatement(ps);
			conn.close();
		}
	}

	/**
	 * Invoked in java class PasswortReset function to update the password of a user
	 * requires the user's email address and the new password
	 * 
	 * @param email
	 *            - contains the field value when a user is logging in
	 * @param password
	 *            - contains the field value entered in the password field
	 * 
	 * @throws SQLException
	 *             - returns a database access error
	 */
	protected void updatePassword(String email, String password) throws SQLException {
		Connection conn = dataSource.getConnection();
		PreparedStatement ps = null;
		try {
			ps = conn.prepareStatement(updatePasswordQuery);
			ps.setString(1, password);
			ps.setString(2, email);
			ps.executeUpdate();
			// System.out.println("executed the following statement on DB: " +
			// updatePasswordQuery);
		} finally {
			JdbcUtils.closeStatement(ps);
			conn.close();
		}
	}

	/**
	 * 
	 * function to update the progress of a user required input parameter: userid,
	 * costs, quality, time, path
	 * 
	 * @param userid
	 *            - contains the email address of an user
	 * @param costs
	 *            - contains the user progress in costs
	 * @param quality
	 *            - contains the user progress in quality
	 * @param time
	 *            - contains the user progress in time
	 * @param path
	 *            - contains the knot of the XML tree where the user is playing
	 * 
	 * @throws SQLException
	 *             - returns a database access error
	 */
	public void setUserProgress(String userid, int costs, int quality, int time, String path) throws SQLException {
		// TODO rename with correct parameter name according to database scheme #402
		Connection conn = dataSource.getConnection();
		PreparedStatement ps = null;
		try {
			if (costs > 100) {
				costs = 100;
			} else if (costs < 0) {
				costs = 0;
			}
			if (quality > 100) {
				quality = 100;
			} else if (quality < 0) {
				quality = 0;
			}
			if (time > 100) {
				time = 100;
			} else if (time < 0) {
				time = 0;
			}

			ps = conn.prepareStatement(setProgressQuery);
			ps.setInt(1, costs);
			ps.setInt(2, quality);
			ps.setInt(3, time);
			ps.setString(4, path);
			ps.setString(5, userid);
			ps.executeUpdate();
			// System.out.println("executed the following statement on DB: " +
			// setProgressQuery);
		} finally {
			JdbcUtils.closeStatement(ps);
			conn.close();
		}
	}

	/*
	 * Philipp K. 3.3.16 New function to set the User progress without KPIs
	 */
	public void setUserProgressWithoutKPI(String userid, String path) throws SQLException {
		// TODO rename with correct parameter name according to database scheme #402
		Connection conn = dataSource.getConnection();
		PreparedStatement ps = null;
		try {
			ps = conn.prepareStatement(setProgressQueryWithoutKPI);
			ps.setString(1, path);
			ps.setString(2, userid);
			ps.executeUpdate();
			// System.out.println("executed the following statement on DB: " +
			// setProgressQuery);
		} finally {
			JdbcUtils.closeStatement(ps);
			conn.close();
		}
	}

	public void setUserCountry(String userId, String gamepath) throws SQLException {
		Connection conn = dataSource.getConnection();
		PreparedStatement ps = null;
		String[] levels = new String[gamepath.split(";").length];
		levels = gamepath.split(";");
		Pattern p = Pattern.compile("l[1-7]9{2}e9{3}");
		for (String level : levels) {
			if (p.matcher(level).matches()) {
				ps = conn.prepareStatement(setCountryTrueQuery.replace("%%", "`" + level.substring(0, 2) + "`"));
				ps.setString(1, userId);
				ps.executeUpdate();
			}
		}

		JdbcUtils.closeStatement(ps);
		conn.close();
	}

	public void resetUserCountry(String userid) throws SQLException {
		Connection conn = dataSource.getConnection();
		PreparedStatement ps = null;
		ps = conn.prepareStatement(resetCountriesQuery);
		ps.setString(1, userid);
		ps.executeUpdate();
		JdbcUtils.closeStatement(ps);
		conn.close();
	}

	/**
	 * Function to set the lvlId of a certain User. Requires the User ID and the
	 * Unique Level ID (Format: lxxxexxx)
	 * 
	 * @author Philipp E.
	 * @param userId
	 *            - User ID of the affected User
	 * @param lvlId
	 *            - Unique Level ID (Format: lxxxexxx)
	 * @throws SQLException
	 *             - returns a database access error
	 */

	public void setLvlId(String userId, String lvlId) throws SQLException {
		Connection conn = dataSource.getConnection();
		PreparedStatement ps = null;
		try {
			ps = conn.prepareStatement(setLvlIdQuery);
			ps.setString(1, lvlId);
			ps.setString(2, userId);
			ps.executeUpdate();
			// System.out.println("executed the following statement on DB: " +
			// setProgressQuery);
		} finally {
			JdbcUtils.closeStatement(ps);
			conn.close();
		}
	}

	/**
	 * Invoked in java class DeleteUser function to delete a user by handing his
	 * email to the function
	 * 
	 * @param email
	 *            - contains the email address of a user
	 * 
	 * @throws SQLException
	 *             - returns a database access error
	 */
	public void deleteUser(String email) throws SQLException {
		Connection conn = dataSource.getConnection();
		PreparedStatement ps = null;
		try {
			ps = conn.prepareStatement(deleteUserQuery);
			ps.setString(1, email);

			// Execute query
			ps.executeUpdate();
			// System.out.println("executed the following statement on DB: " +
			// deleteUserQuery);
		} finally {
			JdbcUtils.closeStatement(ps);
			conn.close();
		}
	}

	/**
	 * function to delete a group by handing its group id to the function
	 * 
	 * @param group_id
	 *            - contains the group id of a certain group
	 * 
	 * @throws SQLException
	 *             - returns a database access error
	 */
	public void deleteGroup(String group_id) throws SQLException {
		Connection conn = dataSource.getConnection();
		PreparedStatement ps = null;
		try {
			ps = conn.prepareStatement(deleteGroupQuery);
			ps.setInt(1, Integer.parseInt(group_id));

			// Execute query
			ps.executeUpdate();
			// System.out.println("executed the following statement on DB: " +
			// deleteGroupQuery);
		} finally {
			JdbcUtils.closeStatement(ps);
			conn.close();
		}
	}

	/**
	 * function to delete a group with its belonging members by handing its group id
	 * to the function
	 * 
	 * @param group_id
	 *            - contains the group id of a certain group
	 * 
	 * @throws SQLException
	 *             - returns a database access error
	 */
	public void deleteGroupMembers(String group_id) throws SQLException {
		Connection conn = dataSource.getConnection();
		PreparedStatement ps = null;
		try {
			ps = conn.prepareStatement(deleteGroupMembersQuery);
			ps.setInt(1, Integer.parseInt(group_id));
			ps.executeUpdate();
		} finally {
			JdbcUtils.closeStatement(ps);
			conn.close();
		}
	}

	/**
	 * Invoked in java class DeleteProfessor function to delete a professor by
	 * handing his email to the function
	 * 
	 * @param email
	 *            - email address of the professor that should be deleted
	 * 
	 * @throws SQLException
	 *             - returns a database access error
	 */
	public void deleteProfessor(String email) throws SQLException {
		Connection conn = dataSource.getConnection();
		PreparedStatement ps = null;
		try {
			ps = conn.prepareStatement(deleteProfessorQuery);
			ps.setString(1, email);

			// Execute query
			ps.executeUpdate();
			// System.out.println("executed the following statement on DB: " +
			// deleteProfessorQuery);
		} finally {
			JdbcUtils.closeStatement(ps);
			conn.close();
		}
	}

	/**
	 * Invoked in java class StudentMain returns the user id for the user that is
	 * defined by the email address handed to the function
	 * 
	 * @param email
	 *            - contains the email address of a student that is saved to field
	 *            "username"
	 * 
	 * @return the user id for the specified email read from the database
	 * 
	 * @throws SQLException
	 *             - returns a database access error
	 */
	public String getUserByEmail(String email) throws SQLException {

		Connection conn = dataSource.getConnection();
		PreparedStatement ps = null;
		ResultSet rs = null;
		String userid = "";
		try {
			ps = conn.prepareStatement(getUserByEmail);
			ps.setString(1, email);
			rs = ps.executeQuery();
			while (rs.next()) {
				userid += rs.getString(1);
			}
			// System.out.println("executed the following statement on DB: " +
			// getUserByEmail);
			// System.out.println("the userid was "+userid);
		} finally {
			JdbcUtils.closeStatement(ps);
			conn.close();
		}
		return userid;
	}

	/**
	 * Philipp K. 5.3.16 Returns the user email for the user that is defined by the
	 * Id handed to the function
	 * 
	 * @param userId
	 *            the userId of a student that was saved to the database
	 * 
	 * @return the email for the specified userId read from the database
	 * 
	 * @throws SQLException
	 *             - returns a database access error
	 */

	public String getUserEmailByID(String userId) throws SQLException {

		Connection conn = dataSource.getConnection();
		PreparedStatement ps = null;
		ResultSet rs = null;
		String email = "";
		try {
			ps = conn.prepareStatement(getUserEmailByID);
			ps.setString(1, userId);
			rs = ps.executeQuery();
			while (rs.next()) {
				email += rs.getString(1);
			}

			// System.out.println("executed the following statement on DB: " +
			// getUserByEmail);
			// System.out.println("the userid was "+userid);
		} finally {
			JdbcUtils.closeStatement(ps);
			conn.close();
		}
		return email;
	}

	/**
	 * Returns the gender for the user that is defined by the Id handed to the
	 * function
	 * 
	 * @param userId
	 *            the userId of a student that was saved to the database
	 * 
	 * @return the gender for the specified userId read from the database
	 * 
	 * @throws SQLException
	 *             - returns a database access error
	 */

	public int getUserGenderByID(String userId) throws SQLException {

		Connection conn = dataSource.getConnection();
		PreparedStatement ps = null;
		ResultSet rs = null;
		String gender = "";
		try {
			ps = conn.prepareStatement(getUserGenderByID);
			ps.setString(1, userId);
			rs = ps.executeQuery();
			while (rs.next()) {
				gender += rs.getString(1);
			}
			// System.out.println("executed the following statement on DB: " +
			// getUserByEmail);
			// System.out.println("the userid was "+userid);
		} finally {
			JdbcUtils.closeStatement(ps);
			conn.close();
		}
		int genderint = Integer.parseInt(gender);
		return genderint;
	}

	/**
	 * Returns the group for the user that is defined by the Id handed to the
	 * function
	 * 
	 * @param userId
	 *            the userId of a student that was saved to the database
	 * 
	 * @return the groupId for the specified userId read from the database
	 * 
	 * @throws SQLException
	 *             - returns a database access error
	 */

	public String getUserGroupByID(String userId) throws SQLException {

		Connection conn = dataSource.getConnection();
		PreparedStatement ps = null;
		ResultSet rs = null;
		String group = "";
		try {
			ps = conn.prepareStatement(getUserGroupByID);
			ps.setString(1, userId);
			rs = ps.executeQuery();
			while (rs.next()) {
				group += rs.getString(1);
			}
			// System.out.println("executed the following statement on DB: " +
			// getUserByEmail);
			// System.out.println("the userid was "+userid);
		} finally {
			JdbcUtils.closeStatement(ps);
			conn.close();
		}
		return group;
	}

	/**
	 * Returns the group for the user that is defined by the Email handed to the
	 * function
	 * 
	 * @param userId
	 *            the userId of a student that was saved to the database
	 * 
	 * @return the groupId for the specified userId read from the database
	 * 
	 * @throws SQLException
	 *             - returns a database access error
	 */

		public String getUserGroupByEmail(String email) throws SQLException {

		Connection conn = dataSource.getConnection();
		PreparedStatement ps = null;
		ResultSet rs = null;
		String group = "";
		try {
			ps = conn.prepareStatement(getUserGroupByEmail);
			ps.setString(1, email);
			rs = ps.executeQuery();
			while (rs.next()) {
				group += rs.getString(1);
			}
			System.out.println("executed the following statement on DB: " + getUserByEmail);
			System.out.println("the userid was "+ group);
		} finally {
			JdbcUtils.closeStatement(ps);
			conn.close();
		}
		return group;
	}

	/**
	 * 
	 * Returns an ArrayList containing the User Progress for the user with the ID
	 * that was handed to the function The following entries can be fount in the
	 * arraylist: 0:last_name, 1:first_name, 2:gender, 3:cost, 4:quality, 5:time,
	 * 6:path
	 * 
	 * @param userId
	 *            the userId of a student that was saved to the database
	 * 
	 * @return array representing the progress of the specified user read from the
	 *         database
	 * 
	 * @throws SQLException
	 *             - returns database access error
	 */
	public ArrayList<Object> getUserProgress(String userId) throws SQLException {
		Connection conn = dataSource.getConnection();
		PreparedStatement ps = null;
		ResultSet rs = null;
		ArrayList<Object> progress = new ArrayList<Object>();
		try {
			ps = conn.prepareStatement(getProgressQuery);
			ps.setString(1, userId);
			rs = ps.executeQuery();

			while (rs.next()) {

				progress.add(rs.getString(1));
				progress.add(rs.getString(2));
				progress.add(rs.getString(3));
				progress.add(rs.getInt(4));
				progress.add(rs.getInt(5));
				progress.add(rs.getInt(6));
				if (rs.getString(7) != null) {
					progress.add(rs.getString(7));
				} else {
					progress.add("");

				}
			}
			// System.out.println("executed the following statement on DB: " +
			// getProgressQuery);
		} finally {
			JdbcUtils.closeStatement(ps);
			conn.close();
		}
		return progress;
	}

	/**
	 * Reads the countries that have been visisted form the database and returns an
	 * {@link ArrayList<String>} with the codes of the contries that have been
	 * visited, e.g. l1, l2, l5, l7.
	 * 
	 * @param userid
	 *            The user for which to read the visited countries
	 * @return An {@link Arraylist<String>} with the countries that have been
	 *         visited by the specified user.
	 * @throws SQLException
	 */
	public ArrayList<String> getVisitedCountries(String userid) throws SQLException {
		ArrayList<String> visitedCountries = new ArrayList<String>();
		Connection conn = null;
		PreparedStatement ps = null;
		try {
			conn = dataSource.getConnection();
			ps = conn.prepareStatement(GET_VISITED_COUNTRIES_QUERY);
			ps.setString(1, userid);
			ResultSet rs = ps.executeQuery();
			while (rs.next()) {
				for (int l = 1; l < 8; l++) {
					if (rs.getBoolean(l))
						visitedCountries.add("l" + l);
				}
			}
		} finally {
			JdbcUtils.closeStatement(ps);
			JdbcUtils.closeConnection(conn);
		}
		return visitedCountries;
	}

	/**
	 * Invoked in java class ResetUserProgress sets the User Progress to the hard
	 * coded starting values of 0/0/0 for time/quality/cost and overwrites the
	 * existing with the defined entry node l000e000
	 * 
	 * @param userEmail
	 *            the user�s email
	 * 
	 * 
	 * @throws SQLException
	 *             - returns a database access error
	 */
	/*
	 * Philipp K. 29.2.16 Update so user start with 0,0,0 progress after reset
	 */
	public void resetUserProgress(String userEmail) throws SQLException {

		String userid = getUserByEmail(userEmail);
		setUserProgress(userid, 0, 0, 0, "l000e000");
		resetUserCountry(userid);

	}
	/* end */

	/**
	 * 
	 * gets the User Progress and checks whether the path ends with the ending node
	 * 
	 * @param userEmail
	 *            - contains the email address of an user
	 * 
	 * @throws SQLException
	 *             - returns a database access error
	 * 
	 * @return true or false
	 */
	public boolean isUserFinished(String userEmail) throws SQLException {
		// get the current path entry saved to the DB
		String userid = getUserByEmail(userEmail);
		// System.out.println(userid);
		String path = getUserProgress(userid).get(6).toString();

		// get the saved position from this path
		String[] pathElements = path.split(";");
		String position = pathElements[pathElements.length - 1];
		// System.out.println("Last postition of the student: " + position);
		// check whether this position equals the ending node
		if (position.equals("l999e999")) {
			return true;
		} else {
			return false;
		}
	}
}
