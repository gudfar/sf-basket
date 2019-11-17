<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\Routing\Annotation\Route;

/**
 * Class MainController
 * @package App\Controller
 */
class MainController extends AbstractController
{
    /**
     * @Route("/", name="home")
     */
    public function indexAction()
    {
        return $this->render('main/index.html.twig');
    }

}