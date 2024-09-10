<?php

namespace App\Http\Controllers;

use App\Enum\AppFolder;
use App\Http\Requests\FileStoreRequest;
use App\Models\Event\EventFile;
use App\Models\File\File;
use App\Models\Proposal\ProposalFile;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class FileController extends Controller
{    
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return File::all();
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(FileStoreRequest $request)
    {
        // return response()->json(['mess' => $request->file('files')[0]]);
        $validated = $request->validated();
        
        // Init Folder
        $folder = "";
        if($validated['relation'] == 'event') $folder = AppFolder::EVENT->value;
        else if($validated['relation'] == 'proposal') $folder = AppFolder::PROPOSAL->value;
        else $folder = AppFolder::OTHER->value;
        $uploadFolder = "{$folder}/{$validated['relation_id']}";

        $filesUpload = $request->file('files');
        foreach ($filesUpload as $uploaded) {
            $path = $uploaded->store($uploadFolder); // Folder will be created if not exist, very cool

            $file = File::create([
                'name' => $validated['name'],
                'path' => $path,
                'mime_type' => $uploaded->extension(),
                'size' => $uploaded->getSize(),
                'category_id' => $validated['category_id']
            ]);

            if($folder === AppFolder::PROPOSAL->value){
                ProposalFile::create([
                    'file_id' => $file->id,
                    'proposal_id' => $validated['relation_id'],
                ]);
            }else if($folder === AppFolder::EVENT->value){
                EventFile::create([
                    'file_id' => $file->id,
                    'event_id' => $validated['relation_id'],
                ]);
            }
        }

        if($validated['relation'] == 'proposal')
            return redirect()->route('proposal.show', ['id' => $validated['relation_id']])
                    ->with(['code' => 1, 'status' => count($filesUpload)." File(s) Uploaded!"]);
        else if($validated['relation'] == 'event')
        return redirect()->route('event.show', ['id' => $validated['relation_id']])
                    ->with(['code' => 1, 'status' => count($filesUpload)." File(s) Uploaded!"]);
        else
            return redirect()->route('dashboard');
    }

    public function download(string $id)
    {        
        $file = File::findOrFail($id);

        $paths = explode("/", $file->path);
        $type = strtoupper($paths[0]);
        $resource_id = $paths[1];

        $file_name = "{$type}_{$resource_id}_{$file->category->name}_{$file->name}.{$file->mime_type}";

        return Storage::download($file->path, $file_name);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $file = File::findOrFail($id);
        $file_path = Storage::path($file->path);

        header("Content-type: application/pdf");
        header("Content-Disposition: inline; filename={$file_path}");
        @readfile($file_path);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $file = File::findOrFail($id);

        $file->deleteOrFail();

        return redirect()->back();
    }
}
