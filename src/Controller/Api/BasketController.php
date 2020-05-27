<?php

namespace App\Controller\Api;

use App\Entity\BasketItem;
use App\Entity\Book;
use FOS\RestBundle\Controller\AbstractFOSRestController;
use FOS\RestBundle\Controller\Annotations as Rest;
use Symfony\Component\HttpFoundation\Response;
use Doctrine\Persistence\ObjectManager;

/**
 * Class BasketController
 * @package App\Controller\Api
 */
class BasketController extends AbstractFOSRestController
{
    /**
     *
     * @Rest\Get("/api/basket", name="api_basket_items")
     * @Rest\View()
     * @return object[]
     */
    public function getBasketItems()
    {
        /** @var Book $book */
        $basketItems = $this->getDoctrine()
            ->getRepository(BasketItem::class)
            ->findBy(['user' => $this->getUser()->getId()]);

        return $basketItems;
    }

    /**
     * @Rest\Post("/api/basket", name="api_basket_save")
     * @Rest\RequestParam(name="id", requirements="\d+", description="Book Id")
     * @param int $id
     * @Rest\View(serializerGroups={"basket_item"})
     * @return BasketItem|Response
     */
    public function saveAction(int $id)
    {
        $em = $this->getDoctrine()->getManager();
        /** @var Book $book */
        $book = $this->getDoctrine()
            ->getRepository(Book::class)
            ->find($id);
        /** @var BasketItem $basketItem */
        $basketItem = $this->getDoctrine()
            ->getRepository(BasketItem::class)
            ->findOneBy(['book' => $id, 'user' => $this->getUser()->getId()]);

        $basketItem = $basketItem ? $basketItem : new BasketItem();

        if (!$book) {
            return $this->handleView($this->view(['status' => 'Book is not found!'], Response::HTTP_NOT_FOUND));
        }

        $basketItem->setBook($book);
        $basketItem->setQuantity($basketItem->getQuantity() + 1);
        $basketItem->setUser($this->getUser());

        $em->persist($basketItem);
        $em->flush();

        return $basketItem;
    }


    /**
     * @Rest\Delete("/api/basket/{id}", name="api_basket_delete")
     * @param int $id
     * @return Response
     */
    public function deleteAction(int $id)
    {
        /** @var BasketItem $basketItem */
        $basketItem = $this->getDoctrine()
            ->getRepository(BasketItem::class)
            ->find($id);

        $em = $this->getDoctrine()->getManager();

        $em->remove($basketItem);
        $em->flush();

        return $this->handleView($this->view(['status' => 'ok'], Response::HTTP_OK));
    }

    /**
     * @param int $id
     * @param int $counterValue
     * @Rest\Patch("/api/basket/{id}", name="api_basket_update_count")
     * @Rest\RequestParam(name="counterValue", description="Counter value")
     * @Rest\View(serializerGroups={"basket_item"})
     * @return BasketItem|Response
     */
    public function updateBasketItemCount(int $id, int $counterValue)
    {
        /** @var BasketItem $basketItem */
        $basketItem = $this->getDoctrine()
            ->getRepository(BasketItem::class)
            ->find($id);

        if (!$basketItem) {
            return $this->handleView($this->view(['status' => 'BasketItem is not found!'], Response::HTTP_NOT_FOUND));
        }

        $em = $this->getDoctrine()->getManager();

        $basketItem->setQuantity($basketItem->getQuantity() + $counterValue);


        if ($basketItem->getQuantity() === 0) {
            $em->remove($basketItem);
            $em->flush();
            return $this->handleView($this->view(['id' => $id], Response::HTTP_OK));
        }

        $em->persist($basketItem);
        $em->flush();

        return $basketItem;
    }

}
