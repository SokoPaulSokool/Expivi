#!/bin/sh

run_artisan()
{
    ARGS="$*"
    echo "$ docker-compose exec --user $(id -u) php 'php artisan $ARGS'"
    XPV_UID=$(id -u) docker-compose exec --user "$(id -u)" php php artisan "$ARGS"
}

run_composer()
{
    ARGS="$*"
    echo "$ docker-compose run --user $(id -u) composer '$ARGS'"
    XPV_UID=$(id -u) docker-compose run --user "$(id -u)" composer "$ARGS"
}

run_php()
{
    ARGS="$*"
    echo "$ docker-compose exec --user $(id -u) php 'php $ARGS'"
    XPV_UID=$(id -u) docker-compose exec --user "$(id -u)" php php "$ARGS"
}

# Check if arguments where given
if [ $# -eq 0 ]; then
    echo "Calling with no arguments is not supported."
    echo "Supported arguments are:"
    echo "\tartisan   \$ARGS    run any artisan command in the container"
    echo "\tcomposer  \$ARGS    run any composer command in the container"
    echo "\tphp       \$ARGS    run any php command in the php container"
    echo "\tstart     -        Starts the backend stack"
    echo "\trun-setup -        (Re)initialises composer dependencies and the database"
    return
fi

# Take the first argument as the command to execute and
# interpolate all following args as input to the command
CMD=$1;
shift;
ARGS="$*"

case "$CMD" in
    "artisan")
        run_artisan "$ARGS"
    ;;
    "composer")
        run_composer "$ARGS"
    ;;
    "php")
        run_php "$ARGS"
    ;;
    "start")
        XPV_UID=$(id -u) docker-compose up -d php
    ;;
    "run-setup")
        run_composer install
        run_artisan db:wipe
        run_artisan migrate
        run_artisan db:seed
    ;;
    *)
        echo "No '${CMD}' command defined."
    ;;
esac
