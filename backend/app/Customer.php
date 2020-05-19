<?php

namespace App;

use App\Vehicle;
use Illuminate\Database\Eloquent\Model;

class Customer extends Model
{
    protected $fillable = [
        'name',
        'document_type',
        'document_number',
        'phone',
    ];

    protected $filters = [
        'code', 'name', 'document_number', 'role'
    ];

    public static function validate($request, $customer=null)
    {
        $rules=[
            'name' => 'required',
            'document_type' => 'required',
            'document_number' => $customer ? 'required|unique:customers,document_number,'.$customer->id : 'required|unique:customers',
        ];
        $request->validate($rules);
    }

    public function getFilters()
    {
        return $this->filters;
    }

    public function setNameAttribute($value)
    {
        $this->attributes['name'] = mb_convert_case($value, MB_CASE_TITLE, "UTF-8");
    }

    public function vehicles()
    {
        return $this->belongsToMany(Vehicle::class);
    }

}
