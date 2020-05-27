<?php

namespace App\Controller\Api;

use App\Entity\Book;
use App\Entity\User;
use FOS\RestBundle\Controller\AbstractFOSRestController;
use FOS\RestBundle\Controller\Annotations as Rest;
use Swagger\Annotations as SWG;
use Symfony\Component\Security\Core\Encoder\UserPasswordEncoderInterface;

/**
 * Book controller.
 */
class BookController extends AbstractFOSRestController
{
    /**
     * @SWG\Tag(name="Books")
     * @SWG\Response(
     *    response=200,
     *    description="Returns array of books",
     *    @SWG\Schema(
     *        type="array",
     *        @SWG\Items(
     *            type="object",
     *            @SWG\Property(property="id", type="integer", example="1"),
     *            @SWG\Property(property="title", type="string", example="Production-Ready Microservices"),
     *            @SWG\Property(property="author", type="string", example="Susan J. Fowler"),
     *            @SWG\Property(property="price", type="integer", example="32"),
     *            @SWG\Property(property="image_url", type="string", example="https://images-na.ssl-images-amazon.com/images/I/41yJ75gpV-L._SX381_BO1,204,203,200_.jpg")
     *         ),
     *     )
     * )
     * @Rest\Get("/api/books", name="api_books")
     * @Rest\View()
     */
    public function getBooksAction(UserPasswordEncoderInterface $encoder)
    {
        $books = $this->getDoctrine()
            ->getRepository(Book::class)
            ->findAll();

        return $books;
    }
}
