<?php
/**
 * The base configuration for WordPress
 *
 * The wp-config.php creation script uses this file during the
 * installation. You don't have to use the web site, you can
 * copy this file to "wp-config.php" and fill in the values.
 *
 * This file contains the following configurations:
 *
 * * MySQL settings
 * * Secret keys
 * * Database table prefix
 * * ABSPATH
 *
 * @link https://codex.wordpress.org/Editing_wp-config.php
 *
 * @package WordPress
 */

// ** MySQL settings ** //
/** The name of the database for WordPress */
define( 'DB_NAME', 'qurankar_db2' );

/** MySQL database username */
define( 'DB_USER', 'qurankar_db2' );

/** MySQL database password */
define( 'DB_PASSWORD', 'BDAF56Cno2k9uq7m4s0rh1f8' );

/** MySQL hostname */
define( 'DB_HOST', 'localhost' );

/** Database Charset to use in creating database tables. */
define( 'DB_CHARSET', 'utf8' );

/** The Database Collate type. Don't change this if in doubt. */
define( 'DB_COLLATE', '' );

/**
 * Authentication Unique Keys and Salts.
 *
 * Change these to different unique phrases!
 * You can generate these using the {@link https://api.wordpress.org/secret-key/1.1/salt/ WordPress.org secret-key service}
 * You can change these at any point in time to invalidate all existing cookies. This will force all users to have to log in again.
 *
 * @since 2.6.0
 */
define( 'AUTH_KEY',          '@ Zj4lUMQ>9VAq`r?oH#SJjl{e-C}>!C2-OG E O3ivZ>2IvcKMs$G{cCm]kC6qw' );
define( 'SECURE_AUTH_KEY',   '$x*xS4{1tM{=M7b+wz*%QBRX8 -Y4CD`Z] fU/;0L5+gFWCJy:2cxpxdA;z7V9E@' );
define( 'LOGGED_IN_KEY',     'fg/}>f p[_wjJx[%0_T8aba,vmDrB3bN=g%61w;oWj`3$CR1wMktu`0?Sk+;o=e3' );
define( 'NONCE_KEY',         'LrtaVNo(Hf$!x7:im);h%a:M.7vMq<shfR~3(4c@qwYt*+FR,yE8K}YV!sv{cL+B' );
define( 'AUTH_SALT',         '?g},U`^aZRom:=h^Su`,r_ 2}C]wi]dX7j90XCL!dG`jclP:_6w|{G^^X`M@liUV' );
define( 'SECURE_AUTH_SALT',  '-|]/xRH/g>{AL@ET,mn<$^%qnz@r~||gf=b[mK3k4Jw,zT+^7I_S<1aZ-!63w y_' );
define( 'LOGGED_IN_SALT',    'd5W&U{yEC3v8URto`#]r!Gj=butU(_`$S<:FL;4xxI@<0ANs4y)I%cn=tem=DS x' );
define( 'NONCE_SALT',        'E1Z$$u_Np;iJ:L10}z!~*)ZSb?p7L~r,0D&KR(B]5$a+NM~2v0+>FvZ,Rzdc~@/%' );
define( 'WP_CACHE_KEY_SALT', 'nUrjX___h%As:]zHw0,:1}7Lh9Coi+aR/d_$ }2!%D6P]1<#pC4ZyI3}=QfX/7|.' );

/**
 * WordPress Database Table prefix.
 *
 * You can have multiple installations in one database if you give each
 * a unique prefix. Only numbers, letters, and underscores please!
 */
$table_prefix = 'db2_';



define( 'AUTOSAVE_INTERVAL',    300  );
define( 'WP_POST_REVISIONS',    5    );
define( 'EMPTY_TRASH_DAYS',     7    );
define( 'WP_AUTO_UPDATE_CORE',  true );
define( 'WP_CRON_LOCK_TIMEOUT', 120  );

/* That's all, stop editing! Happy blogging. */

/** Absolute path to the WordPress directory. */
if ( ! defined( 'ABSPATH' ) )
	define( 'ABSPATH', dirname( __FILE__ ) . '/' );

/** Sets up WordPress vars and included files. */
require_once ABSPATH . 'wp-settings.php';
