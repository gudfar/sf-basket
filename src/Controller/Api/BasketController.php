<?php

namespace App\Controller\Api;

use App\Entity\BasketItem;
use App\Entity\Book;
use FOS\RestBundle\Controller\AbstractFOSRestController;
use FOS\RestBundle\Controller\Annotations as Rest;
use Symfony\Component\HttpFoundation\Response;
use Swagger\Annotations as SWG;


/**
 * @SWG\Tag(name="Basket")
 * Class BasketController
 * @package App\Controller\Api
 */
class BasketController extends AbstractFOSRestController
{
    /**
     * @SWG\Parameter(name="Authorization", in="header", required=true, type="string", description="API-TOKEN {JWT_TOKEN}")
     * @SWG\Response(
     *    response=200,
     *    description="Returns array of basket items",
     *    @SWG\Schema(
     *        type="array",
     *        @SWG\Items(
     *            type="object",
     *            @SWG\Property(property="id", type="integer", example="1"),
     *            @SWG\Property(property="quantity", type="integer", example="2"),
     *            @SWG\Property(property="book", type="object",
     *                @SWG\Property(property="id", type="integer", example="4"),
     *                @SWG\Property(property="author", type="string", example="Michael T. Nygard"),
     *                @SWG\Property(property="imageUrl", type="string", example="https://images-na.ssl-images-amazon.com/images/I/414CRjLjwgL._SX403_BO1,204,203,200_.jpg"),
     *                @SWG\Property(property="price", type="integer", example="45"),
     *                @SWG\Property(property="title", type="string", example="Release It!"),
     *             )
     *         )
     *     )
     * )
     * @Rest\Get("/api/basket", name="api_basket_items")
     * @Rest\View(serializerGroups={"basket_item"})
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
     * @SWG\Parameter(name="Authorization", in="header", required=true, type="string", description="API-TOKEN {JWT_TOKEN}")
     * @SWG\Parameter(name="body", in="body", required=true, description="Book Id",
     *     @SWG\Schema(@SWG\Property(property="id", type="integer", example="22"))
     * )
     * @SWG\Response(
     *    response=200,
     *    description="Save basket item and return it",
     *    @SWG\Schema(type="object",
     *        @SWG\Property(property="id", type="integer", example="1"),
     *        @SWG\Property(property="quantity", type="integer", example="2"),
     *        @SWG\Property(property="book", type="object",
     *            @SWG\Property(property="id", type="integer", example="4"),
     *            @SWG\Property(property="author", type="string", example="Michael T. Nygard"),
     *            @SWG\Property(property="imageUrl", type="string", example="https://images-na.ssl-images-amazon.com/images/I/414CRjLjwgL._SX403_BO1,204,203,200_.jpg"),
     *            @SWG\Property(property="price", type="integer", example="45"),
     *            @SWG\Property(property="title", type="string", example="Release It!"),
     *        )
     *    )
     * )
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
     * @SWG\Parameter(name="Authorization", in="header", required=true, type="string", description="API-TOKEN {JWT_TOKEN}")
     * @SWG\Response(
     *    response=200,
     *    description="Delete basket Item",
     *    @SWG\Schema(type="object",
     *        @SWG\Property(property="status", type="string", example="ok"),
     *    )
     * )
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
     * @SWG\Parameter(name="Authorization", in="header", required=true, type="string", description="API-TOKEN {JWT_TOKEN}")
     * @SWG\Parameter(name="body", in="body", required=true, description="Count value. Can be (1, -1)",
     *     @SWG\Schema(@SWG\Property(property="counterValue", type="integer", example="1"))
     * )
     * @SWG\Response(
     *    response=200,
     *    description="Update basket item count",
     *    @SWG\Schema(type="object",
     *        @SWG\Property(property="id", type="integer", example="1"),
     *        @SWG\Property(property="quantity", type="integer", example="2"),
     *        @SWG\Property(property="book", type="object",
     *            @SWG\Property(property="id", type="integer", example="4"),
     *            @SWG\Property(property="author", type="string", example="Michael T. Nygard"),
     *            @SWG\Property(property="imageUrl", type="string", example="https://images-na.ssl-images-amazon.com/images/I/414CRjLjwgL._SX403_BO1,204,203,200_.jpg"),
     *            @SWG\Property(property="price", type="integer", example="45"),
     *            @SWG\Property(property="title", type="string", example="Release It!"),
     *        )
     *    )
     * )
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
