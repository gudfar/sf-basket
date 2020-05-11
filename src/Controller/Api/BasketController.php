<?php

namespace App\Controller\Api;

use App\Entity\BasketItem;
use App\Entity\Book;
use FOS\RestBundle\Controller\AbstractFOSRestController;
use FOS\RestBundle\Controller\Annotations as Rest;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpKernel\Exception\NotFoundHttpException;

/**
 * Class BasketController
 * @package App\Controller\Api
 */
class BasketController extends AbstractFOSRestController
{
    /**
     * @Rest\Post("/api/basket", name="api_basket")
     * @Rest\RequestParam(name="id", requirements="\d+", description="Book Id")
     * @param int $id
     * @return Response|NotFoundHttpException
     */
    public function saveAction(int $id)
    {
        /** @var Book $book */
        $book = $this->getDoctrine()
            ->getRepository(Book::class)
            ->find($id);

        if (!$book) {
            return $this->createNotFoundException();
        }

        $em = $this->getDoctrine()->getManager();

        $basketItem = new BasketItem();
        $basketItem->setBook($book);
        $basketItem->setQuantity(1);

        $em->persist($basketItem);
        $em->flush();

        return $this->handleView($this->view(['status' => 'ok'], Response::HTTP_CREATED));
    }

}
