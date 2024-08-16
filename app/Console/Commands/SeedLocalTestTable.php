<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;

class SeedLocalTestTable extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'seed:local';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Seed employees and kursus table for development environment';

    /**
     * Execute the console command.
     */
    public function handle()
    {
        $this->call('db:seed', ['--class' => 'EmployeeSeeder']);
        $this->call('db:seed', ['--class' => 'KursusSeeder']);
    }
}
