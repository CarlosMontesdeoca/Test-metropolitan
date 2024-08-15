<?php

namespace App\Http\Controllers;

use App\Models\User;

use Illuminate\Http\Request;

class UserController extends Controller
{
    public function index () {
        return response()->json(User::all(), 200);
    }

    public function store (Request $request) {
        return response()->json(User::create($request->all()), 201);
    } 
}
