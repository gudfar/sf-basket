<?php

namespace App\Handlers;

/**
 * Class CircularReferenceHandler
 * @package App\Handlers
 */
class CircularReferenceHandler
{
    /**
     * @param $object
     * @return mixed
     */
    public function __invoke($object)
    {
        return $object->getId();
    }
}
