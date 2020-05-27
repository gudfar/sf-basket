<?php

namespace App\Controller\Api;

use FOS\RestBundle\Controller\AbstractFOSRestController;
use Lexik\Bundle\JWTAuthenticationBundle\Services\JWTTokenManagerInterface;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Security\Core\User\UserInterface;
use FOS\RestBundle\Controller\Annotations as Rest;


/**
 * Class AuthController
 * @package App\Controller\Api
 */
class AuthController extends AbstractFOSRestController
{

    /**
     * @Rest\Post("/api/login_check", name="api_login_check")
     * @param UserInterface $user
     * @param JWTTokenManagerInterface $jwtTokenManager
     * @return Response
     */
    public function getTokenUser(UserInterface $user, JWTTokenManagerInterface $jwtTokenManager)
    {
        return $this->handleView($this->view(['token' => $jwtTokenManager->create($user)], Response::HTTP_OK));
    }

}
