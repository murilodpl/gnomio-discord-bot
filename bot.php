<?php

use Discord\Discord;
use Discord\Parts\Channel\Message;
use Psr\Http\Message\ResponseInterface;
use React\EventLoop\Factory;
use React\Http\Browser;

require __DIR__ . '/vendor/autoload.php';

$loop = Factory::create();

$browser = new Browser($loop);

$discord = new Discord([
    'token' => 'MTAyNDExMDM1NDM3NDA4MjU5MQ.GHg4K6.XPe8bEEzUf9cM0TCkO0-e-ZZplbb64KaJehq1A',
    'loop' => $loop,
]);

$discord->on('message', function (Message $message, Discord $discord) use ($browser) {
    if (strtolower($message->content) == ';joke') {
        $browser->get('https://v2.jokeapi.dev/joke/Any')->then(function (ResponseInterface $response) use ($message) {
            $bodyData = json_decode($response->getBody());

            if ($bodyData->type == 'twopart') { 
                $setupJoke = $bodyData->setup;
                $deliveryJoke = $bodyData->delivery;

                $message->reply($setupJoke . PHP_EOL . $deliveryJoke);
            } elseif ($bodyData->type == 'single') {
                $joke = $bodyData->joke;
                $message->reply($joke);
            }
        });
    }
});

$discord->run();
