<?php

namespace App\Http\Controllers\Contact;

use App\Contact;
use Illuminate\Http\Request;
use App\Http\Controllers\ApiController;

class ContactController extends ApiController
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $contacts = Contact::all();

        return $this->showAll($contacts);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        Contact::validate($request);

        $fields = $request->all();

        $Contact = Contact::create($fields);

        return $this->showOne($Contact);
    }

    /**
     * Display the specified resource.
     *
     * @param  Contact  $contact
     * @return \Illuminate\Http\Response
     */
    public function show(Contact $contact)
    {
        return $this->showOne($contact);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  Contact  $contact
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Contact $contact)
    {
        Contact::validate($request);

        $fields = $request->all();
        $contact->fill($fields);

        if ($contact->isDirty()) {
            $contact->save();
        }
        return $this->showOne($contact);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  Contact  $contact
     * @return \Illuminate\Http\Response
     */
    public function destroy(Contact $contact)
    {
        $contact->delete();

        return $this->showOne($contact);
    }
}
