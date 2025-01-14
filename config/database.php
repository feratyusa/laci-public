<?php

use Illuminate\Support\Str;

return [

    /*
    |--------------------------------------------------------------------------
    | Default Database Connection Name
    |--------------------------------------------------------------------------
    |
    | Here you may specify which of the database connections below you wish
    | to use as your default connection for database operations. This is
    | the connection which will be utilized unless another connection
    | is explicitly specified when you execute a query / statement.
    |
    */

    'default' => env('DB_CONNECTION', 'sqlite'),

    /*
    |--------------------------------------------------------------------------
    | Database Connections
    |--------------------------------------------------------------------------
    |
    | Below are all of the database connections defined for your application.
    | An example configuration is provided for each database system which
    | is supported by Laravel. You're free to add / remove connections.
    |
    */

    'connections' => [

        'sqlite' => [
            'driver' => 'sqlite',
            'url' => env('DB_URL'),
            'database' => env('DB_DATABASE', database_path('database.sqlite')),
            'prefix' => '',
            'foreign_key_constraints' => env('DB_FOREIGN_KEYS', true),
        ],

        'prod' => [
            'driver' => 'mysql',
            'url' => env('PROD_URL'),
            'host' => env('PROD_HOST', '127.0.0.1'),
            'port' => env('PROD_PORT', '3306'),
            'database' => env('PROD_DATABASE', 'laravel'),
            'username' => env('PROD_USERNAME', 'root'),
            'password' => env('PROD_PASSWORD', ''),
            'unix_socket' => env('PROD_SOCKET', ''),
            'charset' => env('PROD_CHARSET', 'utf8mb4'),
            'collation' => env('PROD_COLLATION', 'utf8mb4_unicode_ci'),
            'prefix' => '',
            'prefix_indexes' => true,
            'strict' => true,
            'engine' => null,
            'options' => extension_loaded('pdo_mysql') ? array_filter([
                PDO::MYSQL_ATTR_SSL_CA => env('MYSQL_ATTR_SSL_CA'),
            ]) : [],
        ],

        'dev' => [
            'driver' => 'mysql',
            'url' => env('DEV_URL'),
            'host' => env('DEV_HOST', '127.0.0.1'),
            'port' => env('DEV_PORT', '3306'),
            'database' => env('DEV_DATABASE', 'laravel'),
            'username' => env('DEV_USERNAME', 'root'),
            'password' => env('DEV_PASSWORD', ''),
            'unix_socket' => env('DEV_SOCKET', ''),
            'charset' => env('DEV_CHARSET', 'utf8mb4'),
            'collation' => env('DEV_COLLATION', 'utf8mb4_unicode_ci'),
            'prefix' => '',
            'prefix_indexes' => true,
            'strict' => true,
            'engine' => null,
            'options' => extension_loaded('pdo_mysql') ? array_filter([
                PDO::MYSQL_ATTR_SSL_CA => env('MYSQL_ATTR_SSL_CA'),
            ]) : [],
        ],

        'test' => [
            'driver' => 'mysql',
            'url' => env('TEST_URL'),
            'host' => env('TEST_HOST', '127.0.0.1'),
            'port' => env('TEST_PORT', '3306'),
            'database' => env('TEST_DATABASE', 'laravel'),
            'username' => env('TEST_USERNAME', 'root'),
            'password' => env('TEST_PASSWORD', ''),
            'unix_socket' => env('TEST_SOCKET', ''),
            'charset' => env('TEST_CHARSET', 'utf8mb4'),
            'collation' => env('TEST_COLLATION', 'utf8mb4_unicode_ci'),
            'prefix' => '',
            'prefix_indexes' => true,
            'strict' => true,
            'engine' => null,
            'options' => extension_loaded('pdo_mysql') ? array_filter([
                PDO::MYSQL_ATTR_SSL_CA => env('MYSQL_ATTR_SSL_CA'),
            ]) : [],
        ],

        'mariadb' => [
            'driver' => 'mariadb',
            'url' => env('DB_URL'),
            'host' => env('DB_HOST', '127.0.0.1'),
            'port' => env('DB_PORT', '3306'),
            'database' => env('DB_DATABASE', 'laravel'),
            'username' => env('DB_USERNAME', 'root'),
            'password' => env('DB_PASSWORD', ''),
            'unix_socket' => env('DB_SOCKET', ''),
            'charset' => env('DB_CHARSET', 'utf8mb4'),
            'collation' => env('DB_COLLATION', 'utf8mb4_unicode_ci'),
            'prefix' => '',
            'prefix_indexes' => true,
            'strict' => true,
            'engine' => null,
            'options' => extension_loaded('pdo_mysql') ? array_filter([
                PDO::MYSQL_ATTR_SSL_CA => env('MYSQL_ATTR_SSL_CA'),
            ]) : [],
        ],

        'pgsql' => [
            'driver' => 'pgsql',
            'url' => env('DB_URL'),
            'host' => env('DB_HOST', '127.0.0.1'),
            'port' => env('DB_PORT', '5432'),
            'database' => env('DB_DATABASE', 'laravel'),
            'username' => env('DB_USERNAME', 'root'),
            'password' => env('DB_PASSWORD', ''),
            'charset' => env('DB_CHARSET', 'utf8'),
            'prefix' => '',
            'prefix_indexes' => true,
            'search_path' => 'public',
            'sslmode' => 'prefer',
        ],

        'ehc' => [
            'driver' => 'sqlsrv',
            'url' => env('EHC_URL'),
            'host' => env('EHC_HOST', 'localhost'),
            'port' => env('EHC_PORT', '1433'),
            'database' => env('EHC_DATABASE', 'laravel'),
            'username' => env('EHC_USERNAME', 'root'),
            'password' => env('EHC_PASSWORD', ''),
            'charset' => env('EHC_CHARSET', 'utf8'),
            'prefix' => '',
            'prefix_indexes' => true,
            // 'encrypt' => env('DB_ENCRYPT', 'yes'),
            // 'trust_server_certificate' => env('DB_TRUST_SERVER_CERTIFICATE', 'false'),
        ],

        'ehc_write' => [
            'driver' => env('sqls', 'sqlite'),
            'url' => env('EHC_WRITE_URL'),
            'host' => env('EHC_WRITE_HOST', 'localhost'),
            'port' => env('EHC_WRITE_PORT', '1433'),
            'database' => env('EHC_WRITE_DATABASE', 'laravel'),
            'username' => env('EHC_WRITE_USERNAME', 'root'),
            'password' => env('EHC_WRITE_PASSWORD', ''),
            'charset' => env('EHC_WRITE_CHARSET', 'utf8'),
            'prefix' => '',
            'prefix_indexes' => true,
            // 'encrypt' => env('DB_ENCRYPT', 'yes'),
            // 'trust_server_certificate' => env('DB_TRUST_SERVER_CERTIFICATE', 'false'),
        ],

        'local_ehc' => [
            'driver' => 'sqlsrv',
            'url' => '',
            'host' => 'localhost',
            'port' => '1433',
            'database' => 'laci_ehc',
            'username' => 'apps',
            'password' => 'secret',
            'charset' => 'utf8',
            'prefix' => '',
            'prefix_indexes' => true,
            'encrypt' => 'yes',
            'trust_server_certificate' => 'true',
        ],

    ],

    /*
    |--------------------------------------------------------------------------
    | Migration Repository Table
    |--------------------------------------------------------------------------
    |
    | This table keeps track of all the migrations that have already run for
    | your application. Using this information, we can determine which of
    | the migrations on disk haven't actually been run on the database.
    |
    */

    'migrations' => [
        'table' => 'migrations',
        'update_date_on_publish' => true,
    ],

    /*
    |--------------------------------------------------------------------------
    | Redis Databases
    |--------------------------------------------------------------------------
    |
    | Redis is an open source, fast, and advanced key-value store that also
    | provides a richer body of commands than a typical key-value system
    | such as Memcached. You may define your connection settings here.
    |
    */

    'redis' => [

        'client' => env('REDIS_CLIENT', 'phpredis'),

        'options' => [
            'cluster' => env('REDIS_CLUSTER', 'redis'),
            'prefix' => env('REDIS_PREFIX', Str::slug(env('APP_NAME', 'laravel'), '_').'_database_'),
        ],

        'default' => [
            'url' => env('REDIS_URL'),
            'host' => env('REDIS_HOST', '127.0.0.1'),
            'username' => env('REDIS_USERNAME'),
            'password' => env('REDIS_PASSWORD'),
            'port' => env('REDIS_PORT', '6379'),
            'database' => env('REDIS_DB', '0'),
        ],

        'cache' => [
            'url' => env('REDIS_URL'),
            'host' => env('REDIS_HOST', '127.0.0.1'),
            'username' => env('REDIS_USERNAME'),
            'password' => env('REDIS_PASSWORD'),
            'port' => env('REDIS_PORT', '6379'),
            'database' => env('REDIS_CACHE_DB', '1'),
        ],

    ],

];
