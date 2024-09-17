<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;

class LocalEHCDBSetup extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'local:ehc-setup';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Migrate employees and kursus table on development environment (SQLite)';

    /**
     * Execute the console command.
     */
    public function handle()
    {
        $this->call('migrate', ['--path' => '/database/migrations/ehc_table']);
    }
}
