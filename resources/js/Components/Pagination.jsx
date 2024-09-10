import React from "react";
import { Link } from "@inertiajs/react";
import { IconButton, Typography } from "@material-tailwind/react";
import { ArrowRightIcon, ArrowLeftIcon } from "@heroicons/react/24/outline";
 
export default function Pagination({paginator}) {
 
  return (
    <div className="flex items-center gap-8">
      <Link href={paginator['prev_page_url']} 
        as="button" 
        disabled={paginator['current_page'] === 1}
        only={['proposals', 'paginator', 'events']}
        preserveState={true}
      >
          <ArrowLeftIcon strokeWidth={2} className="h-4 w-4" hidden={paginator['current_page'] === 1}/>
      </Link>
      <Typography color="gray" className="font-normal">
        Page <strong className="text-gray-900">{paginator['current_page']}</strong> of{" "}
        <strong className="text-gray-900">{paginator['last_page']}</strong>
      </Typography>
      <Link href={paginator['next_page_url']}
            as="button"
            disabled={paginator['current_page'] === paginator['last_page']}
            only={['proposals', 'paginator', 'events']}
            preserveState={true}
      >
          <ArrowRightIcon strokeWidth={2} className="h-4 w-4" hidden={paginator['current_page'] === paginator['last_page']}/>
      </Link>
    </div>
  );
}