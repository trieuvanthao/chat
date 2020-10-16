<?php

use Illuminate\Database\Seeder;

class FriendSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $friend = new \App\Friend();
        $friend->user_id = 1;
        $friend->friend_id = 2;
        $friend->save();

        $friend1 = new \App\Friend();
        $friend1->user_id = 2;
        $friend->friend_id = 1;
        $friend1->save();
    }
}
