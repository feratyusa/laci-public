<?php

namespace App\Console\Commands;

use App\Models\User;
use Illuminate\Console\Command;
use Illuminate\Support\Facades\Hash;

class AddUser extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'add:user';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Add random user';

    /**
     * Execute the console command.
     */
    public function handle()
    {
        $username = $this->ask('What is your username?');
        
        $user = User::where('username', $username)->first();
        if($user != null){
            $this->error('User with that username already exist');
            return;
        }

        $password = $this->secret('What is your password?');

        User::factory()->create([
            'username' => $username,
            'password' => Hash::make($password),
        ]);

        $this->info("User created with {$username}");
    }
}
