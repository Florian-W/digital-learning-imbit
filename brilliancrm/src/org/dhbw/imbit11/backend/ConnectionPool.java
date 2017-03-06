package org.dhbw.imbit11.backend;

import java.sql.*;
import javax.sql.DataSource;
import javax.naming.InitialContext;

/*
 * needed for shiro
 * 
 */

/**
 * Looks up the DataSource (see configuration in context.xml)
 * and uses that DataSource to get a database connection
 * from the connection pool
 * @author unknown
 *
 */
public class ConnectionPool
{
    private static ConnectionPool pool = null;
    private static DataSource dataSource = null;
 
    /**
     * Constructor for ConnectionPool class
     * @author YiMin
     */
    private ConnectionPool()
    {
        try
        {
        	// Create object ic of class InitialContext
            InitialContext ic = new InitialContext();
            // Look up data or objects for a given path
            // the returned value is casted into data type DataSource
            dataSource = (DataSource) ic.lookup("java:/comp/env/jdbc/security");
        }
        catch(Exception e)
        {
            e.printStackTrace();
        }
    }

    // Try to get an instance of ConnectionPool and if there is alreay a pool return it
    // if not call the constructor of this class to create a new one
    public static ConnectionPool getInstance()
    {
        if (pool == null)
        {
            pool = new ConnectionPool();
        }
        return pool;
    }

    public Connection getConnection()
    {
        try
        {
            return dataSource.getConnection();
        }
        catch (SQLException sqle)
        {
            sqle.printStackTrace();
            return null;
        }
    }
    
    // Close connection if not needed anymore. Has to be called explicitly
    public void freeConnection(Connection c)
    {
        try
        {
            c.close();
        }
        catch (SQLException sqle)
        {
            sqle.printStackTrace();
        }
    }
}