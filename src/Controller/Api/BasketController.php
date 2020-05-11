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
     * @Rest\Post("/api/basket", name="api_basket_save")
     * @Rest\RequestParam(name="id", requirements="\d+", description="Book Id")
     * @Rest\RequestParam(name="userId", requirements="\d+", description="User Id")
     * @param int $id
     * @param int $userId
     * @Rest\View(serializerGroups={"basket_item"})
     * @return BasketItem|Response
     */
    public function saveAction(int $id, int $userId)
    {
        $em = $this->getDoctrine()->getManager();
        /** @var Book $book */
        $book = $this->getDoctrine()
            ->getRepository(Book::class)
            ->find($id);
        /** @var BasketItem $basketItem */
        $basketItem = $this->getDoctrine()
            ->getRepository(BasketItem::class)
            ->findOneBy(['book' => $id, 'user' => $userId]);

        $basketItem = $basketItem ? $basketItem : new BasketItem();

        if (!$book) {
            return $this->handleView($this->view(['status' => 'Book is not found!'], Response::HTTP_NOT_FOUND));
        }

        $basketItem->setBook($book);
        $basketItem->setQuantity($basketItem->getQuantity() + 1);
        $basketItem->setUser($userId);

        $em->persist($basketItem);
        $em->flush();

        return $basketItem;
    }

}
