# Sistem Administrasi Learning Center v1.0.0

## Prerequisite

- Laravel ^11
- React ^18
- NodeJS ^22

## Setup Local Database

```bash
php artisan local:ehc-setup
php artisan local:db-setup
```

This setup will seed local databse with dummy data.

If you want to migrate EHC Data to Local Database, first **delete all data** from local EHC table (do not delete the tables). Make sure you are in intra network, and then run below code:

```bash
php artisan local:ehc-migrate
```

## Run Development server

```bash
npm run dev # first terminal
php artisan serve # second separate terminal
```

## Build

```bash
npm run build
```
