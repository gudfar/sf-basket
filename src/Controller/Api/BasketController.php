<?php

namespace App\Controller\Api;

use FOS\RestBundle\Controller\AbstractFOSRestController;
use FOS\RestBundle\Controller\Annotations as Rest;
use Symfony\Component\HttpFoundation\Request;

/**
 * Class BasketController
 * @package App\Controller\Api
 */
class BasketController extends AbstractFOSRestController
{
    /**
     * @Rest\Post("/api/basket", name="api_basket")
     * @Rest\View()
     */
    public function saveAction(Request $request)
    {
        $form = $this->createForm(AlbumType::class, new Album());

        $form->submit($request->request->all());

        if (false === $form->isValid()) {

            return $this->handleView(
                $this->view($form)
            );
        }

        $this->entityManager->persist($form->getData());
        $this->entityManager->flush();

        return $this->handleView(
            $this->view(
                [
                    'status' => 'ok',
                ],
                Response::HTTP_CREATED
            )
        );
    }

}
