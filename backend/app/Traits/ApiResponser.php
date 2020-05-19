<?php

namespace App\Traits;

use Illuminate\Support\Collection;
use Illuminate\Support\Facades\Cache;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Validator;
use Illuminate\Pagination\LengthAwarePaginator;


trait ApiResponser
{
	private function successResponse($data, $code)
	{
		return response()->json($data, $code);
	}

	protected function errorResponse($message, $code)
	{
		return response()->json(['error' => $message, 'code' => $code], $code);
	}

	protected function showAll(Collection $collection, $code = 200)
	{
		$collection = $this->filterData($collection);
		$collection = $this->sortData($collection);
		$collection = $this->paginate($collection);

		return $this->successResponse($collection, $code);
	}

	protected function showOne(Model $instance, $code = 200)
	{
		return $this->successResponse($instance, $code);
	}

	protected function showOneCollection(Collection $instance, $code = 200)
	{
		return $this->successResponse($instance[0], $code);
	}

	protected function sortData(Collection $collection)
	{
		if (request()->has('orderBy')) {
			$attribute = request()->orderBy;
			$collection = $collection->sortBy($attribute);
		}
		return $collection->values();
	}

	protected function filterData(Collection $collection)
	{
		if (request()->has('search') && !empty(request()->search)) {
			$search = request()->search;
			$filters = $collection->first()->getFilters();

			$collection = $collection->reject(function($item) use ($search, $filters) {

			    $ban = true;
			    foreach ($filters as $value) {

					if (stristr($item->$value, $search)) {
						$ban = false;
					}
				}
			    return $ban;
			});
		}

		return collect($collection);
	}

	protected function paginate(Collection $collection)
	{
		$rules = [
			'pageSize' => 'integer|min:2|max:50'
		];
		Validator::validate(request()->all(), $rules);

		$page = LengthAwarePaginator::resolveCurrentPage();

		$perPage = 15;
		if (request()->has('pageSize')) {
			$perPage = (int) request()->pageSize;
		}

		$results = $collection->slice(($page - 1) * $perPage, $perPage)->values();

		$paginated = new LengthAwarePaginator($results, $collection->count(), $perPage, $page);
		$paginated->appends(request()->all());

		return $paginated;
	}
}



