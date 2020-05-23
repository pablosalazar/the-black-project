<?php
namespace App\Http\Controllers\User;

use Carbon\Carbon;
use App\User;
use Illuminate\Http\Request;
use App\Http\Controllers\ApiController;

/**
 * Class AcademicLevelController
 * @package App\Http\Controllers\User
 */

class UserController extends ApiController
{
    /**
    * @OA\Get(
    *     path="/api/users",
    *     summary="Mostrar usuarios",
    *     @OA\Response(
    *         response=200,
    *         description="Mostrar todos los usuarios."
    *     ),
    *     @OA\Response(
    *         response="default",
    *         description="Ha ocurrido un error."
    *     )
    * )
    */

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        $users = User::with('employee')->get();

        return $this->showAll($users);
    }


    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        User::validate($request);

        $fields = $request->all();
        $fields['password'] = bcrypt($request->password);

        $user = User::create($fields);

        return $this->showOne($user, 201);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $user = User::with('employee')->findOrFail($id);

        return $this->showOne($user);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, User $user)
    {
        User::validate($request, $user);

        $fields = $request->all();

        if ($request->has('password')) {
            $fields['password'] = bcrypt($request->password);
        }
        $user->fill($fields);

        if ($user->isDirty()) {
            $user->save();
        }
        
        return $this->showOne($user);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy(User $user)
    {
        $user->delete();

        return $this->showOne($user);
    }


    private function savePicture($user, $file) 
    {
        $filename = $user->document_number .  '-' . time() .  ".jpg";
        $image = Image::make($file)->widen(300)->encode('jpg', 75);
        $image->save(public_path('img/employees/') . $filename);
        $user->image = $filename;
        $user->save();
    }


}
