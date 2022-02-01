<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Support\Str;

class GuestResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array|\Illuminate\Contracts\Support\Arrayable|\JsonSerializable
     */
    public function toArray($request)
    {
        return [
            'id' => $this->id,
            'name' => Str::title($this->properties['Name']['title'][0]['plain_text']),
            'relation' => Str::ucfirst($this->properties['relation']['rich_text'][0]['plain_text']),
            'sprite' => explode(',', $this->properties['sprite']['rich_text'][0]['plain_text']),
            'description' => $this->properties['description']['rich_text'][0]['plain_text']
        ];
    }
}
