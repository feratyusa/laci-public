<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;

class EHCSeeder extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'local:ehc-seeder';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Seed local EHC Table';

    /**
     * Execute the console command.
     */
    public function handle()
    {
        $this->call('db:seed', ['--class' => 'EmployeeSeeder']);
        $this->call('db:seed', ['--class' => 'KursusSeeder']);
        $this->call('db:seed', ['--class' => 'VendorSeeder']);
        $this->call('db:seed', ['--class' => 'DiklatSeeder']);
    }
}
