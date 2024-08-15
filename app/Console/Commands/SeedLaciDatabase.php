<?php

namespace App\Console\Commands;

use Database\Seeders\CategorySeeder;
use Database\Seeders\DatabaseSeeder;
use Database\Seeders\MandatoryFileCategorySeeder;
use Illuminate\Console\Command;

class SeedLaciDatabase extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'refresh:local';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Seed LACI Database with dummy data';

    /**
     * Execute the console command.
     */
    public function handle()
    {
        $this->call('db:wipe');
        $this->call('migrate');
        $this->call('db:seed');
        $this->call('db:seed', ['--class' => 'CategorySeeder'] );
        $this->call('db:seed', ['--class' => 'MandatoryFileCategorySeeder']);
    }
}
