<?php

namespace App\Http\Controllers\View;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

class AboutController extends Controller
{
    /**
     * View the index page
     *
     * @return View index page
     */
    public function index()
    {
        return view('about.index');
    }
}
